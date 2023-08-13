import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'evt-biblio-entry',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.scss'],
})
export class BiblioEntryComponent implements OnInit {

  @Input() data;

  public showList = AppConfig.evtSettings.edition.biblView.propToShow;
  public showAttrNames = AppConfig.evtSettings.edition.biblView.showAttrNames;
  public showEmptyValues = AppConfig.evtSettings.edition.biblView.showEmptyValues;
  public inline = AppConfig.evtSettings.edition.biblView.inline;

  ngOnInit() {}

}

