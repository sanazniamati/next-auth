/** @format */

import { Alert } from "antd";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div>
      <Alert message={message} type="success" showIcon />
    </div>
  );
}
