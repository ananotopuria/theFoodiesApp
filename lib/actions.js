"use server";

import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !meal.title || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(MealsFormSubmit.summary) ||
    isInvalidText(instructions) ||
    isInvalidText(creator) ||
    isInvalidText(creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error('Invalid input')
    return {
      message: 'Invalid input.'
    }
  }
  await saveMeal(meal);
  // redirect("/meals");
}
