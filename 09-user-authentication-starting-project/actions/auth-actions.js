"use server"

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    let errors = {};

    if (!email.includes("@")) {
        errors.email = "Please enter a valid email adress."
    }

    if (password.trim().length < 8) {
        errors.password = "Password must be at lease 8 characters long.";
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
        }
    }

    //store it in the database (create new user)
    const hashedPassword = hashUserPassword(password);
    try {
        const id = createUser(email, hashedPassword);
        await createAuthSession(id)
        redirect("/training");
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return {
                errors: {
                    email: "It seems like an account for the chosen email already exists."
                }
            }
        }
        throw error;
    }
}

export async function login(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const existingUser = getUserByEmail(email);

    if (!existingUser) {
        return {
            errors: {
                email: "Could not authenticate user, please check your credentials."
            }
        }
    }

    const isValidPassword = verifyPassword(existingUser.password, password);

    if (!isValidPassword) {
        if (!existingUser) {
            return {
                errors: {
                    password: "Could not authenticate user, please check your credentials."
                }
            }
        }
    }

    await createAuthSession(existingUser.id)
    redirect("/training");
}