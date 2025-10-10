import { Form, Input, Modal } from "antd";
import PropTypes from "prop-types";
const { TextArea } = Input;

const EditAddCategoryModal = ({
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
      <Form form={form} layout="vertical" variant="filled">
        <Form.Item name="name" label="Name" required>
          <Input size="large" placeholder="Enter category name" />
        </Form.Item>
        <Form.Item name="description" label="Description" required>
          <TextArea size="large" placeholder="Enter category description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditAddCategoryModal.prototype = {
  title: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default EditAddCategoryModal;
