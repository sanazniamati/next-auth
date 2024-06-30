/** @format */

export interface userInfoType {
  [key: string]: string;
}
export interface IResponce {
  resultNotify?: {
    status: "error" | "success";
    message: string;
  };
  userInfo?: userInfoType;
}
