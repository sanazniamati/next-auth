/** @format */
"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import styleLogin from "./style.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useFormState } from "react-dom";
import { register } from "../../../../actions/auth";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  remember?: string;
};

export type State = {
  status: string;
  message: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Register() {
  const [state, formAction] = useFormState<State, FormData>(register, {
    status: "",
    message: "",
  });

  const methods = useForm();
  const { handleSubmit } = methods;

  const submit = async (formData: FieldType) => {
    try {
      // const response = await axios.post("https://api.mv-team.ir/users", formData);
      // console.log("Form submitted successfully:", response.data);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className={styleLogin.appBg}>
      <Card className={styleLogin.card}>
        <Form
          // onSubmitCapture={handleSubmit(submit)}
          action={formAction}
          className={styleLogin.loginForm}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "YekanBakh-Bold" }}>
            فرم ثبت نام
          </Typography.Title>
          <Form.Item<FieldType>
            label="نام "
            name="username"
            rules={[{ required: true, message: "لطفا نام کاربری را انتخاب کنید" }]}
          >
            <Input name="name" placeholder="نام " />
          </Form.Item>
          <Form.Item<FieldType>
            label="ایمیل"
            name="email"
            rules={[{ required: true, message: "لطفا نام کاربری را انتخاب کنید" }]}
          >
            <Input name="email" placeholder="ایمیل " />
          </Form.Item>

          <Form.Item<FieldType>
            label="گذرواژه"
            name="password"
            rules={[{ required: true, message: "لطفا پسورد را وارد کنید" }]}
          >
            <Input.Password name="password" placeholder="گذرواژه" />
          </Form.Item>

          <Form.Item>
            <Button style={{ fontFamily: "YekanBakh-Bold" }} type="primary" htmlType="submit" block>
              ثبت نام
            </Button>
          </Form.Item>
          <Form.Item<FieldType>>
            <Link href={"/auth/login"}>قبلا ثبت نام کرده ام</Link>
            {/* <Checkbox>مرا بخاطر بسپار</Checkbox> */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
