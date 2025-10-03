import { useState } from "react";
import { authService } from "../api/auth";
import { showMessage } from "../components/common/CustomMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/redux/userSlice";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await authService.login({ email, password });
      if (res.status === 200) {
        // Save token to localStorage/sessionStorage if needed
        dispatch(setUser(res.data.data));

        showMessage({
          type: "success",
          text: res?.data?.message,
        });

        return navigate("/", { replace: true });
      } else {
        showMessage({
          type: "success",
          text: res?.data?.message || "Login failed",
        });
      }
    } catch (err) {
      console.log("Eror occurred");
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data) => {
    try {
      setLoading(true);
      const res = await authService.signup(data);
      console.log("Signed up:", res);
    } catch (err) {
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading };
};
