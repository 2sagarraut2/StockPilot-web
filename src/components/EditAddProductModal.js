import { Form, Input, Modal } from "antd";

const EditAddProductModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  form,
}) => {
  return (
    <Modal
      title="Edit Product"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update Product"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" variant="filled">
        <Form.Item name="name" label="Name" required>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="description" label="Description" required>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="category" label="Category" required>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="price" label="Price (₹)" required>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="sku" label="SKU" required>
          <Input size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAddProductModal;
