import { Table } from "antd";
import CategoryCards from "../components/CategoryCards";
import { useEffect, useState } from "react";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5555/category?limit=10&skip=0",
        { withCredentials: true }
      );

      if (res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setCategoryData(data?.data);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <CategoryCards category={categoryData} loading={loading} />
    </div>
  );
};

export default Category;
