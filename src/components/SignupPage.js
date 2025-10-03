import AuthForm from "../components/AuthForm/AuthForm";

export default function SignupPage() {
  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <AuthForm mode="signup" />
    </div>
  );
}
