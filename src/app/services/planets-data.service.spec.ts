import { TestBed } from '@angular/core/testing';

import { PlanetsDataService } from './planets-data.service';

describe('PlanetsDataService', () => {
  let service: PlanetsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
