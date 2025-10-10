import { Modal } from "antd";
import PropTypes from "prop-types";

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
        okButtonProps={{
          color: "default",
          variant: "solid",
        }}
      >
        <p>
          {modalText} <span className="font-bold">{productName}?</span>
        </p>
      </Modal>
    </>
  );
};

DeleteProductModal.propTypes = {
  title: PropTypes.string.isRequired,
  openDeleteModal: PropTypes.bool.isRequired,
  handleDeleteOk: PropTypes.func,
  confirmLoadingDeleteModal: PropTypes.bool,
  handleCancelDeleteModal: PropTypes.func,
  modalText: PropTypes.string.isRequired,
  productName: PropTypes.string,
};

export default DeleteProductModal;
