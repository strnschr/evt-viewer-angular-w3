import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3spaceCreateComponent } from './w3space-create.component';

describe('W3spaceCreateComponent', () => {
  let component: W3spaceCreateComponent;
  let fixture: ComponentFixture<W3spaceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [W3spaceCreateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(W3spaceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
