import { Component, Input } from '@angular/core';
import { HighlightData, Reading } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { Highlightable } from '../components-mixins';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';

@Component({
  selector: 'evt-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
@register(Reading)
export class ReadingComponent implements Highlightable {
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() data: Reading;
}
