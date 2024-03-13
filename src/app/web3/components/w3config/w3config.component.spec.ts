import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3configComponent } from './w3config.component';

describe('W3configComponent', () => {
  let component: W3configComponent;
  let fixture: ComponentFixture<W3configComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [W3configComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(W3configComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
