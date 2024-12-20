import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysteryBeerContestComponent } from './mystery-beer-contest.component';

describe('MysteryBeerContestComponent', () => {
  let component: MysteryBeerContestComponent;
  let fixture: ComponentFixture<MysteryBeerContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MysteryBeerContestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysteryBeerContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
