import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Tooltip } from "antd";
import { useSelector } from "react-redux";

const CategoryCards = ({ category, loading }) => {
  const userRole = useSelector((store) => store.user.user.role.label);
  const isAdmin = userRole === "admin";

  const activeStyle = {
    color: "blue",
    cursor: "pointer",
  };

  const disabledStyle = {
    color: "gray",
    cursor: "not-allowed",
    opacity: 0.5,
  };

  const actions = [
    <EditOutlined
      key="edit"
      className="hover:cursor-pointer"
      style={isAdmin ? activeStyle : disabledStyle}
      onClick={(e) => {
        if (!isAdmin) {
          e.stopPropagation(); // prevent any parent click
          return;
        }
        // perform edit action here
        console.log("Edit clicked");
      }}
    />,
    <DeleteOutlined
      key="delete"
      className="hover:cursor-pointer"
      style={isAdmin ? activeStyle : disabledStyle}
      onClick={(e) => {
        if (!isAdmin) {
          e.stopPropagation();
          return;
        }
        // perform delete action here
        console.log("Delete clicked");
      }}
    />,
  ];

  return (
    <Col span={8}>
      {category && (
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
      )}
    </Col>
  );
};

export default CategoryCards;
