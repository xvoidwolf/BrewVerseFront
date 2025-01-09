import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerReviewCardComponent } from './beer-review-card.component';

describe('BeerReviewCardComponent', () => {
  let component: BeerReviewCardComponent;
  let fixture: ComponentFixture<BeerReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
