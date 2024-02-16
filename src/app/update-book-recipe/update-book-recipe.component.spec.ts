import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookRecipeComponent } from './update-book-recipe.component';

describe('UpdateBookRecipeComponent', () => {
  let component: UpdateBookRecipeComponent;
  let fixture: ComponentFixture<UpdateBookRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBookRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBookRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
