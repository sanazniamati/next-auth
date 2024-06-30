/** @format */
"use server";
import { cookies } from "next/headers";
import { getFetch } from "../../utils/fetch";
import { IResponce } from "@/types/types";

export async function meAction() {
  const token = cookies().get("token");

  if (!token) {
    const resultMessage: IResponce = {
      userInfo: undefined,
    };
    return {
      resultMessage,
    };
  }

  const res = await getFetch("/users/me", { Authorization: `Bearer${token?.value}` });
  if (!res.user) {
    const resultMessage: IResponce = {
      userInfo: undefined,
    };
    return {
      resultMessage,
    };
  }

  const resultMessage: IResponce = {
    userInfo: res.user,
  };
  return resultMessage;
}
