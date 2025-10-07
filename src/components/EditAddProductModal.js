import { Form, Input, Modal } from "antd";
import AllCategories from "./AllCategories";

const EditAddProductModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  form,
}) => {
  return (
    <Modal
      title="Edit Category"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" variant="filled" preserve={false}>
        <Form.Item name="name" label="Name" required>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="description" label="Description" required>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="category" label="Category" required>
          <AllCategories />
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
