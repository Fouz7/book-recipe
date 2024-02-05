import { Component } from '@angular/core';
import {
  AddrecipeService,
  CategoryFoodResponse,
  LevelFoodResponse,
} from '../services/addrecipe.service';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrl: './addrecipe.component.css',
})
export class AddrecipeComponent {
  constructor(private addrecipeService: AddrecipeService) {}

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  categoryFood!: CategoryFoodResponse[];
  levelFood!: LevelFoodResponse[];

  ngOnInit() {
    this.getCategoryFoodList();
    this.getLevelFoodList();
  }

  getCategoryFoodList() {
    this.addrecipeService.getCategories().subscribe((res: any) => {
      this.categoryFood = res.data;
    });
  }

  getLevelFoodList() {
    this.addrecipeService.getLevels().subscribe((res: any) => {
      this.levelFood = res.data;
    });
  }
}
