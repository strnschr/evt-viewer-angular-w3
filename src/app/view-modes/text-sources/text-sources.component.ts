import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem, GridType, DisplayGrid } from 'angular-gridster2';

@Component({
  selector: 'evt-text-sources',
  templateUrl: './text-sources.component.html',
  styleUrls: ['./text-sources.component.scss']
})
export class TextSourcesComponent implements OnInit {

  public options: GridsterConfig = {};
  public textPanelItem: GridsterItem = { cols: 1, rows: 1, y: 0, x: 0 };
  public sourcesPanelItem: GridsterItem = { cols: 1, rows: 1, y: 0, x: 1 };


  constructor() { }

  ngOnInit() {
    this.initGridster();
  }

  private initGridster() {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.None,
      margin: 0,
      maxCols: 2,
      maxRows: 1,
      draggable: {
        enabled: true,
        ignoreContent: true,
        dragHandleClass: 'panel-header'
      },
      resizable: {
        enabled: false
      }
    };
  }
}