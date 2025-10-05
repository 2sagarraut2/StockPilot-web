import { Input } from "antd";
import React from "react";

const InputField = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="flex flex-col">
    {label && (
      <label className="mb-1 font-medium text-sm text-gray-700">{label}</label>
    )}
    <Input ref={ref} {...props} size="large" />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
));

export default InputField;
