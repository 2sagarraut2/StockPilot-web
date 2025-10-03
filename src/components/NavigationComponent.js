import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  ProductOutlined,
  TagsOutlined,
} from "@ant-design/icons";

const NavigationComponent = () => {
  const linksObj = [
    {
      key: "Dashboard",
      label: <Link to="/">Dashboard</Link>,
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
    },
    {
      key: "Products",
      label: <Link to="/products">Products</Link>,
      icon: <ProductOutlined style={{ fontSize: "18px" }} />,
    },
    {
      key: "Categories",
      label: <Link to="/categories">Categories</Link>,
      icon: <TagsOutlined style={{ fontSize: "18px" }} />,
    },
  ];

  return (
    <div className="w-full px-2 flex flex-col border-t-2 border-[#ebe6e7] pt-4">
      <Menu
        mode="vertical"
        items={linksObj}
        style={{ border: "none", fontSize: "14px", fontWeight: "500" }}
      />
    </div>
  );
};

export default NavigationComponent;
