import { FileHandle } from './file-handle.model';

export interface AddRecipe {
  recipeName: string;
  categories: {
    categoryId: string;
    categoryName: string;
  };
  levels: {
    levelId: string;
    levelName: string;
  };
  userId: string;
  timeCook: string;
  ingridient: string;
  howToCook: string;
  imageUrl: FileHandle[];
}
