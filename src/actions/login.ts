/** @format */
"use server";

import { cookies } from "next/headers";

import { LoginSchema, loginSchema } from "@/schemas";
import { postFetch } from "../../utils/fetch";
import { IResponce } from "@/types/types";

export async function loginAction(values: LoginSchema) {
  const email = values.email;
  const password = values.password;
  const res = await postFetch("/users/login", { email, password });

  if (res.errors) {
    const resultMessage: IResponce = {
      resultNotify: {
        status: "error",
        message: res.errors[0].message,
      },
    };
    return resultMessage;
  }

  cookies().set({
    name: "token",
    value: res.token,
    httpOnly: true,
  });

  const resultMessage: IResponce = {
    resultNotify: {
      status: "success",
      message: "با موفقیت وارد شدید",
    },
    userInfo: res.user,
  };
  return resultMessage;
}
