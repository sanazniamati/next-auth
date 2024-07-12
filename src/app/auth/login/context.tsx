/** @format */

"use client";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";

interface IContext {
  userCellPhone: string | undefined;
  setCellPhone: Dispatch<SetStateAction<string | undefined>>;
}
const defaultContext: IContext = {
  userCellPhone: "",
  setCellPhone: () => {},
};
export const LoginCTX = createContext<IContext>(defaultContext);

export const LoginProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userCellPhone, setCellPhone] = useState<string | undefined>();
  console.log("userCellPhone from context :", userCellPhone);

  const ctxValue: IContext = {
    userCellPhone,
    setCellPhone,
  };
  return <LoginCTX.Provider value={ctxValue}>{children}</LoginCTX.Provider>;
};

export const useLogin = () => useContext(LoginCTX);
