import { useForm, Controller } from "react-hook-form";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import { useAuth } from "../../utils/hooks/auth/useAuth";
import { Button, Divider } from "antd";

export default function AuthForm({ mode = "login" }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "Sagar@gmail.com", // default email for testing
      password: "Sagar@123", // default password for testing
      //   firstName: mode === "signup" ? "John" : "", // default firstName only for signup
      //   confirmPassword: mode === "signup" ? "Test@123" : "",
    },
  });
  const { login, signup, loading } = useAuth();

  const onSubmit = (data) => {
    if (mode === "login") {
      login(data.email.toLowerCase(), data.password);
    } else {
      signup(data);
    }
  };

  const handleDemoUserLogin = () => {
    const email = "Demo@gmail.com";
    const password = "Demo@123";
    return login(email, password);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-6 bg-white rounded-md w-full max-w-md"
      >
        <div className="flex items-center">
          <Button
            onClick={handleDemoUserLogin}
            block
            variant="outlined"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-package w-6 h-6"
                aria-hidden="true"
                style={{
                  color: "rgb(24, 144, 255)",
                  width: "18px",
                  height: "18px",
                }}
              >
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                <path d="M12 22V12"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <path d="m7.5 4.27 9 5.15"></path>
              </svg>
            }
          >
            Try Demo Account
          </Button>
        </div>
        <Divider>OR</Divider>
        {mode === "signup" && (
          <>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <InputField
                  label="First Name"
                  {...field}
                  error={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <InputField
                  label="Last Name"
                  {...field}
                  error={errors.lastName?.message}
                />
              )}
            />
          </>
        )}
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <InputField
              label="Email"
              type="email"
              {...field}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <PasswordField
              label="Password"
              {...field}
              error={errors.password?.message}
            />
          )}
        />
        {mode === "signup" && (
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            }}
            render={({ field }) => (
              <PasswordField
                label="Confirm Password"
                {...field}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        )}
        <Button
          htmlType="submit"
          type="primary"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
        </Button>
      </form>
    </>
  );
}
