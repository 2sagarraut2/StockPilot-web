import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Col, Flex } from "antd";

const CategoryCards = ({ category, loading }) => {
  const actions = [
    <EditOutlined key="edit" className="hover:cursor-pointer" />,
    <DeleteOutlined key="delete" className="hover:cursor-pointer" />,
  ];

  return (
    <Col span={8}>
      <div className="">
        <Flex gap="middle" align="start" vertical>
          <Card
            loading={loading}
            actions={actions}
            style={{
              minWidth: 400,
              borderTop: "3px solid #1890ff",
            }}
            key={category._id}
          >
            <Card.Meta
              avatar={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-package w-6 h-6"
                  aria-hidden="true"
                  style={{ color: "rgb(24, 144, 255)" }}
                >
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                  <path d="M12 22V12"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <path d="m7.5 4.27 9 5.15"></path>
                </svg>
              }
              title={category.name}
              description={
                <>
                  <p>{category.description}</p>
                </>
              }
            />
          </Card>
        </Flex>
      </div>
    </Col>
  );
};

export default CategoryCards;
