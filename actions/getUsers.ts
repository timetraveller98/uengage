"use server";
import { hash } from "bcrypt";
import { db } from "@/libs/db";
export async function setUsers(formData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: "Invalid email format." };
    }

    if (password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters.",
      };
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "Email already exists." };
    }

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      success: true,
      message: "Account created..",
    };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Failed to register user." };
  }
}
// Fetch Users

export default async function getUsers() {
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error: unknown) {
    console.error("Error fetching users:", error);
    return [];
  }
}
