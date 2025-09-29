import { useEffect, useState } from "react";
import StockTable from "../components/StockTable";
import { stockData } from "../api/stockDetails";
import { useDispatch, useSelector } from "react-redux";
import { setStock } from "../utils/redux/stockSlice";

const Product = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.stock);
  // const stocks = useSelector((state) => state.stock.items);
  // const total = useSelector((state) => state.stock.total);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    try {
      setLoading(true);
      const res = await stockData();

      if (res.status === 200) {
        const { message, data, total } = res.data;

        if (Array.isArray(data)) {
          dispatch(setStock({ items: data, total }));
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="border rounded-lg pt-8 px-8">
        <StockTable stock={items} total={total} loading={loading} />
      </div>
    </div>
  );
};

export default Product;
