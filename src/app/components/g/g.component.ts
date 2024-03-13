import { Component, Input } from '@angular/core';

import { map } from 'rxjs/operators';

import { G, HighlightData } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EVTModelService } from '../../services/evt-model.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';
import { TextFlow } from 'src/app/app.config';

@Component({
  selector: 'evt-g',
  templateUrl: './g.component.html',
  styleUrls: ['./g.component.scss']
})
@register(G)
export class GComponent implements EditionlevelSusceptible, Highlightable, TextFlowSusceptible {
  @Input() data: G;
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() textFlow: TextFlow;

  specialChars$ = this.evtModelService.specialChars$.pipe(
    map(specialChars => specialChars.find(char => char.id === this.data.charId))
  );

  diplomaticMapping$ = this.specialChars$.pipe(
    map(specialChar => {
      const mapping = specialChar?.mappings.find(m => m.type === 'diplomatic');

      return mapping?.content ?? [];
    })
  );

  normalizedMapping$ = this.specialChars$.pipe(
    map(specialChar => {
      const mapping = specialChar?.mappings.find(m => m.type === 'normalized');

      return mapping?.content ?? [];
    })
  );

  constructor(private evtModelService: EVTModelService) {}
}
