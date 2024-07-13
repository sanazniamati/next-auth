/** @format */

import { IResponce } from "@/services/user/models";
import { postFetch } from "./fetch"; // Adjust the import path as necessary

const performServerAction = async (url: string, body: {} = {}) => {
  let resultMessage: IResponce = {
    resultNotify: {
      status: undefined,
      message: "",
    },
  };

  try {
    const res = await postFetch(url, body);

    if (res.errors) {
      resultMessage.resultNotify!.status = "error";
      resultMessage.resultNotify!.message = res.errors[0].message;
      return { resultMessage };
    }

    resultMessage.resultNotify!.status = "success";
    resultMessage.resultNotify!.message = "Operation successful";
    const token = res.token;
    const userInfo = res.user;
    // resultMessage.data = res;
    return { resultMessage, userInfo, token };
  } catch (error) {
    resultMessage.resultNotify!.status = "error";
    resultMessage.resultNotify!.message = "خطا در ورود";
    return { resultMessage };
  }
};

export default performServerAction;
