/** @format */

import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgb(16 185 129 / 0.15)",
        borderRadius: "6px",
        fontSize: "14px",
        lineHeight: "20px",
        color: "rgb(16 185 129 )",
        padding: "12 px",
      }}
    >
      <CheckCircledIcon className="size-4" />
      {message}
    </div>
  );
}
