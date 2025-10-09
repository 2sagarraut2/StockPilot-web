import { useDispatch } from "react-redux";
import {
  filterStocks,
  resetFilter,
  setLoading,
  setStock,
} from "../../redux/stockSlice";
import { searchProductData, stockData } from "../../../api/stockDetails";

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

  // filterStock
  const filterStockCustoHook = async (searchText) => {
    dispatch(setLoading(true));
    try {
      const res = await searchProductData(searchText);

      if (res.status === 200) {
        const { message, data, total } = res.data;

        if (Array.isArray(data)) {
          // create a separate reducer for searchData
          dispatch(filterStocks({ items: data, total }));
        }
      }
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
      dispatch(setLoading(false));
    }
  };

  // TODO: resetFiltered stocks
  const resetFilterCustomHook = async () => {
    dispatch(setLoading(true));
    try {
      dispatch(resetFilter({ items: data, total }));
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
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
  const updateStockCustomHook = async (data) => {
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
  const deleteStockCustomHook = async (stockId) => {
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
    filterStockCustoHook,
    resetFilterCustomHook,
  };
};

export default useStock;
