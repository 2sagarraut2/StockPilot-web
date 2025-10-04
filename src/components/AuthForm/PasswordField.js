import { Input } from "antd";
import React from "react";

const PasswordField = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col relative">
      {label && (
        <label className="mb-1 font-medium text-sm text-gray-700">
          {label}
        </label>
      )}
      <Input.Password
        ref={ref}
        className="border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
        {...props}
      />

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});

export default PasswordField;
