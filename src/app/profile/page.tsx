"use client";

import Button from "@/Components/Button";
import { useUserContext } from "@/utils/contexts";
import { recipeFetcher } from "@/utils/functions";
import { UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";

const profile = () => {
  const { user, savedRecipes, removeRecipe } =
    useUserContext() as UserContextType;
  const [recipeNames, setRecipeNames] = useState<Record<string, string>>({}); // record allows to define an oject with keys and values of type string

  useEffect(() => {
    const fetchRecipes = async () => {
      const names: Record<string, string> = {};

      for (const savedRecipe of savedRecipes) {
        const data = await recipeFetcher({
          action: `lookup.php?i=${savedRecipe.id}`,
        });
        const recipeName = data.meals[0]?.strMeal || "Unknown Recipe";
        names[savedRecipe.id] = recipeName;
      }

      setRecipeNames(names);
    };

    if (savedRecipes.length > 0) {
      fetchRecipes();
    }
  }, [savedRecipes]);

  return (
    <>
      {user && (
        <div className="p-6 space-y-4">
          <div>
            <p className="font-semibold text-zinc-950">Your favourite category</p>
            <p className="font-semibold text-orange-600">{user.category}</p>
          </div>
          <p className="font-semibold text-orange-400 mt-4">Your saved recipes</p>
          {savedRecipes.length > 0 ? (
            <ul className="bg-orange-400 p-4 rounded-xl">
              {savedRecipes.map((recipe) => (
                <li key={recipe.id} className="m-2underline underline-offset-4">
                  <Link href={`/recipe/${recipe.id}`}>
                    {recipeNames[recipe.id]}
                  </Link>
                  <Button
                    buttonText="Unsave"
                    onClick={() => removeRecipe(recipe.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No saved recipes. Go browse some and save your favourites here!
            </p>
          )}
        </div>
      )}
      ;
    </>
  );
};

export default profile;
