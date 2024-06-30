/** @format */
"use server";
import { cookies } from "next/headers";
import { postFetch } from "../../utils/fetch";
import { IResponce } from "@/types/types";

export async function logoutAction() {
  const token = cookies().get("token");

  const res = await postFetch("/users/logout", { Authorization: `Bearer ${token?.value}` });
  console.log("res from logoutAction", res);

  if (res.message) {
    const reportMessage: IResponce = {
      resultNotify: {
        status: "success",
        message: "خروج با موفقیت",
      },
    };
    return reportMessage;
  } else {
    const reportMessage: IResponce = {
      resultNotify: {
        status: "error",
        message: res.errors[0].message,
      },
    };
    return reportMessage;
  }
}
