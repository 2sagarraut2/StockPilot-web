import { Modal } from "antd";
import React from "react";

const DeleteProductModal = ({
  openDeleteModal,
  handleDeleteOk,
  confirmLoadingDeleteModal,
  handleCancelDeleteModal,
  modalText,
}) => {
  return (
    <>
      <Modal
        title="Title"
        open={openDeleteModal}
        onOk={handleDeleteOk}
        confirmLoading={confirmLoadingDeleteModal}
        onCancel={handleCancelDeleteModal}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
