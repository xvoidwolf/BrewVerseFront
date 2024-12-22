import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerMiniCardComponent } from './beer-mini-card.component';

describe('BeerMiniCardComponent', () => {
  let component: BeerMiniCardComponent;
  let fixture: ComponentFixture<BeerMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerMiniCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
