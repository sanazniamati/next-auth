/** @format */

"use server";

import { postFetch } from "../../utils/fetch";
import { IResponce } from "../services/user/models";
import { IRegister } from "@/services/user/models";
import { UsersUrls } from "@/services/user/url";

export async function registerAction(values: IRegister) {
  const name = values.name;
  const email = values.email;
  const phoneNumber = values.phoneNumber;
  const password = values.password;

  const res = await postFetch(UsersUrls.users, { name, email, phoneNumber, password });
  let resultMessage: IResponce = {
    resultNotify: {
      status: undefined,
      message: "",
    },
  };

  if (res.errors) {
    (resultMessage.resultNotify!.status = "error"), (resultMessage.resultNotify!.message = res.errors[0].message);

    return resultMessage;
  }

  (resultMessage.resultNotify!.status = "success"),
    (resultMessage.resultNotify!.message = "ثبت نام با موفقیت انجام شد");

  return resultMessage;
}
