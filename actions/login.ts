/** @format */
"use server";

import { cookies } from "next/headers";

import { LoginSchema, loginSchema } from "@/schemas";
import { postFetch } from "../utils/fetch";

export async function loginAction(values: LoginSchema) {
  const email = values.email;
  const password = values.password;
  const data = await postFetch("/users/login", { email, password });

  console.log("formData : ", data.message);
  if (data.ok) {
    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
    });
    return {
      success: "success you are logged in",
      user: data.user,
    };
  } else {
    return {
      error: "error",
    };
  }
}
