import { Component, Input, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { HighlightData, Note } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';
import { EditionLevelType } from 'src/app/app.config';
import { TextFlow } from 'src/app/app.config';

@Component({
  selector: 'evt-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
@register(Note)
export class NoteComponent implements Highlightable, EditionlevelSusceptible, TextFlowSusceptible {
  @Input() highlightData: HighlightData;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() editionLevel: EditionLevelType;
  @Input() textFlow: TextFlow;
  @Input() data: Note;
  @ViewChild('popover', { static: true }) popover: NgbPopover;

  public pinnerStyle = {
    'margin-right': '-0.65rem',
    'margin-top': '-0.35rem',
    float: 'right'
  };

  onTriggerClicked(event: MouseEvent) {
    event.stopPropagation();
  }
}
