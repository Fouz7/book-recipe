import { TestBed } from '@angular/core/testing';

import { EditRecipeService } from './edit-recipe.service';

describe('EditRecipeService', () => {
  let service: EditRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
