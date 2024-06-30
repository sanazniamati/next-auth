/** @format */
// TODO unknown
export interface userInfoType {
  [key: string]: unknown;
}
export interface IResponce {
  resultNotify?: {
    status: "error" | "success";
    message: string;
  };
  userInfo?: userInfoType;
  //   userInfo?: Record<string, unknown>;
}
