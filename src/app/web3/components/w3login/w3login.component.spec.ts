import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3loginComponent } from './w3login.component';

describe('W3loginComponent', () => {
  let component: W3loginComponent;
  let fixture: ComponentFixture<W3loginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [W3loginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(W3loginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
