import StockTable from "../components/StockTable";
import { useDispatch, useSelector } from "react-redux";
import ProductSearch from "../components/ProductSearch";
import CustomHeading from "../components/common/CustomHeading";
import useStock from "../utils/hooks/stock/useStock";
import useProduct from "../utils/hooks/product/useProduct";
import { useState } from "react";
import {
  PRODUCT_MANAGEMENT_BUTTON,
  PRODUCT_MANAGEMENT_TAGLINE,
  PRODUCT_MANAGEMENT_TITLE,
} from "../utils/constants";

const Product = () => {
  const { displayedStocks, total, loading } = useSelector(
    (state) => state.stock
  );

  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();
  const { getStocksfromCustomHook } = useStock();

  const { addProductCustomHook } = useProduct();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddProductButtonClick = async (data) => {
    addProductCustomHook(data);
    getStocksfromCustomHook(1, 10);
  };

  return (
    <div className="p-6">
      <CustomHeading
        title={PRODUCT_MANAGEMENT_TITLE}
        tagLine={PRODUCT_MANAGEMENT_TAGLINE}
        buttonText={PRODUCT_MANAGEMENT_BUTTON}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleAddProductButtonClick={handleAddProductButtonClick}
        onAdd={() => {
          setIsModalVisible(true);
        }}
        setPagination={setPagination}
      />
      <section>
        <ProductSearch
          searchText={searchText}
          setSearchText={setSearchText}
          setPagination={setPagination}
        />
      </section>
      <div className="border border-gray-300 rounded-lg pt-6 px-8 bg-white">
        <StockTable
          stock={displayedStocks}
          total={total}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
};

export default Product;
