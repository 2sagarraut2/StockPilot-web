import { useForm, Controller } from "react-hook-form";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "antd";

export default function AuthForm({ mode = "login" }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "Sagar@gmail.com", // default email for testing
      password: "Sagar@123", // default password for testing
      firstName: mode === "signup" ? "John" : "", // default firstName only for signup
      confirmPassword: mode === "signup" ? "Test@123" : "",
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-6 bg-white rounded-md w-full max-w-md"
      >
        {mode === "signup" && (
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
            rules={{ required: "Confirm your password" }}
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
