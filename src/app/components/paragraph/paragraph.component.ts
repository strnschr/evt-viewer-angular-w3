import { Component, Input } from '@angular/core';

import { HighlightData, Paragraph } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';
import { TextFlow } from 'src/app/app.config';

@Component({
  selector: 'evt-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
@register(Paragraph)
export class ParagraphComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() textFlow: TextFlow;
  @Input() data: Paragraph;
}
