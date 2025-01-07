import { TestBed } from '@angular/core/testing';

import { MysteryBeerContestService } from './mystery-beer-contest.service';

describe('MysteryBeerContestService', () => {
  let service: MysteryBeerContestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MysteryBeerContestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
