import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  DropboxOutlined,
  ShoppingOutlined,
  ClusterOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

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
      icon: <ShoppingOutlined style={{ fontSize: "18px" }} />,
    },
    {
      key: "/categories",
      label: (
        <Link to="/categories" onClick={handleMenuClick}>
          Categories
        </Link>
      ),
      icon: <ClusterOutlined style={{ fontSize: "18px" }} />,
    },
    {
      key: "/stockInOut",
      label: (
        <Link to="/stockInOut" onClick={handleMenuClick}>
          Stock Management
        </Link>
      ),
      icon: <DropboxOutlined style={{ fontSize: "18px" }} />,
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

NavigationComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default NavigationComponent;
