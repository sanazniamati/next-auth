/** @format */
"use client";

// library
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, Typography } from "antd";

// style
import styleLogin from "./style.module.css";

// action
import { loginAction } from "../../../actions/login";

// components
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

// context
import { useAuthContext } from "@/context/AuthContext";

// types &interface
import { ILoginWithEmail, IResponce } from "@/services/user/models";

const onFinishFailed: FormProps<ILoginWithEmail>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<IResponce>();
  const router = useRouter();
  const { func } = useAuthContext();
  const { loginUser } = func;

  async function onLoginSubmit(values: ILoginWithEmail) {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const result = await loginAction(values);
      setResultMessage(result.resultMessage);
      if (result.resultMessage.resultNotify?.status === "error") {
        setError(result.resultMessage.resultNotify.message);
      } else if (result.resultMessage.resultNotify?.status === "success") {
        setSuccess(result.resultMessage.resultNotify.message);
        loginUser(result.userInfo);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if (success) {
  //     router.push("/");
  //   }
  // }, [success]);

  return (
    <div className={styleLogin.appBg}>
      <Card className={styleLogin.card}>
        <Form
          form={form}
          className={styleLogin.loginForm}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onLoginSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "YekanBakh-Bold" }}>
            فرم ورود
          </Typography.Title>
          <Form.Item<ILoginWithEmail>
            label=" ایمیل"
            name="email"
            rules={[{ required: true, message: "لطفا نام کاربری را انتخاب کنید" }]}
          >
            <Input name="UserName" placeholder=" ایمیل" />
          </Form.Item>

          <Form.Item<ILoginWithEmail>
            label="گذرواژه"
            name="password"
            rules={[{ required: true, message: "لطفا پسورد را وارد کنید" }]}
          >
            <Input.Password name="Password" placeholder="گذرواژه" />
          </Form.Item>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Form.Item>
            <Button loading={loading} style={{ fontFamily: "YekanBakh-Bold" }} type="primary" htmlType="submit" block>
              ورود
            </Button>
          </Form.Item>
        </Form>
        <Link href={"/auth/login/loginOtp"}>ورود با شماره تلفن</Link>
      </Card>
    </div>
  );
}

export default Login;
