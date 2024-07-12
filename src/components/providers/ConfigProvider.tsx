/** @format */

import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";
import { AntConfigProvider } from "./AntConfig";

export const AppConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        components: AntConfigProvider,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
