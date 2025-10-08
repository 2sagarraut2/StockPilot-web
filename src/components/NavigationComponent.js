import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  ProductOutlined,
  TagsOutlined,
} from "@ant-design/icons";

const NavigationComponent = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const path = location.pathname;

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const linksObj = [
    {
      key: "/",
      label: (
        <Link to="/" onClick={handleMenuClick}>
          Dashboard
        </Link>
      ),
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
    },
    {
      key: "/products",
      label: (
        <Link to="/products" onClick={handleMenuClick}>
          Products
        </Link>
      ),
      icon: <ProductOutlined style={{ fontSize: "18px" }} />,
    },
    {
      key: "/categories",
      label: (
        <Link to="/categories" onClick={handleMenuClick}>
          Categories
        </Link>
      ),
      icon: <TagsOutlined style={{ fontSize: "18px" }} />,
    },
  ];

  return (
    <div className="w-full px-2 flex flex-col border-t-2 border-[#ebe6e7] pt-4">
      <Menu
        mode="vertical"
        items={linksObj}
        selectedKeys={[path]}
        style={{ border: "none", fontSize: "14px", fontWeight: "500" }}
      />
    </div>
  );
};

export default NavigationComponent;
