import { Component, Input } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';

import { HighlightData, NamedEntityRef } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EVTModelService } from '../../services/evt-model.service';
import { EVTStatusService } from '../../services/evt-status.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';
import { TextFlow } from 'src/app/app.config';

@Component({
  selector: 'evt-named-entity-ref',
  templateUrl: './named-entity-ref.component.html',
  styleUrls: ['./named-entity-ref.component.scss']
})
@register(NamedEntityRef)
export class NamedEntityRefComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() data: NamedEntityRef;
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() textFlow: TextFlow;

  availableEntities$ = this.evtModelService.namedEntities$.pipe(map(ne => ne.all.entities.length > 0));
  noDetails$ = this.availableEntities$.pipe(map(info => !info));

  entity$ = this.evtModelService.namedEntities$.pipe(
    map(ne => ne.all.entities.find(e => e.id === this.data.entityId) || 'notFound')
  );

  toggleOpened$ = new Subject<boolean | void>();
  opened$ = this.toggleOpened$.pipe(
    scan((currentState: boolean, val: boolean | undefined) => (val === undefined ? !currentState : val), false),
    startWith(false)
  );

  entityHighlight$ = combineLatest([this.opened$, this.evtStatusService.currentNamedEntityId$]).pipe(
    map(([opened, currentId]) => currentId === this.data.entityId && !opened)
  );

  constructor(
    public evtStatusService: EVTStatusService,
    private evtModelService: EVTModelService
  ) {}
}
