import { useDispatch } from "react-redux";
import { showMessage } from "../../components/common/CustomMessage";
import { setUser } from "../redux/userSlice";
import { profileData } from "../../api/auth";
import { useNavigate } from "react-router";

const useProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserProfileData = async () => {
    try {
      const res = await profileData();

      if (res.status === 200) {
        console.log(res.data.data);
        dispatch(setUser(res.data.data.data));

        return navigate("/", { replace: true });
      }
    } catch (err) {
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    }
  };

  return { getUserProfileData };
};

export default useProfile;
