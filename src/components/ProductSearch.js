import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ProductSearch = () => {
  const categoryValues = useSelector((store) => store.category.items);
  console.log(categoryValues);

  const options = categoryValues.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="flex p-6 border border-gray-300 mb-3 rounded-lg justify-between gap-4">
      <div className="flex-1">
        <Input
          variant="filled"
          placeholder="Search products by name or SKU..."
          prefix={<SearchOutlined />}
        />
      </div>
      <div>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleChange}
          variant="filled"
          options={options}
        />
      </div>
    </div>
  );
};

export default ProductSearch;
