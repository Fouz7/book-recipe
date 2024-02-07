export interface EditRecipe {
  recipeId: number;
  categories: {
    categoryId: number;
    categoryName: string;
  };
  userId: number;
  levels: {
    levelId: number;
    levelName: string;
  };
  recipeName: string;
  imageFilename: string;
  timeCook: number;
  ingridient: string;
  howToCook: string;
  isDeleted: boolean;
  createdBy: string;
  createdTime: Date;
  modifiedBy: string;
  modifiedTime: Date;
}
