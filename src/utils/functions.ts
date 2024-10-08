import { RecipeFetcherType } from "./types"

export const recipeFetcher = async ({action}:RecipeFetcherType) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/${action}`
      );
      const data = await response.json();
      return(data)
    } catch (error) {
      console.log("Error fetching recipe", error);
  } 
};
