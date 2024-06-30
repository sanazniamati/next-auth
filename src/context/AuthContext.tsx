/** @format */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { meAction } from "../../actions/me";
interface IContext {
  values: {
    user: {} | undefined;
  };
  func: {
    loginUser: (user: {} | undefined) => void;
    logoutUser: () => void;
  };
}
const AuthContext = createContext<IContext>({
  values: {
    user: {},
  },
  func: {
    loginUser: () => {},
    logoutUser() {},
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{} | undefined>();
  const loginContext = (user: {} | undefined) => {
    setUser(user);
  };
  const logoutContext = () => {
    setUser({});
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const data = await meAction();
      console.log(data);
    };
    checkUserLoggedIn();
  }, []);
  const contextValuee: IContext = {
    values: {
      user: user,
    },
    func: {
      loginUser: loginContext,
      logoutUser: logoutContext,
    },
  };
  return <AuthContext.Provider value={contextValuee}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
