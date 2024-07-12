/** @format */
"use client";

// library
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, Typography } from "antd";

// style
import styleLogin from "./style.module.css";

// action
import { registerAction } from "../../../actions/register";

// types and interface
import { IRegister } from "@/services/user/models";

// components
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const onFinishFailed: FormProps<IRegister>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Register() {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onRegisterSubmit(values: IRegister) {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const result = await registerAction(values);

      if (result.resultNotify?.status === "error") {
        setError(result.resultNotify.message);
      } else if (result.resultNotify?.status === "success") {
        setSuccess(result.resultNotify.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      router.push("/auth/login");
    }
  }, [success]);

  return (
    <div className={styleLogin.appBg}>
      <Card className={styleLogin.card}>
        <Form
          className={styleLogin.loginForm}
          name="basic"
          initialValues={{ remember: true }}
          form={form}
          onFinish={onRegisterSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "YekanBakh-Bold" }}>
            فرم ثبت نام
          </Typography.Title>
          <Form.Item<IRegister>
            label="نام "
            name="name"
            rules={[{ required: true, message: "لطفا نام کاربری را انتخاب کنید" }]}
          >
            <Input name="name" placeholder="نام " />
          </Form.Item>
          <Form.Item<IRegister>
            label="ایمیل"
            name="email"
            rules={[{ required: true, message: "لطفا نام کاربری را انتخاب کنید" }]}
          >
            <Input name="email" placeholder="ایمیل " />
          </Form.Item>
          <Form.Item<IRegister>
            label="شماره تلفن"
            name="phoneNumber"
            rules={[{ required: true, message: "لطفا شماره تلفن را انتخاب کنید" }]}
          >
            <Input name="phoneNumber" placeholder="09384997337 " />
          </Form.Item>

          <Form.Item<IRegister>
            label="گذرواژه"
            name="password"
            rules={[{ required: true, message: "لطفا پسورد را وارد کنید" }]}
          >
            <Input.Password name="password" placeholder="گذرواژه" />
          </Form.Item>
          {error && <FormError message={error} />}

          {success && <FormSuccess message={success} />}

          <Form.Item>
            <Button loading={loading} style={{ fontFamily: "YekanBakh-Bold" }} type="primary" htmlType="submit" block>
              ثبت نام
            </Button>
          </Form.Item>
          <Form.Item<IRegister>>
            <Link href={"/auth/login"}>قبلا ثبت نام کرده ام</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
