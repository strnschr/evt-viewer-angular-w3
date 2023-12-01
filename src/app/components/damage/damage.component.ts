import { Component, Input } from '@angular/core';

import { EditorialConventionLayoutData } from '../../directives/editorial-convention-layout.directive';
import { Damage, HighlightData } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@Component({
  selector: 'evt-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.scss']
})
@register(Damage)
export class DamageComponent implements EditionlevelSusceptible, Highlightable {
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: Damage;

  get editorialConventionData(): EditorialConventionLayoutData {
    return {
      name: 'damage',
      attributes: this.data?.attributes || {},
      editionLevel: this.editionLevel,
      defaultsKey: 'damage'
    };
  }
}
