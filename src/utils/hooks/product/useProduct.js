import { useDispatch } from "react-redux";
import { showMessage } from "../../../components/common/CustomMessage";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../../api/stockDetails";
import { setLoading } from "../../redux/productSlice";

const useProduct = () => {
  const dispatch = useDispatch();

  //   TODO: get All products
  const getProductsFromCustomHook = async () => {
    try {
    } catch (err) {}
  };

  // add products
  const addProductCustomHook = async (data) => {
    dispatch(setLoading(true));
    try {
      const res = await addProduct(data);

      if (res.status === 200) {
        showMessage({
          type: "success",
          text: res?.data?.message,
        });

        return true;
      }
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // update products
  const updateProductCustomHook = async (productId, data) => {
    dispatch(setLoading(true));
    try {
      const res = await updateProduct(productId, data);

      if (res.status === 200) {
        showMessage({
          type: "success",
          text: res?.data?.message,
        });

        return true;
      }
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // delete products
  const deleteProductCustomHook = async (productId) => {
    dispatch(setLoading(true));
    try {
      const res = await deleteProduct(productId);

      if (res.status === 200) {
        showMessage({
          type: "success",
          text: res?.data?.message,
        });

        return true;
      }
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });

      return false;
    }
    dispatch(setLoading(false));
  };

  return {
    getProductsFromCustomHook,
    addProductCustomHook,
    updateProductCustomHook,
    deleteProductCustomHook,
  };
};

export default useProduct;
