/** @format */
"use client";

import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import { Row, Col } from "antd";
import styleLogin from "./style.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "../../../../actions/login";
import { LoginSchema, loginSchema } from "@/schemas";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  password?: string;
  // remember?: string;
};

const onFinishFailed: FormProps<LoginSchema>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const onFinish: FormProps<LoginSchema>["onFinish"] = (values) => {
    onLoginSubmit(values);
    console.log("Success:", values);
  };

  async function onLoginSubmit(values: LoginSchema) {
    // setError("");
    // setSuccess("");
    const result = await loginAction(values);
    console.log("from onLogin", result);

    if (result.status === "error") {
      setError(result.message);
      console.log("error:", error);
    } else if (result.notify?.status === "success") {
      setSuccess(result.notify.message);
      // router.push("/auth/login");
      console.log("success", success);
    }
  }

  useEffect(() => {
    if (success) {
      router.push("/");
    }
  }, [success]);

  const [form] = Form.useForm();

  return (
    <div className={styleLogin.appBg}>
      <Card className={styleLogin.card}>
        <Form
          form={form}
          className={styleLogin.loginForm}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "YekanBakh-Bold" }}>
            فرم ورود
          </Typography.Title>
          <Form.Item<LoginSchema>
            label=" ایمیل"
            name="email"
            rules={[{ required: true, message: "لطفا نام کاربری را انتخاب کنید" }]}
          >
            <Input name="email" placeholder=" ایمیل" />
          </Form.Item>

          <Form.Item<LoginSchema>
            label="گذرواژه"
            name="password"
            rules={[{ required: true, message: "لطفا پسورد را وارد کنید" }]}
          >
            <Input.Password name="password" placeholder="گذرواژه" />
          </Form.Item>

          {/* <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
            <Checkbox>مرا بخاطر بسپار</Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Button style={{ fontFamily: "YekanBakh-Bold" }} type="primary" htmlType="submit" block>
              ورود
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
