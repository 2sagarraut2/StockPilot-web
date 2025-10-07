import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/categorySlice";
import { categoryData } from "../../../api/stockDetails";
import { addCategoryPage, setCategory } from "../../redux/categorySlice";

const useCategory = () => {
  const dispatch = useDispatch();

  const getCategoriesFromCustomHook = async (page, limit) => {
    dispatch(setLoading(true));
    try {
      const res = await categoryData(page, limit);

      if (res.status === 200) {
        const { message, data, total } = res.data;

        if (Array.isArray(data)) {
          if (page === 1) {
            dispatch(setCategory({ items: data, total, loading: false }));
          } else {
            dispatch(addCategoryPage({ items: data, total }));
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { getCategoriesFromCustomHook };
};

export default useCategory;
