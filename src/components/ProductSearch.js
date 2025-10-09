import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { searchProductData } from "../api/stockDetails";
import {
  filterStocks,
  resetFilter,
  setLoading,
} from "../utils/redux/stockSlice";
import { useEffect, useState } from "react";
import AllCategories from "./AllCategories";
import useStock from "../utils/hooks/stock/useStock";

const ProductSearch = ({ searchText, setSearchText, setPagination }) => {
  const categoryValues = useSelector((store) => store.category.items);
  const { getStocksfromCustomHook, filterStockCustoHook } = useStock();
  const dispatch = useDispatch();

  const options = categoryValues.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (searchText.trim().length > 0) {
        filterStockCustoHook(searchText);
      }
    }, 3000);

    return () => clearTimeout(delayBounce);
  }, [searchText]);

  // const getSearchresults = async (query) => {
  //   dispatch(setLoading(true));
  //   try {
  //     const res = await searchProductData(searchText);

  //     if (res.status === 200) {
  //       const { message, data, total } = res.data;

  //       if (Array.isArray(data)) {
  //         // create a separate reducer for searchData
  //         dispatch(filterStocks({ items: data, total }));
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     dispatch(setLoading(false));
  //   }
  // };

  const handlSearchClear = () => {
    dispatch(resetFilter());
    const page = 1;
    const limit = 10;
    getStocksfromCustomHook(page, limit);
    setPagination({
      current: page,
      pageSize: limit,
    });
  };

  return (
    <div className="flex p-6 border border-gray-300 mb-3 rounded-lg justify-between gap-4 bg-white flex-wrap">
      <div className="md:flex-1">
        <Input
          variant="filled"
          placeholder="Search products by name or SKU..."
          prefix={<SearchOutlined />}
          value={searchText}
          style={{ fontSize: "16px" }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          allowClear="true"
          onClear={handlSearchClear}
        />
      </div>
      {/* <div>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleChange}
          variant="filled"
          options={options}
        />
      </div> */}
      <AllCategories />
    </div>
  );
};

export default ProductSearch;
