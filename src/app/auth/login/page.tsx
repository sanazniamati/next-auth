/** @format */
"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import { Row, Col } from "antd";
import styleLogin from "./style.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "../../../../actions/login";
import { LoginSchema, loginSchema } from "@/schemas";

type FieldType = {
  email?: string;
  password?: string;
  // remember?: string;
};

const onFinish: FormProps<LoginSchema>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<LoginSchema>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = useForm();

  function onLoginSubmit(values: LoginSchema) {
    loginAction(values);
  }

  return (
    <div className={styleLogin.appBg}>
      <Card className={styleLogin.card}>
        <Form
          onSubmitCapture={handleSubmit(onLoginSubmit)}
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
