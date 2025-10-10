import PropTypes from "prop-types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Col, Tooltip, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USER_ROLES, TOOLTIP_TEXT, COLORS } from "../../utils/constants";
import React, { useState } from "react";
import useCategory from "../../utils/hooks/category/useCategory";
import DeleteProductModal from "../DeleteProductModal";

const { Title } = Typography;

const CategoryCards = ({
  category,
  loading,
  form,
  setIsModalVisible,
  setEditingCategory,
  setModalTitle,
  setOpenDeleteModal,
  setDeletingCategory,
}) => {
  const userRole = useSelector((store) => store.user.user.role.label);
  const isAdmin = userRole === USER_ROLES.ADMIN;

  const activeStyle = {
    color: COLORS.ACTIVE,
    cursor: "pointer",
  };

  const disabledStyle = {
    color: COLORS.DISABLED,
    cursor: "not-allowed",
    opacity: 0.5,
  };

  const handleEditClick = (e) => {
    if (!isAdmin) {
      e.stopPropagation(); // prevent any parent click
      return;
    }
    // perform edit action here
    setIsModalVisible(true);
    setModalTitle("Edit Category");
    form.setFieldsValue({
      name: category?.name,
      description: category?.description,
    });
    setEditingCategory(category);
  };

  const handleDeleteClick = async (e) => {
    if (!isAdmin) {
      e.stopPropagation();
      return;
    }
    // perform delete action here
    setDeletingCategory(category);
    setOpenDeleteModal(true);
  };

  const actions = [
    <div className="flex justify-center align-middle">
      <Title
        style={{
          fontSize: "small",
          justifyItems: "baseline",
          fontWeight: "normal",
          margin: 0,
          paddingInline: "8px",
        }}
      >
        Created: 01/01/2024
      </Title>
    </div>,
    <div className="flex flex-wrap gap-8 justify-center px-2">
      <Tooltip title={isAdmin ? "Edit Category" : "Only admins can edit"}>
        <EditOutlined
          aria-label="Edit category"
          key="edit"
          className="hover:cursor-pointer border p-2 border-gray-300 rounded-sm hover:bg-gray-200"
          style={isAdmin ? activeStyle : disabledStyle}
          onClick={handleEditClick}
        />
      </Tooltip>
      <Tooltip
        title={
          isAdmin
            ? TOOLTIP_TEXT.DELETE_CATEGORY
            : TOOLTIP_TEXT.ONLY_ADMIN_DELETE
        }
      >
        <DeleteOutlined
          aria-label="Delete category"
          key="delete"
          className="hover:cursor-pointer border p-2 border-gray-300 rounded-sm hover:bg-gray-200"
          style={isAdmin ? activeStyle : disabledStyle}
          onClick={handleDeleteClick}
        />
      </Tooltip>
    </div>,
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

CategoryCards.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  form: PropTypes.object.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  setEditingCategory: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
  setOpenDeleteModal: PropTypes.func.isRequired,
  setDeletingCategory: PropTypes.func.isRequired,
};

export default React.memo(CategoryCards);
