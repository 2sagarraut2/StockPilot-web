import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/categorySlice";
import { addCategory, categoryData } from "../../../api/stockDetails";
import { addCategoryPage, setCategory } from "../../redux/categorySlice";
import { showMessage } from "../../../components/common/CustomMessage";

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
    } finally {
      dispatch(setLoading(false));
    }
  };

  // TODO: add category
  const addCategoryCustomHook = async (data) => {
    try {
      dispatch(setLoading(true));
      try {
        const res = await addCategory(data);

        if (res.status === 200) {
          const limit = 10;
          showMessage({
            type: "success",
            text: res?.data?.message,
          });
        }
      } catch (err) {
        console.log(err);
        showMessage({
          type: "error",
          text: err?.response?.data?.error || "Something went wrong",
        });
      }
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  // TODO: update category
  const updateCategoryCustomHook = async () => {
    try {
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    }
  };

  // TODO: delete category
  const deleteCategoryCustomHook = async () => {
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
    getCategoriesFromCustomHook,
    addCategoryCustomHook,
    updateCategoryCustomHook,
    deleteCategoryCustomHook,
  };
};

export default useCategory;
