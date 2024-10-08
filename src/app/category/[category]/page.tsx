'use client'

import { recipeFetcher } from "@/utils/functions";
import { RecipeType, UserContextType } from "@/utils/types";
import Link from "next/link";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useUserContext } from "@/utils/contexts";
import Button from "@/Components/Button";

const recipesByCategory = ({params}:{params:{category:string}}) => {
  const {category} = params;
  const [recipes, setRecipes] = useState<RecipeType[] | null>(null);
  const {user, setUser} = useUserContext() as UserContextType;
  
  const fetchRecipes = async () => {
    const recipes = await recipeFetcher({action:`filter.php?c=${category}`});
    setRecipes(recipes.meals);
  } 

  useEffect(() => {
    fetchRecipes();
  }, [category])

  const saveCategoryClick = () => {
    if (user) {
      setUser({
        ...user,
        category
      })
    }
  }
  
  return(
    <>
      <h3 className="p-6 capitalize font-semibold text-lg">Our most tasty {category} recipes</h3>
      {user?.category !== category ? (
        <div className="p-6"><Button buttonText="Make this your favourite category" onClick={saveCategoryClick}/></div>
      ) : (
        <p className="m-6 font-semibold">{category} is your favourite type of meal!</p>
      )}
      <div className="p-6 flex flex-wrap">
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
      </>
  )
}

export default recipesByCategory;
