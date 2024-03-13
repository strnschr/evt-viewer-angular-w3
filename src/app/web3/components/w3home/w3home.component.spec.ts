import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3homeComponent } from './w3home.component';

describe('W3homeComponent', () => {
  let component: W3homeComponent;
  let fixture: ComponentFixture<W3homeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [W3homeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(W3homeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
