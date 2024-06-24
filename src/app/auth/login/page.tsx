/** @format */
"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import { Row, Col } from "antd";
import styleLogin from "./style.module.css";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  return (
    <div className={styleLogin.appBg}>
      <Card className={styleLogin.card}>
        <Form
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
          <Form.Item<FieldType>
            label="نام کاربری"
            name="username"
            rules={[{ required: true, message: "لطفا نام کاربری را انتخاب کنید" }]}
          >
            <Input placeholder="نام کاربری" />
          </Form.Item>

          <Form.Item<FieldType>
            label="گذرواژه"
            name="password"
            rules={[{ required: true, message: "لطفا پسورد را وارد کنید" }]}
          >
            <Input.Password placeholder="گذرواژه" />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
            <Checkbox>مرا بخاطر بسپار</Checkbox>
          </Form.Item>

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
