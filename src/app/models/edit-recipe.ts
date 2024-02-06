export interface EditRecipe {
  recipeId: number;
  categories: {
    categoryId: number;
    categoryName: string;
  };
  levels: {
    levelId: number;
    levelName: string;
  };
  recipeName: string;
  imageFilename: string;
  timeCook: number;
  ingredient: string;
  howToCook: string;
}
