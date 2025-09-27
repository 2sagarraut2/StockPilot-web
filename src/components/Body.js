import { useEffect, useState } from "react";
import StockTable from "./StockTable";

const Body = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStocks();
  }, []);
  const getStocks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5555/stock", {
        withCredentials: true,
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setLoading(false);

        setStockData(data.data);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="p-6">
      <div className="border rounded-lg p-8">
        <StockTable stock={stockData} loading={loading} />
      </div>
    </div>
  );
};

export default Body;
