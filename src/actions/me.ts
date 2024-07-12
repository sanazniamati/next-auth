/** @format */
"use server";
import { cookies } from "next/headers";
import { getFetch } from "../../utils/fetch";
import { IResponce, IUserInfo } from "../services/user/models";
import { UsersUrls } from "@/services/user/url";

export async function meAction() {
  let resultMessage: IResponce = {};
  const token = cookies().get("token");

  if (!token) {
    // resultMessage.userInfo = undefined;

    // return resultMessage;
    return undefined;
  }

  const res = await getFetch(UsersUrls.me, { Authorization: `Bearer ${token.value}` });

  const userInfo: IUserInfo | undefined = res.user;
  return userInfo;
  // if (!res.user) {
  //   resultMessage.userInfo = undefined;
  //   return resultMessage;
  // }

  // resultMessage.userInfo = res.user;
}
