import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBeerComponent } from './update-beer.component';

describe('UpdateBeerComponent', () => {
  let component: UpdateBeerComponent;
  let fixture: ComponentFixture<UpdateBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
