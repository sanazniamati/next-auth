/** @format */
"use server";

import { IFormFieldCheckOtp, IResponce, IUserInfo } from "@/services/user/models";
import { postFetch } from "../../utils/fetch";
import { cookies } from "next/headers";
import { USER_TOKEN_NAME } from "../constants/cookies";
import { UsersUrls } from "@/services/user/url";

export async function checkOtpAction(values: IFormFieldCheckOtp) {
  let resultMessage: IResponce = {
    resultNotify: {
      status: undefined,
      message: "",
    },
  };
  const code = values.otp;
  const password = values.password;
  const phoneNumber = values.phoneNumber;
  console.log("checkOtp :", code, password, phoneNumber);

  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(code)) {
    (resultMessage.resultNotify!.status = "error"), (resultMessage.resultNotify!.message = "فرمت کد تایید نامعتبر است");
    console.log("from checkPattern", resultMessage);
    return { resultMessage };
  }

  const res = await postFetch(UsersUrls.confirmCode, { code, password, phoneNumber });
  console.log("res from confirmCode : ", res);

  if (!res.success) {
    (resultMessage.resultNotify!.status = "error"),
      (resultMessage.resultNotify!.message = "The email or password provided is incorrect");
    console.log("from status = error", resultMessage);
    return { resultMessage };
  }

  cookies().set({
    name: USER_TOKEN_NAME,
    value: res.doc.token,
    httpOnly: true,
  });

  console.log("token", res.doc.token);

  (resultMessage.resultNotify!.status = "success"), (resultMessage.resultNotify!.message = " با موفقیت وارد شدید");
  // resultMessage.userInfo = res.doc.user;
  const userInfo: IUserInfo = res.doc.user;

  console.log("from status = success", resultMessage);
  return { resultMessage, userInfo };
}
