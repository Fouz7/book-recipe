import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecipeDialogComponent } from './update-recipe-dialog.component';

describe('UpdateRecipeDialogComponent', () => {
  let component: UpdateRecipeDialogComponent;
  let fixture: ComponentFixture<UpdateRecipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRecipeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
