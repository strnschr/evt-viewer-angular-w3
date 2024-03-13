import {
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { AttributesMap } from 'ng-dynamic-component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { EditionLevelType, TextFlow } from '../../app.config';
import { GenericElement } from '../../models/evt-models';
import { ComponentRegisterService } from '../../services/component-register.service';
import { EntitiesSelectService } from '../../services/entities-select.service';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';
import { TextFlowSusceptible } from '../components-mixins';

@Component({
  selector: 'evt-content-viewer',
  templateUrl: './content-viewer.component.html'
})
export class ContentViewerComponent implements OnChanges, OnDestroy, TextFlowSusceptible {
  @Input() content: GenericElement;
  contentChange = new BehaviorSubject<GenericElement>(undefined);

  @Input() itemsToHighlight: EntitiesSelectItem[];
  itemsToHighlightChange = new BehaviorSubject<EntitiesSelectItem[]>([]);

  @Input() editionLevel: EditionLevelType | '' = '';
  editionLevelChange = new BehaviorSubject<EditionLevelType | ''>('');

  @Input() textFlow: TextFlow;
  textFlowChange = new BehaviorSubject<TextFlow>(undefined);

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private componentRegister: ComponentRegisterService,
    private entitiesSelectService: EntitiesSelectService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public parsedContent: Observable<{ [keyName: string]: any }> = this.contentChange.pipe(
    map(data => ({
      ...data,
      type:
        this.componentRegister.getComponent(data?.type ?? GenericElement) ||
        this.componentRegister.getComponent(GenericElement)
    })),
    shareReplay(1)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public inputs: Observable<{ [keyName: string]: any }> = combineLatest([
    this.contentChange,
    this.itemsToHighlightChange,
    this.editionLevelChange,
    this.textFlowChange
  ]).pipe(
    map(([data, itemsToHighlight, editionLevel, textFlow]) => {
      if (this.toBeHighlighted()) {
        return {
          data,
          highlightData: this.getHighlightData(data, itemsToHighlight),
          itemsToHighlight,
          editionLevel,
          textFlow
        };
      }

      return {
        data,
        editionLevel,
        textFlow
      };
    }),
    shareReplay(1)
  );

  // tslint:disable-next-line: ban-types
  public outputs: Observable<{ [keyName: string]: Function }> = this.contentChange.pipe(
    map(() => ({})),
    shareReplay(1)
  );
  public attributes: Observable<AttributesMap> = this.contentChange.pipe(
    filter(parsedContent => !!parsedContent),
    map(parsedContent => ({
      ...(parsedContent.attributes || {}),
      ...{ class: `edition-font ${parsedContent.class || ''}` }
    })),
    shareReplay(1)
  );

  public context$ = combineLatest([this.parsedContent, this.inputs, this.outputs, this.attributes]).pipe(
    map(([parsedContent, inputs, outputs, attributes]) => ({ parsedContent, inputs, outputs, attributes }))
  );

  private componentRef: ComponentRef<{}>;

  private toBeHighlighted() {
    return true; // TODO: Decide when an item should be highlighted
  }

  private getHighlightData(data, ith: EntitiesSelectItem[]) {
    return {
      highlight:
        ith?.some(i =>
          this.entitiesSelectService.matchClassAndAttributes(i.value, data?.attributes ?? {}, data?.class)
        ) ?? false,
      highlightColor: this.entitiesSelectService.getHighlightColor(data?.attributes ?? {}, data?.class, ith)
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    const { textFlow, editionLevel, itemsToHighlight, content } = changes;

    if (textFlow) {
      this.textFlowChange.next(textFlow.currentValue);
    }
    if (editionLevel) {
      this.editionLevelChange.next(editionLevel.currentValue);
    }
    if (itemsToHighlight) {
      this.itemsToHighlightChange.next(itemsToHighlight.currentValue);
    }
    if (content) {
      this.contentChange.next(content.currentValue);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
