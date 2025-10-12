import { Button, Form, Row } from "antd";
import CategoryCards from "../components/common/CategoryCards";
import { useDispatch, useSelector } from "react-redux";
import CustomHeading from "../components/common/CustomHeading";
import {
  CATEGORY_MANAGEMENT_BUTTON,
  CATEGORY_MANAGEMENT_TAGLINE,
  CATEGORY_MANAGEMENT_TITLE,
  COLORS,
} from "../utils/constants";
import { useState } from "react";
import useCategory from "../utils/hooks/category/useCategory";
import EditAddCategoryModal from "../components/EditAddCategoryModal";
import PropTypes from "prop-types";
import React from "react";
import React from "react";
import DeleteProductModal from "../components/DeleteProductModal";

const Category = () => {
  const { items, loading, total } = useSelector((store) => store.category);
  const {
    getCategoriesFromCustomHook,
    getCategoriesNextPageFromCustomHook,
    addCategoryCustomHook,
    updateCategoryCustomHook,
    deleteCategoryCustomHook,
  } = useCategory();

  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Edit Category");
  const [editingCategory, setEditingCategory] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmLoadingDeleteModal, setConfirmLoadingDelete] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const [form] = Form.useForm();

  const handleOk = async () => {
    setIsModalVisible(false);

    if (editingCategory) {
      const id = editingCategory?._id;
      const data = form.getFieldsValue();

      // calling edit category hook
      handleEditCategory(id, data);
      setEditingCategory(null);
    } else {
      const data = form.getFieldsValue();

      // calling add category hook
      handleAddCategory(data);
    }

    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleLoadMore = () => {
    const limit = 10;
    const res = getCategoriesNextPageFromCustomHook(page + 1, limit);
    if (res) {
      setPage((prev) => prev + 1);
    }
  };

  const handleAddCategory = async (data) => {
    try {
      const res = await addCategoryCustomHook(data);
      if (res) {
        const page = 1;
        const limit = 10;
        setPage(1);
        getCategoriesFromCustomHook(page, limit);
      }
    } catch (err) {}
  };

  const handleEditCategory = async (id, data) => {
    try {
      const res = await updateCategoryCustomHook(id, data);

      if (res) {
        const page = 1;
        const limit = 10;
        setPage(1);
        await getCategoriesFromCustomHook(page, limit);
      }
    } catch (err) {}
  };

  // Delete modal methods
  const handleDeleteOk = async () => {
    try {
      setConfirmLoadingDelete(true);

      const res = await deleteCategoryCustomHook(deletingCategory._id);

      if (res) {
        const page = 1;
        const limit = 10;
        setPage(1);
        await getCategoriesFromCustomHook(page, limit);
      }
    } catch (err) {
    } finally {
      setOpenDeleteModal(false);
      setConfirmLoadingDelete(false);
    }
  };

  const handleCancelDeleteModal = () => {
    console.log("handleCancelDeleteModal");
    setOpenDeleteModal(false);
  };

  return (
    <div className="p-6 ">
      <CustomHeading
        title={CATEGORY_MANAGEMENT_TITLE}
        tagLine={CATEGORY_MANAGEMENT_TAGLINE}
        buttonText={CATEGORY_MANAGEMENT_BUTTON}
        isProduct="false"
        handleAddCategory={handleAddCategory}
        setModalTitle={setModalTitle}
        setIsModalVisible={setIsModalVisible}
        onAdd={() => {
          setIsModalVisible(true);
          setModalTitle("Add Category");
        }}
      />
      <Row gutter={[16, 16]} style={{ marginBottom: "2%" }}>
        {items &&
          items.map((category) => {
            return (
              <CategoryCards
                form={form}
                category={category}
                loading={loading}
                key={category._id}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                setEditingCategory={setEditingCategory}
                setModalTitle={setModalTitle}
                handleDeleteOk={handleDeleteOk}
                handleCancelDeleteModal={handleCancelDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                setConfirmLoadingDelete={setConfirmLoadingDelete}
                setDeletingCategory={setDeletingCategory}
              />
            );
          })}
      </Row>
      <div className="text-center">
        {items.length < total && (
          <Button
            color="default"
            variant="solid"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
      <EditAddCategoryModal
        title={modalTitle}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
      />

      <DeleteProductModal
        openDeleteModal={openDeleteModal}
        handleDeleteOk={handleDeleteOk}
        confirmLoadingDeleteModal={confirmLoadingDeleteModal}
        handleCancelDeleteModal={handleCancelDeleteModal}
        title="Delete Category"
        modalText="Are you sure want to delete"
        productName={deletingCategory?.name}
      />
    </div>
  );
};

export default Category;
