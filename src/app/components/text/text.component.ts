import { Component, Input } from '@angular/core';
import { HighlightData, Text } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { TextFlow } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@Component({
  selector: 'evt-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
@register(Text)
export class TextComponent implements EditionlevelSusceptible, TextFlowSusceptible, Highlightable {
  @Input() editionLevel: EditionLevelType;
  @Input() textFlow: TextFlow;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: Text;
}
