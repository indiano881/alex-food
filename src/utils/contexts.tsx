"use client";

import { createContext, useContext, useState } from "react";
import { SavedRecipesType, UserContextType, UserType } from "./types";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType|null> (null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipesType[]>([]);

  const updateSavedRecipes = (savedRecipes: string[]) => { 
    if (user) {
      setUser((prevUser) => {
        return prevUser ? {...prevUser, savedRecipes} : null; 
      });
    };
  };

  const addRecipe = (recipeId: string) => {
    setSavedRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes, { id: recipeId }];
      updateSavedRecipes(updatedRecipes.map(recipe => recipe.id));
      return updatedRecipes;
    });
  };
  
  const removeRecipe = (recipeId: string) => {
    setSavedRecipes((prevRecipes) => {
      const updatedRecipes = prevRecipes.filter((recipe) => recipe.id !== recipeId);
      updateSavedRecipes(updatedRecipes.map(recipe => recipe.id));
      return updatedRecipes;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, savedRecipes, addRecipe, removeRecipe  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
