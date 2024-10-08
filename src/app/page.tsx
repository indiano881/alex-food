"use client";

import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { recipeFetcher } from "@/utils/functions";
import Link from "next/link";
import Image from "next/image";
import Button from "@/Components/Button";

export default function Home() {
  const { user } = useUserContext() as UserContextType;
  const [recipes, setRecipes] = useState<RecipeType[] | null>(null);

  const fetchRecipes = async () => {
    if (user) {
      const data = await recipeFetcher({
        action: `filter.php?c=${user.category}`,
      });

      const shuffleArray = (array: RecipeType[]) => {
        return array.sort(() => Math.random() - 0.5);
      };

      const randomFiveRecipes = shuffleArray(data.meals).slice(0, 5);

      setRecipes(randomFiveRecipes);
    }
  };

  const handleClick = () => {
    fetchRecipes();
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      {user && (
        <div className="flex flex-col space-y-2 p-6 text-black">
          <p className="pl-2 my-4 text-xl">
            Your favourite category of food is {user.category.toLowerCase()},
            here are some recipes you might like!
          </p>
          <div className="flex flex-wrap">
            {recipes &&
              recipes.map((meal: RecipeType) => (
                <div
                  key={meal.idMeal}
                  className="m-2 p-6 bg-zinc-900 rounded-3xl w-[300px] items-center"
                >
                  <Link
                    className="flex flex-col font-semibold text-center items-center text-slate-200"
                    href={`/recipe/${meal.idMeal}`}
                  >
                    <Image
                      src={meal.strMealThumb}
                      width={220}
                      height={220}
                      alt={`Image of ${meal.strMeal}`}
                      className="rounded-lg m-3"
                    />
                    {meal.strMeal}
                  </Link>
                </div>
              ))}
          </div>
          <div className="w-fit"><Button onClick={handleClick} buttonText="Regenerate"/></div>
        </div>
      )}
    </>
  );
}
