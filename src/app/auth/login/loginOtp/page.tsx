/** @format */
"use client";

// library
import { FC, useState } from "react";

// style
import styleLogin from "../style.module.css";

// components
import LoginForm from "@/components/login-otp/LoginForm";
import CheckOtpForm from "@/components/login-otp/CheckOtpForm";
import { LoginProvider } from "../context";

enum LoginStep {
  LoginForm = 1,
  CheckOtpForm = 2,
}

const LoginWithOtp: FC = () => {
  const [step, setStep] = useState<LoginStep>(LoginStep.LoginForm);
  return (
    <LoginProvider>
      <div className={styleLogin.appBg}>
        {step == 1 && <LoginForm setStep={setStep} />}
        {step == 2 && <CheckOtpForm />}
      </div>
    </LoginProvider>
  );
};

export default LoginWithOtp;
