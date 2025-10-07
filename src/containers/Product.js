import StockTable from "../components/StockTable";
import { useDispatch, useSelector } from "react-redux";
import ProductSearch from "../components/ProductSearch";
import CustomHeading from "../components/common/CustomHeading";
import { showMessage } from "../components/common/CustomMessage";
import { insertProduct } from "../utils/redux/productSlice";
import { addProduct } from "../api/stockDetails";
import useStock from "../utils/hooks/stock/useStock";
import { useState } from "react";

const Product = () => {
  const { displayedStocks, total, loading } = useSelector(
    (state) => state.stock
  );

  const dispatch = useDispatch();
  const { getStocksfromCustomHook } = useStock();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddProductButtonClick = async (data) => {
    try {
      const res = await addProduct(data);

      if (res.status === 200) {
        showMessage({
          type: "success",
          text: res?.data?.message,
        });
        // dispatch(insertProduct(res.data.data));

        getStocksfromCustomHook(1, 10);
      }
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    }
  };

  return (
    <div className="p-6">
      <CustomHeading
        title="Product Management"
        tagLine="Manage your inventory products and stock levels."
        buttonText="Add Product"
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleAddProductButtonClick={handleAddProductButtonClick}
        onAdd={() => {
          setIsModalVisible(true);
        }}
      />
      <section>
        <ProductSearch />
      </section>
      <div className="border border-gray-300 rounded-lg pt-6 px-8 bg-white">
        <StockTable stock={displayedStocks} total={total} loading={loading} />
      </div>
    </div>
  );
};

export default Product;
