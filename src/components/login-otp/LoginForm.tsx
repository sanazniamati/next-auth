/** @format */
"use client";
// library
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Card, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";

// style
import styleLogin from "../../app/auth/login/style.module.css";

// action
import { loginWithPhoneAction } from "@/actions/loginWithPhone";

// context
import { useAuthContext } from "@/context/AuthContext";
import { useLogin } from "../../app/auth/login/context";

// type & interface
import { ILoginWithPhone, IResponce } from "@/services/user/models";

// components
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const onFinishFailed: FormProps<ILoginWithPhone>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function LoginForm({ setStep }: IProps) {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [reportMessage, setReportMessage] = useState<IResponce>();
  const [loading, setLoading] = useState(false);
  const { setCellPhone, userCellPhone } = useLogin();
  // const { dispatch } = useAuthContext();
  // const { setCellphone } = dispatch;

  async function loginWithphone(values: ILoginWithPhone) {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const result = await loginWithPhoneAction(values);
      console.log("result if number exist :", result);
      setReportMessage(result.resultMessage);
      // valizadeh
      if (result.phoneNumber) {
        setStep(2);
        setCellPhone(result.phoneNumber);
        console.log("userCellphone", result.phoneNumber);
      }

      if (reportMessage?.resultNotify?.status === "error") {
        setError(reportMessage?.resultNotify.message);
      } else if (reportMessage?.resultNotify?.status === "success") {
        setSuccess(reportMessage?.resultNotify.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  // if (resultMessage?.resultNotify?.status === "success") {
  // if (success) {
  //   setStep(2);
  //   setCellphone(resultMessage?.userCellphone);
  // }
  // }, [resultMessage]);

  return (
    <Card className={styleLogin.card}>
      <Form
        form={form}
        className={styleLogin.loginForm}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={loginWithphone}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "YekanBakh-Bold" }}>
          ورود با شماره تلفن
        </Typography.Title>
        <Form.Item<ILoginWithPhone>
          label=" شماره تلفن"
          name="phoneNumber"
          rules={[{ required: true, message: "لطفاشماره تلفن را وارد کنید " }]}
        >
          <Input name="phoneNumber" placeholder=" 09384997337" />
        </Form.Item>

        {error && <FormError message={error} />}

        {success && <FormSuccess message={success} />}

        <Form.Item>
          <Button loading={loading} style={{ fontFamily: "YekanBakh-Bold" }} type="primary" htmlType="submit" block>
            ورود
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LoginForm;
