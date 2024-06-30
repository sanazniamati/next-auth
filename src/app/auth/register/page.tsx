/** @format */
"use client";

import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, Typography, FormInstance, FormRule } from "antd";
import styleLogin from "./style.module.css";
import Link from "next/link";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { registerAction } from "../../../actions/register";
import { RegisterSchema, registerSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

const onFinishFailed: FormProps<RegisterSchema>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Register() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onFinish: FormProps<RegisterSchema>["onFinish"] = (values) => {
    // startTransition(async () => {
    onRegisterSubmit(values);

    // });
  };

  async function onRegisterSubmit(values: RegisterSchema) {
    // setError("");
    // setSuccess("");
    const result = await registerAction(values);
    console.log("from onRigister", result);

    if (result.resultNotify?.status === "error") {
      setError(result.resultNotify.message);
      console.log("error:", error);
    } else if (result.resultNotify?.status === "success") {
      setSuccess(result.resultNotify.message);

      console.log("success", success);
    }
  }

  useEffect(() => {
    if (success) {
      router.push("/auth/login");
    }
  }, [success]);

  const [form] = Form.useForm();

  return (
    <div className={styleLogin.appBg}>
      <Card className={styleLogin.card}>
        <Form
          // onSubmitCapture={handleSubmit(onRegisterSubmit)}
          // action={formAction}
          className={styleLogin.loginForm}
          name="basic"
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "YekanBakh-Bold" }}>
            فرم ثبت نام
          </Typography.Title>
          <Form.Item<FieldType>
            label="نام "
            name="name"
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
          <FormError message={error} />
          <FormSuccess message={success} />

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
