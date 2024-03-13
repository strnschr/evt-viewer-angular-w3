import { Component, Input } from '@angular/core';
import { GenericElement, HighlightData } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';
import { TextFlow } from 'src/app/app.config';

@Component({
  selector: 'evt-generic-element',
  templateUrl: './generic-element.component.html',
  styleUrls: ['./generic-element.component.scss']
})
@register(GenericElement)
export class GenericElementComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() textFlow: TextFlow;
  @Input() data: GenericElement;
}
