/** @format */
"use server";
import { cookies } from "next/headers";
import { getFetch } from "../../utils/fetch";
import { IResponce } from "@/types/types";

export async function meAction() {
  const token = cookies().get("token");
  // console.log("token from me ", token);

  if (!token) {
    const resultMessage: IResponce = {
      userInfo: undefined,
    };
    // console.log("from meaction 1", resultMessage);
    return {
      resultMessage,
    };
  }

  const res = await getFetch("/users/me", { Authorization: `Bearer ${token.value}` });
  // console.log("from meaction 0", res);
  if (!res.user) {
    const resultMessage: IResponce = {
      userInfo: undefined,
    };
    // console.log("from meaction 2", resultMessage);
    return {
      resultMessage,
    };
  }

  const resultMessage: IResponce = {
    userInfo: res.user,
  };
  // console.log("from meaction 3", resultMessage);
  return resultMessage;
}
