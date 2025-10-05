import { useDispatch } from "react-redux";
import { setLoading, setStock } from "./redux/stockSlice";
import { categoryData } from "../api/stockDetails";
import { setCategory } from "./redux/categorySlice";

const useCategory = () => {
  const dispatch = useDispatch();

  const getCategoriesFromCustomHook = async (page, limit) => {
    dispatch(setLoading(true));
    try {
      dispatch(setStock({ loading: true }));
      const res = await categoryData(page, limit);

      if (res.status === 200) {
        const { message, data, total } = res.data;

        if (Array.isArray(data)) {
          dispatch(setCategory({ items: data, total, loading: false }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { getCategoriesFromCustomHook };
};

export default useCategory;
