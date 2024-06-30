/** @format */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { meAction } from "../actions/me";
import { userInfoType } from "@/types/types";

interface IContext {
  values: {
    user: userInfoType | undefined;
  };
  func: {
    loginUser: (user: userInfoType | undefined) => void;
    logoutUser: () => void;
  };
}
const AuthContext = createContext<IContext>({
  values: {
    user: undefined,
  },
  func: {
    loginUser: () => {},
    logoutUser() {},
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userInfoType>();

  const loginContext = (user: userInfoType | undefined) => {
    setUser(user);
  };
  const logoutContext = () => {
    setUser(undefined);
  };

  const contextValuee: IContext = {
    values: {
      user: user,
    },
    func: {
      loginUser: loginContext,
      logoutUser: logoutContext,
    },
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const result = await meAction();
      console.log("result from context", result);
      // if (result?.userInfo) {
      //   loginContext(result.userInfo);
      // } else {
      //   loginContext(undefined);
      // }
    };
    checkUserLoggedIn();
  }, []);

  return <AuthContext.Provider value={contextValuee}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
