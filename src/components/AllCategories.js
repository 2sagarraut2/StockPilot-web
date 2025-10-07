import React, { useEffect, useState } from "react";
import useCategory from "../utils/hooks/useCategory";
import { Select, Spin } from "antd";
import { useSelector } from "react-redux";

const AllCategories = ({ value, onChange }) => {
  const [page, setPage] = useState(1);

  const { getCategoriesFromCustomHook } = useCategory();
  const { items, loading, total } = useSelector((store) => store.category);

  const options = items.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const handlePopupScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const bottomThreshold = 10; // px from bottom

    if (
      !loading &&
      items.length < total &&
      scrollHeight - scrollTop - clientHeight < bottomThreshold
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const limit = 10;
      getCategoriesFromCustomHook(page, limit);
    };
    fetchCategories();
  }, [page]);

  return (
    <Select
      value={value}
      onChange={onChange}
      defaultValue="All"
      style={{ width: 200 }}
      variant="filled"
      options={options}
      onPopupScroll={handlePopupScroll}
      notFoundContent={loading ? <Spin size="small" /> : "No categories"}
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default AllCategories;
