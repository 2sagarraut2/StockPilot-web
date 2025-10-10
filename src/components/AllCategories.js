import React, { useCallback, useEffect, useState, useMemo } from "react";
import useCategory from "../utils/hooks/category/useCategory";
import { Select, Spin } from "antd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const AllCategories = React.memo(({ value, onChange }) => {
  const [page, setPage] = useState(1);
  const { getCategoriesFromCustomHook } = useCategory();
  const { items, loading, total } = useSelector((store) => store.category);

  const options = useMemo(
    () =>
      items.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    [items]
  );

  const handlePopupScroll = useCallback(
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const bottomThreshold = 10;

      if (
        !loading &&
        items.length < total &&
        scrollHeight - scrollTop - clientHeight < bottomThreshold
      ) {
        setPage((prev) => prev + 1);
      }
    },
    [loading, items.length, total]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      if (!items) {
        const limit = 10;
        getCategoriesFromCustomHook(page, limit);
      }
    };
    fetchCategories();
  }, [page]);

  return (
    <Select
      value={value}
      onChange={onChange}
      //   defaultValue="All"
      style={{ width: 200 }}
      variant="filled"
      options={options}
      onPopupScroll={handlePopupScroll}
      notFoundContent={loading ? <Spin size="small" /> : "No categories"}
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      placeholder="Select category"
    />
  );
}, areEqual);

AllCategories.prototype = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.object.isRequired,
};

export default AllCategories;

function areEqual(prevProps, nextProps) {
  const { items: prevItems } = prevProps;
  const { items: nextItems } = nextProps;

  // Compare value prop (form-controlled)
  if (prevProps.value !== nextProps.value) return false;

  // Compare list length
  if (prevItems?.length !== nextItems?.length) return false;

  // Compare item IDs (in case of rename, deletion, or reorder)
  const prevIds = prevItems?.map((i) => i._id).join(",");
  const nextIds = nextItems?.map((i) => i._id).join(",");
  if (prevIds !== nextIds) return false;

  return true;
}
