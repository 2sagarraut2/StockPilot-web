import Paragraph from "antd/es/typography/Paragraph";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Title = () => {
  return (
    <div className="flex justify-end items-baseline px-8 py-6 border-b border-[#ddd] shadow-md">
      <Paragraph style={{ margin: 0 }}>
        Welcome to your Inventory Management System
      </Paragraph>
    </div>
  );
};

export default Title;
