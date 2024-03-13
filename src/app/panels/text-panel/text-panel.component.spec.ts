import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextPanelComponent } from './text-panel.component';

describe('TextPanelComponent', () => {
  let component: TextPanelComponent;
  let fixture: ComponentFixture<TextPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPanelComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
