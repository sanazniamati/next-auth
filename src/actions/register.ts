/** @format */

"use server";
import { RegisterSchema, registerSchema } from "@/schemas";
import { postFetch } from "../../utils/fetch";
import { getUserByEmail } from "@/data/user";
import { IResponce } from "@/types/types";

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
    const resultMessage: IResponce = {
      resultNotify: {
        status: "error",
        message: res.errors[0].message,
      },
    };
    return resultMessage;
  }

  const resultMessage: IResponce = {
    resultNotify: {
      status: "success",
      message: "ثبت نام با موفقیت انجام شد",
    },
  };
  return resultMessage;
}
