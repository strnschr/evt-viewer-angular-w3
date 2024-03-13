import { Component, Input } from '@angular/core';
import { EditorialConventionLayoutData } from '../../directives/editorial-convention-layout.directive';
import { HighlightData, Surplus } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@Component({
  selector: 'evt-surplus',
  templateUrl: './surplus.component.html',
  styleUrls: ['./surplus.component.scss']
})
@register(Surplus)
export class SurplusComponent implements EditionlevelSusceptible, Highlightable {
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: Surplus;

  get editorialConventionData(): EditorialConventionLayoutData {
    return {
      name: 'surplus',
      attributes: this.data?.attributes || {},
      editionLevel: this.editionLevel,
      defaultsKey: 'surplus'
    };
  }
}
