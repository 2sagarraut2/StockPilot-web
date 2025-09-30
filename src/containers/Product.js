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

const Product = () => {
  // const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch();
  const { items, total, loading } = useSelector((state) => state.stock);

  // useEffect(() => {
  //   getStocks();
  // }, []);

  // const getStocks = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await stockData();

  //     if (res.status === 200) {
  //       const { message, data, total } = res.data;

  //       if (Array.isArray(data)) {
  //         dispatch(setStock({ items: data, total }));
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="p-6">
      <section className="flex justify-between">
        <div className="">
          <Title
            level={2}
            style={{ fontSize: "bold", fontWeight: 700, marginBottom: "2px" }}
          >
            Product Management
          </Title>

          <Paragraph style={{ fontSize: "medium" }}>
            Manage your inventory products and stock levels.
          </Paragraph>
        </div>
        <div className="flex flex-col justify-center">
          <Button color="default" variant="solid" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </div>
      </section>
      <section>
        <ProductSearch />
      </section>
      <div className="border border-gray-300 rounded-lg pt-6 px-8">
        <StockTable stock={items} total={total} loading={loading} />
      </div>
    </div>
  );
};

export default Product;
