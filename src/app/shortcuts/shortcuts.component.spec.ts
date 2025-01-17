import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShortcutsComponent } from './shortcuts.component';

describe('ShortcutsComponent', () => {
  let component: ShortcutsComponent;
  let fixture: ComponentFixture<ShortcutsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShortcutsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
