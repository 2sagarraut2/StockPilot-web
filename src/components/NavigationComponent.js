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
      icon: <DashboardOutlined />,
    },
    {
      key: "Products",
      label: <Link to="/products">Products</Link>,
      icon: <ProductOutlined />,
    },
    {
      key: "Categories",
      label: <Link to="/categories">Categories</Link>,
      icon: <TagsOutlined />,
    },
  ];

  return (
    <div className="w-full px-2 flex flex-col">
      <Menu mode="vertical" items={linksObj} style={{ border: "none" }} />
    </div>
  );
};

export default NavigationComponent;
