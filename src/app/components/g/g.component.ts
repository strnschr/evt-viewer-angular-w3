import { Component, Input } from '@angular/core';

import { map } from 'rxjs/operators';

import { G } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EVTModelService } from '../../services/evt-model.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';

export interface GComponent extends EditionlevelSusceptible, Highlightable, TextFlowSusceptible {}

@Component({
  selector: 'evt-g',
  templateUrl: './g.component.html',
  styleUrls: ['./g.component.scss']
})
@register(G)
export class GComponent {
  @Input() data: G;

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
