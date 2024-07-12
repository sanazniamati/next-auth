/** @format */

// library
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";

// action
import { checkOtpAction } from "@/actions/checkOtp";

// context
import { useAuthContext } from "@/context/AuthContext";
import { useLogin } from "../../app/auth/login/context";

// interface & types
import { IFormFieldCheckOtp, IResponce } from "@/services/user/models";

// style
import styleLogin from "../../app/auth/login/style.module.css";

// components
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const onFinishFailed: FormProps<IFormFieldCheckOtp>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function CheckOtpForm() {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<IResponce>();
  const { values, func } = useAuthContext();
  // const { phoneNumber } = values;
  const { loginUser } = func;
  const router = useRouter();
  const { userCellPhone } = useLogin();

  async function checkOtp(values: IFormFieldCheckOtp) {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      // بعدا چک کن
      values.phoneNumber = userCellPhone;
      console.log("on Checkotp :", values.phoneNumber);
      const result = await checkOtpAction(values);
      setResultMessage(result.resultMessage);
      console.log("result on Checkotp", result);

      if (resultMessage?.resultNotify?.status === "error") {
        setError(resultMessage.resultNotify.message);
      } else if (resultMessage?.resultNotify?.status === "success") {
        setSuccess(resultMessage.resultNotify.message);
        // valizadeh
        if (result.userInfo) {
          loginUser(result.userInfo);
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className={styleLogin.card}>
      <Form
        form={form}
        className={styleLogin.loginForm}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={checkOtp}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "YekanBakh-Bold" }}>
          کد تایید را وارد کنید
        </Typography.Title>
        <Form.Item<IFormFieldCheckOtp>
          label=" کد تایید "
          name="otp"
          rules={[{ required: true, message: "  لطفا کد تایید را وارد کنید " }]}
        >
          <Input name="otp" placeholder=" 45565" />
        </Form.Item>
        <Form.Item<IFormFieldCheckOtp>
          label=" گذرواژه  "
          name="password"
          rules={[{ required: true, message: "  لطفا گذرواژه را وارد کنید " }]}
        >
          <Input name="password" type="password" placeholder=" 123456" />
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

export default CheckOtpForm;
