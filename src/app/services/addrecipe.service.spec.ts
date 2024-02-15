import { TestBed } from '@angular/core/testing';

import { AddrecipeService } from './addrecipe.service';

describe('AddrecipeService', () => {
  let service: AddrecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddrecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
