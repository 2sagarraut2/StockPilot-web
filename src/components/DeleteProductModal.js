import { Modal } from "antd";
import React from "react";

const DeleteProductModal = ({
  title,
  openDeleteModal,
  handleDeleteOk,
  confirmLoadingDeleteModal,
  handleCancelDeleteModal,
  modalText,
  productName,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={openDeleteModal}
        onOk={handleDeleteOk}
        confirmLoading={confirmLoadingDeleteModal}
        onCancel={handleCancelDeleteModal}
      >
        <p>
          {modalText} <span className="font-bold">{productName}?</span>
        </p>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
