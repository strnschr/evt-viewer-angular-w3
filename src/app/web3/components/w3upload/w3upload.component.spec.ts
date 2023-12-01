import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3uploadComponent } from './w3upload.component';

describe('W3uploadComponent', () => {
  let component: W3uploadComponent;
  let fixture: ComponentFixture<W3uploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3uploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3uploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
