import { Component, Input } from '@angular/core';

import { EditorialConventionLayoutData } from '../../directives/editorial-convention-layout.directive';
import { Deletion, HighlightData } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EditionLevelType, TextFlow } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@register(Deletion)
@Component({
  selector: 'evt-deletion',
  templateUrl: './deletion.component.html',
  styleUrls: ['./deletion.component.scss']
})
export class DeletionComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() textFlow: TextFlow;
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: Deletion;

  get editorialConventionData(): EditorialConventionLayoutData {
    return {
      name: 'del',
      attributes: this.data.attributes,
      editionLevel: this.editionLevel,
      defaultsKey: 'deletion'
    };
  }
}
