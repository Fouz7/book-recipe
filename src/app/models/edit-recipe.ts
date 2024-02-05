import { Category } from "./category";
import { Level } from "./level";

export interface EditRecipe {
  recipeId: number;
  categories: Category;
  levels: Level;
  recipeName: string;
  imageFilename: string;
  timeCook: number;
  ingredient: string;
  howToCook: string;
}
