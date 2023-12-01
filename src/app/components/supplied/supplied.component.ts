import { Component, Input } from '@angular/core';
import { HighlightData, Supplied } from 'src/app/models/evt-models';
import { register } from 'src/app/services/component-register.service';
import { EditionlevelSusceptible, Highlightable } from '../components-mixins';
import { EditionLevelType } from 'src/app/app.config';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@Component({
  selector: 'evt-supplied',
  templateUrl: './supplied.component.html',
  styleUrls: ['./supplied.component.scss']
})
@register(Supplied)
export class SuppliedComponent implements EditionlevelSusceptible, Highlightable {
  @Input() editionLevel: EditionLevelType;
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: Supplied;
}
