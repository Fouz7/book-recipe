import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogSuccessComponent } from './delete-dialog-success.component';

describe('DeleteDialogSuccessComponent', () => {
  let component: DeleteDialogSuccessComponent;
  let fixture: ComponentFixture<DeleteDialogSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDialogSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDialogSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
