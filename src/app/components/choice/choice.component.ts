import { Component, Input } from '@angular/core';

import { EditionLevelType, TextFlow } from '../../app.config';
import { Choice, HighlightData } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@Component({
  selector: 'evt-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
@register(Choice)
export class ChoiceComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() textFlow: TextFlow;
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: Choice;

  get content() {
    if (this.editionLevel === 'diplomatic') {
      return this.data.originalContent;
    }

    return this.data.normalizedContent;
  }

  get alternativeContent() {
    if (this.editionLevel === 'diplomatic') {
      return this.data.normalizedContent;
    }

    return this.data.originalContent;
  }

  get alternativeEditionLevel(): EditionLevelType {
    return this.editionLevel === 'diplomatic' ? 'interpretative' : 'diplomatic';
  }
}
