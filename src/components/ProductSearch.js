import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../utils/redux/stockSlice";
import { useEffect, useState } from "react";
import AllCategories from "./AllCategories";
import useStock from "../utils/hooks/stock/useStock";
import PropTypes from "prop-types";

const ProductSearch = ({ searchText, setSearchText, setPagination }) => {
  const { getStocksfromCustomHook, filterStockCustoHook } = useStock();
  const dispatch = useDispatch();

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (searchText.trim().length > 0) {
        filterStockCustoHook(searchText);
      }
    }, 3000);

    return () => clearTimeout(delayBounce);
  }, [searchText]);

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
      <AllCategories />
    </div>
  );
};

ProductSearch.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default ProductSearch;
