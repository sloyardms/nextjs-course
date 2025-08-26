import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals(){
    const meals = db.prepare("SELECT * FROM meals").all();
    return meals;
}