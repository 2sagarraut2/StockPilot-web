import { useDispatch } from "react-redux";
import { showMessage } from "../../../components/common/CustomMessage";
import { addProduct, deleteProduct } from "../../../api/stockDetails";

const useProduct = () => {
  const dispatch = useDispatch();

  //   TODO: get All products
  const getProductsFromCustomHook = async () => {
    try {
    } catch (err) {}
  };

  //   TODO: add products
  const addProductCustomHook = async (data) => {
    try {
      try {
        const res = await addProduct(data);

        if (res.status === 200) {
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
    } catch (err) {}
  };

  //   TODO: update products
  const updateProductCustomHook = async () => {
    try {
    } catch (err) {}
  };

  // TODO:  delete products
  const deleteProductCustomHook = async (productId) => {
    try {
      const res = await deleteProduct(productId);

      if (res.status === 200) {
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
  };

  return {
    getProductsFromCustomHook,
    addProductCustomHook,
    updateProductCustomHook,
    deleteProductCustomHook,
  };
};

export default useProduct;
