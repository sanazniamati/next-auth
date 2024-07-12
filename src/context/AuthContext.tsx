/** @format */
"use client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { meAction } from "../actions/me";
import { IUserInfo } from "@/services/user/models";
import { logoutAction } from "@/actions/logout";
import { Spin } from "antd";

interface IContext {
  values: {
    user: IUserInfo | undefined;
    // phoneNumber: string | undefined;
  };
  // dispatch: {
  //   setCellphone: Dispatch<SetStateAction<string | undefined>>;
  // };
  func: {
    loginUser: (user: IUserInfo | undefined) => void;
    logoutUser: () => void;
  };
}

const AuthContext = createContext<IContext>({
  values: {
    user: undefined,
    // phoneNumber: undefined,
  },
  // dispatch: {
  //   setCellphone: () => {},
  // },
  func: {
    loginUser: () => {},
    logoutUser() {},
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  // const [cellphone, setCellphone] = useState<string | undefined>();

  const loginContext = (user: IUserInfo | undefined) => {
    setUser(user);
  };

  const logoutContext = async () => {
    await logoutAction().finally(() => {
      setUser(undefined);
    });
  };

  const contextValue: IContext = {
    values: {
      user: user,
      // phoneNumber: cellphone,
    },
    // dispatch: {
    //   setCellphone,
    // },
    func: {
      loginUser: loginContext,
      logoutUser: logoutContext,
    },
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const result = await meAction();
        console.log("from context", result);
        if (result) {
          // if (result?.resultNotify?.status == "error") {
          loginContext(result);
        } else {
          loginContext(undefined);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  return <AuthContext.Provider value={contextValue}> {loading ? <Spin fullscreen /> : children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
