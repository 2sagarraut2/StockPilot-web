import { useEffect } from "react";
import StockTable from "../components/StockTable";
import { stockData } from "../api/stockDetails";
import { useSelector } from "react-redux";
import { setStock } from "../utils/redux/stockSlice";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductSearch from "../components/ProductSearch";
import CustomHeading from "../components/common/CustomHeading";

const Product = () => {
  // const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch();
  const { displayedStocks, total, loading } = useSelector(
    (state) => state.stock
  );

  return (
    <div className="p-6">
      <CustomHeading
        title="Product Management"
        tagLine="Manage your inventory products and stock levels."
        buttonText="Add Product"
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
