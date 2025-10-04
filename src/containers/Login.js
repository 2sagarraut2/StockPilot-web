import { useState } from "react";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import { Flex, Radio } from "antd";
import LogoComponent from "../components/LogoComponent";

const Login = () => {
  const [isLogIn, setIsLogIn] = useState(true);

  const options = [
    { label: "Sign In", value: "signin" },
    { label: "Sign Up", value: "signup" },
  ];

  const handleRadioChange = () => {
    setIsLogIn(!isLogIn);
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="space-y-4 p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <LogoComponent />
        <Flex vertical gap="middle">
          <Radio.Group
            onChange={handleRadioChange}
            block
            options={options}
            defaultValue="signin"
            optionType="button"
            buttonStyle="solid"
          />
        </Flex>
        {isLogIn ? <LoginPage /> : <SignupPage />}
      </div>
    </div>
  );
};

export default Login;
