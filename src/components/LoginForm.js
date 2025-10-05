import { Button, Input } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-4 my-6">
        <Input
          placeholder="default size"
          prefix={<UserOutlined />}
          className="min-w-60 max-w-96"
        />
        <Input
          placeholder="default size"
          prefix={<KeyOutlined />}
          className="min-w-60 max-w-96"
        />
      </div>
      <div className="mb-4">
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default LoginForm;
