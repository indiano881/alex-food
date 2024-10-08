import React, { useEffect, useState } from "react";
import { recipeFetcher } from "@/utils/functions";
import { RecipeType } from "@/utils/types";
import { CircularProgress } from "@mui/material";
import Button from "../Button";

const GuestHome = () => {
  const [meal, setMeal] = useState<RecipeType | null>(null);

  const fetchRecipe = async () => {
    const data = await recipeFetcher({ action: "random.php" });

    if (data && data.meals.length > 0) {
      setMeal(data.meals[0]);
    } else {
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleClick = async () => {
    fetchRecipe();
  };

  const handleLoginAtTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col items-center text-black p-4 my-10 mx-auto space-y-8 text-xl">
      <div>
        <h3 className="text-xl md:text-2xl">Welcome to The Food Booth</h3>
        <p className="font-semibold md:text-2xl">Get inspired, cook, enjoy!</p>
      </div>
      <Button buttonText="New recipe" onClick={handleClick} />
      {meal ? (
        <div className="border-2 w-3/4 bg-gray-900 text-slate-200 rounded-3xl p-10  space-y-16">
          <p className="text-2xl m-3 font-bold">{meal.strMeal}</p>
          <div className="bg-orange-400 mt-10 rounded-3xl w-4/5">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded-3xl position relative bottom-6 left-6 border border-zinc-700"
            />
          </div>
          <p>{meal.strInstructions}</p>
          {meal.strYoutube && (
            <>
              <p>Need more instructions? </p>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                Go to Recipe Video
              </a>
              <p>Or <span className="underline underline-offset-2 cursor-pointer" onClick={handleLoginAtTopClick}>Log in</span> at the top to get full recipe details.</p>
            </>
          )}
        </div>
      ) : (
        <CircularProgress color="inherit" className="m-6 text-zinc-950" />
      )}
    </div>
  );
};

export default GuestHome;
