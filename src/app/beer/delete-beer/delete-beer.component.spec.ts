import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBeerComponent } from './delete-beer.component';

describe('DeleteBeerComponent', () => {
  let component: DeleteBeerComponent;
  let fixture: ComponentFixture<DeleteBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
