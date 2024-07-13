/** @format */
"use server";

import { cookies } from "next/headers";
import { postFetch } from "../../utils/fetch";
import { IResponce, IUserInfo } from "../services/user/models";
import { ILoginWithEmail } from "@/services/user/models";
import { UsersUrls } from "@/services/user/url";

import performServerAction from "../../utils/performServerAction";

export async function loginAction(values: ILoginWithEmail) {
  let resultMessage: IResponce = {
    resultNotify: {
      status: undefined,
      message: "",
    },
  };

  const email = values.email;
  const password = values.password;

  const res = await performServerAction(UsersUrls.login, { email, password });

  // if (res.errors) {
  //   (resultMessage.resultNotify!.status = "error"), (resultMessage.resultNotify!.message = res.errors[0].message);
  //   return { resultMessage };
  // }
  if (resultMessage.resultNotify!.status === "success") {
    cookies().set({
      name: "token",
      value: res.token,
      httpOnly: true,
    });

    (resultMessage.resultNotify!.status = "success"), (resultMessage.resultNotify!.message = "با موفقیت وارد شدید");
    // (resultMessage.userInfo = res.user);
    const userInfo: IUserInfo = res.userInfo;

    return { resultMessage, userInfo };
  }
}
