import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { HighlightData, VersesGroup } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EVTModelService } from '../../services/evt-model.service';
import { EditionlevelSusceptible, Highlightable } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@Component({
  selector: 'evt-verses-group',
  templateUrl: './verses-group.component.html',
  styleUrls: ['./verses-group.component.scss']
})
@register(VersesGroup)
export class VersesGroupComponent implements EditionlevelSusceptible, Highlightable {
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: VersesGroup;

  get displayBlock$() {
    return this.evtModelService.lines$.pipe(
      map(lines => lines.length > 0),
      map(hasLines => {
        // In diplomatic and interpretative edition, if the text doesn't have any line, verses group are shown as block items
        // In critical edition verses are always shown as block items
        switch (this.editionLevel) {
          case 'diplomatic':
          case 'interpretative':
            return !hasLines;
          case 'critical':
            return true;
        }
      })
    );
  }

  constructor(private evtModelService: EVTModelService) {}
}
