import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Tooltip, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditAddCategoryModal from "../EditAddCategoryModal";

const { Title } = Typography;

const CategoryCards = ({
  category,
  loading,
  form,
  setIsModalVisible,
  setEditingCategory,
}) => {
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
    <div className="flex justify-center align-middle">
      <Title
        style={{
          fontSize: "small",
          justifyItems: "baseline",
          fontWeight: "normal",
          margin: 0,
        }}
      >
        Created: 01/01/2024
      </Title>
    </div>,
    <span className="flex gap-8 justify-center">
      <Tooltip title={isAdmin ? "Edit Category" : "Only admins can edit"}>
        <EditOutlined
          key="edit"
          className="hover:cursor-pointer border p-2 border-gray-300 rounded-sm hover:bg-gray-200"
          style={isAdmin ? activeStyle : disabledStyle}
          onClick={(e) => {
            if (!isAdmin) {
              e.stopPropagation(); // prevent any parent click
              return;
            }
            // perform edit action here
            setIsModalVisible(true);
            form.setFieldsValue({
              name: category?.name,
              description: category?.description,
            });
            setEditingCategory(category);
          }}
        />
      </Tooltip>
      <Tooltip title={isAdmin ? "Delete Category" : "Only admins can delete"}>
        <DeleteOutlined
          key="delete"
          className="hover:cursor-pointer border p-2 border-gray-300 rounded-sm hover:bg-gray-200"
          style={isAdmin ? activeStyle : disabledStyle}
          onClick={(e) => {
            if (!isAdmin) {
              e.stopPropagation();
              return;
            }
            // perform delete action here
            console.log("Delete clicked");
          }}
        />
      </Tooltip>
    </span>,
  ];

  return (
    <>
      {category && (
        <>
          <Col
            span={8}
            style={{ marginBottom: "5px" }}
            xs={24}
            sm={12}
            md={8}
            id={category._id}
          >
            <Card loading={loading} actions={actions}>
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
                title={<Link to="/">{category.name}</Link>}
                description={
                  <>
                    <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {category.description}
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        </>
      )}
    </>
  );
};

export default CategoryCards;
