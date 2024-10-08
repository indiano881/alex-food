'use client'

import { recipeFetcher } from "@/utils/functions"
import { CategoryType } from "@/utils/types"
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";

const category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryChoice, setCategoryChoice] = useState<CategoryType | null>(null);

  const fetchRecipes = async () => {
    const data = await recipeFetcher({ action:`categories.php` })
    const categories = data.categories;
    setCategories(categories);
  }

  useEffect(() => {
    fetchRecipes();
  }, [])

  return (
    <div className="sm:max-w-[650px] md:max-w-[950px] mx-auto my-6">
      <div className="flex flex-wrap justify-center lg:justify-start">
        {categories ? (
          categories.map((category) => (
            <div className="m-2 p-6 bg-zinc-900 rounded-3xl w-[300px]">
              <Link
                className="flex flex-col font-semibold text-center items-center text-slate-200"
                href={`/category/${category.strCategory}`}
              >
                <p>{category.strCategory}</p>
                <Image
                  src={category.strCategoryThumb}
                  alt={`Image of ${category.strCategory}`}
                  height={450}
                  width={450}
                  className="rounded-lg"
                />
              </Link>
            </div>
          ))
        ) : (
          <p>Oops! Something went wrong. No categories available.</p>
        )}
      </div>
    </div>
  )
}

export default category