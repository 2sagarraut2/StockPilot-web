import { useDispatch } from "react-redux";
import { addHistory, setLoading } from "../../redux/historySlice";
import { historyData } from "../../../api/historyDetails";
import { showMessage } from "../../../components/common/CustomMessage";
import { setLoading } from "../../redux/categorySlice";

const useHistory = () => {
  const dispatch = useDispatch();

  const getHistoryFromCustomHook = async (module, id) => {
    dispatch(setLoading(true));

    try {
      const res = await historyData(module, id);
      if (res.status === 200) {
        dispatch(addHistory(res.data.data));
        return true;
      }
    } catch (err) {
      console.error(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
      dispatch(addHistory([]));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { getHistoryFromCustomHook };
};

export default useHistory;
