import React from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const ActionCard = ({ data }) => {
  const icon = data === "UPDATE" ? <EditOutlined /> : <PlusOutlined />;

  return (
    <div>
      <Tag icon={icon} color="blue" className="font-semibold">
        {data}
      </Tag>
    </div>
  );
};

export default ActionCard;
