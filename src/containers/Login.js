import { useState } from "react";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import { Flex, Radio } from "antd";
import LogoComponent from "../components/LogoComponent";
import IntroModal from "../components/IntroModal";

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
    <div className="px-6 py-24 flex justify-center">
      <div
        className="space-y-4 p-6 bg-white shadow-md rounded-md w-full max-w-md"
        style={{
          boxShadow: "0 0 6px rgba(0,0,0,0.1), 0 -2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <section className="flex justify-center">
          <LogoComponent />
        </section>
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
        <IntroModal />
      </div>
    </div>
  );
};

export default Login;
