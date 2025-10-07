import { useDispatch } from "react-redux";
import { setLoading, setStock } from "../../redux/stockSlice";
import { stockData } from "../../../api/stockDetails";

const useStock = () => {
  const dispatch = useDispatch();

  // async function returned by the hook
  const getStocksfromCustomHook = async (page, limit) => {
    dispatch(setLoading(true));
    try {
      const res = await stockData(page, limit);

      if (res.status === 200) {
        const { data, total } = res.data;

        if (Array.isArray(data)) {
          dispatch(
            setStock({
              items: data,
              total,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };

  // TODO: add Stock
  const addStockCustomHook = async () => {
    try {
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    }
  };

  // TODO: update Stock
  const updateStockCustomHook = async () => {
    try {
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    }
  };

  // TODO: delete Stock
  const deleteStockCustomHook = async () => {
    try {
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    }
  };

  return {
    getStocksfromCustomHook,
    addStockCustomHook,
    updateStockCustomHook,
    deleteStockCustomHook,
  };
};

export default useStock;
