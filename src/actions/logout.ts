/** @format */
"use server";
import { cookies } from "next/headers";
import { postFetch } from "../../utils/fetch";
import { IResponce } from "@/services/user/models";
import { UsersUrls } from "@/services/user/url";

export async function logoutAction() {
  const token = cookies().get("token");

  if (!token) {
    return;
  }

  const res = await postFetch(UsersUrls.logout, { Authorization: `Bearer ${token?.value}` });
  if (res.status === 200) {
    // if (res.message) {
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
