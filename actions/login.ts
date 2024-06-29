/** @format */
"use server";

import { cookies } from "next/headers";

import { LoginSchema, loginSchema } from "@/schemas";
import { postFetch } from "../utils/fetch";

export async function loginAction(values: LoginSchema) {
  const email = values.email;
  const password = values.password;
  const res = await postFetch("/users/login", { email, password });

  if (res.errors) {
    return {
      status: "error",
      message: res.errors[0].message,
    };
  }
  cookies().set({
    name: "token",
    value: res.token,
    httpOnly: true,
  });
  return {
    notify: {
      status: "success",
      message: "با موفقیت وارد شدید",
    },
    userInfo: res.user,
  };
}
