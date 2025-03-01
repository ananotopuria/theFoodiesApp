// import fs from "node:fs";
// import sql from "better-sqlite3";
// import slugify from "slugify";
// import xss from "xss";

// const db = sql("meals.db");

// export async function getMeals() {
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   // throw new Error("loading meals failed")
//   return db.prepare("SELECT * FROM meals").all();
// }

// export function getMeal(slug) {
//   // await new Promise((resolve) => setTimeout(resolve, 5000));
//   return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
// }

// export async function saveMeal(meal) {
//   meal.slug = slugify(meal.title, { lower: true });
//   meal.instructions = xss(meal.instructions);
//   const extension = meal.image.name.split(".").pop();
//   const fileName = `${meal.slug}.${extension}`;
//   const stream = fs.createWriteStream(`public/images/${fileName}`);
//   const bufferedImage = await meal.image.arrayBuffer();
//   stream.write(Buffer.from(bufferedImage), (error) => {
//     if (error) {
//       throw new Error("Saving image failed!");
//     }
//   });
//   meal.image = `/images/${fileName}`;

//   db.prepare(
//     `
//     INSERT INTO meals
//       (title, summary, instructions, creator, creator_email, image, slug)
//     VALUES (
//       @title,
//       @summary,
//       @instructions,
//       @creator,
//       @creator_email,
//       @image,
//       @slug
//     )
//     `
//   ).run(meal);
// }


import sql from "better-sqlite3";
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
};

export const getSingleMeal = async (mealID) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  // Take care not to use the slug/mealID directly in any query to the database.
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealID);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) throw new Error("Saving Image Failed!!!");
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
};