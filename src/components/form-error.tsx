/** @format */

import { Alert } from "antd";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div>
      <Alert style={{ marginBottom: 10 }} message={message} type="error" showIcon />
    </div>
  );
}
