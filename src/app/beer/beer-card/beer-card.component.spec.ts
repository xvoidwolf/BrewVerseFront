import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardComponent } from './beer-card.component';

describe('BeerCardComponent', () => {
  let component: BeerCardComponent;
  let fixture: ComponentFixture<BeerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
