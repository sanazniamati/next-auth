/** @format */
"use server";
import { IResponce } from "../services/user/models";
import { postFetch } from "../../utils/fetch";
import { ILoginWithPhone } from "@/services/user/models";
import { UsersUrls } from "@/services/user/url";

export async function loginWithPhoneAction(values: ILoginWithPhone) {
  let resultMessage: IResponce = {
    resultNotify: {
      status: undefined,
      message: "",
    },
  };
  const phoneNumber = values.phoneNumber;
  console.log("phoneNumber :", phoneNumber);

  const pattern = /^(\+98|0)?9\d{9}$/;
  if (!pattern.test(phoneNumber)) {
    (resultMessage.resultNotify!.status = "error"), (resultMessage.resultNotify!.message = "فرمت موبایل نامعتبر است");
    return { resultMessage };
  }

  const res = await postFetch(UsersUrls.loginByPhoneNumber, { phoneNumber });
  console.log("res from loginByPhoneNumber ", res);

  if (!res.success) {
    (resultMessage.resultNotify!.status = "error"), (resultMessage.resultNotify!.message = "  شما ثبت نام نکرده اید");
    return { resultMessage };
  }

  (resultMessage.resultNotify!.status = "success"),
    (resultMessage.resultNotify!.message = " کد ورود با موفقیت ارسال شد ");
  // resultMessage.userCellphone = phoneNumber;
  return { resultMessage, phoneNumber };
}
