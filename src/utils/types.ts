export type UserType = {
  name: string,
  category: string,
}

export type UserContextType = {
  user: UserType | null,
  setUser: (user:UserType | null) => void,
  savedRecipes: SavedRecipesType[], 
  addRecipe: (recipeId: string) => void, 
  removeRecipe: (recipeId: string) => void, 
}

export type RecipeType = {
  strMeal: string,
  idMeal: string,
  strMealThumb: string,
  strArea?: string,
  strInstructions?: string,
  strYoutube?: string,
}

export type SavedRecipesType = {
  id: string,
}

export type ButtonType = {
  buttonText: string,
  onClick: () => void,
}

export type RecipeFetcherType = {
  action: string,
}

export type CategoryType = {
  strCategory: string,
  strCategoryThumb: string,
}