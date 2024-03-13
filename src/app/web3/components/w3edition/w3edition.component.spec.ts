import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3editionComponent } from './w3edition.component';

describe('W3editionComponent', () => {
  let component: W3editionComponent;
  let fixture: ComponentFixture<W3editionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [W3editionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(W3editionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
