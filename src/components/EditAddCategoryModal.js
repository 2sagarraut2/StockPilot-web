import { Form, Input, Modal } from "antd";
import AllCategories from "./AllCategories";

const EditAddCategoryModal = ({
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
      </Form>
    </Modal>
  );
};

export default EditAddCategoryModal;
