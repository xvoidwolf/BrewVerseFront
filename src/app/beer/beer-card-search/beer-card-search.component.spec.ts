import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardSearchComponent } from './beer-card-search.component';

describe('BeerCardSearchComponent', () => {
  let component: BeerCardSearchComponent;
  let fixture: ComponentFixture<BeerCardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerCardSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerCardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
