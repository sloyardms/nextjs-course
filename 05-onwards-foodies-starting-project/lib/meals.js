import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals(){
    //await new Promise((resolve) => setTimeout(resolve, 2000));

    //throw  new Error("Loading meals failed");
    const meals = db.prepare("SELECT * FROM meals").all();
    return meals;
}

export function getMeal(slug){
    const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
    return meal;
}

export function addMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);
}