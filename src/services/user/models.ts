/** @format */

export interface IUserInfo {
  id: string;
  name: string;
  roles: ("user" | "admin")[];
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  loginAttempts: number;
}

export interface IResponce {
  resultNotify?: {
    status: "error" | "success" | undefined;
    message: string;
  };
  // userInfo?: IUserInfo;
  // userCellphone?: string;
}

export interface IRegister {
  name?: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface ILoginWithEmail {
  email: string;
  password: string;
}

export interface ILoginWithPhone {
  phoneNumber: string;
}

export interface IFormFieldCheckOtp {
  phoneNumber: string | undefined;
  password: string;
  otp: string;
}
