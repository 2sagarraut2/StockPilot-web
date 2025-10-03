import AuthForm from "../components/AuthForm/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <AuthForm mode="login" />
    </div>
  );
}
