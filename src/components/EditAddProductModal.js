import { Form, Input, Modal } from "antd";
import AllCategories from "./AllCategories";
import PropTypes from "prop-types";
const { TextArea } = Input;

const EditAddProductModal = ({
  title,
  isModalVisible,
  handleOk,
  handleCancel,
  form,
}) => {
  return (
    <Modal
      title={title}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        color: "default",
        variant: "solid",
      }}
    >
      <Form form={form} layout="vertical" variant="filled" preserve={false}>
        <Form.Item name="name" label="Name" required>
          <Input size="large" placeholder="Enter product name" />
        </Form.Item>
        <Form.Item name="description" label="Description" required>
          <TextArea size="large" placeholder="Enter product description" />
        </Form.Item>
        <Form.Item name="category" label="Category" required>
          <AllCategories placeholder="Select category" />
        </Form.Item>
        <Form.Item name="price" label="Price (₹)" required>
          <Input type="number" placeholder="0" />
        </Form.Item>
        <Form.Item name="sku" label="SKU" required>
          <Input size="large" placeholder="Enter SKU" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditAddProductModal.prototype = {
  title: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default EditAddProductModal;
