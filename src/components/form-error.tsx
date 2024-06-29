/** @format */

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "hsl(0 84.2% 60.2%)/15",
        borderRadius: "5px",
        fontSize: "14px",
        padding: "12 px",
      }}
    >
      <ExclamationTriangleIcon style={{ width: 16, height: 16 }} />
      {message}
    </div>
  );
}
