/** @format */

"use server";
import { RegisterSchema, registerSchema } from "@/schemas";
import { postFetch } from "../utils/fetch";
import { getUserByEmail } from "@/data/user";

export async function registerAction(values: RegisterSchema) {
  const name = values.name;
  const email = values.email;
  const password = values.password;
  // برای چک کردن ایمیل تکراری
  // const existingUser = await getUserByEmail(email);

  // if (existingUser) {
  //   return { error: "Email already in use!" };
  // }

  const res = await postFetch("/users", { name, email, password });
  // console.log("formData : ", res.message);

  if (res.errors) {
    return {
      status: "error",
      message: res.errors[0].data[0].message,
    };
  }
  return {
    status: "success",
    message: "ثبت نام با موفقیت انجام شد",
  };
}
