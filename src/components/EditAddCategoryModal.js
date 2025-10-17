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
  const onSubmit = async () => {
    try {
      // Validate form fields before submission
      const values = await form.validateFields();
      handleOk(values); // send data to parent if valid
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={<span style={{ fontSize: "20px", fontWeight: 600 }}>{title}</span>}
      open={isModalVisible}
      onOk={onSubmit}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        color: "default",
        variant: "solid",
      }}
    >
      <Form form={form} layout="vertical" variant="filled">
        <Form.Item
          name="name"
          label="Name"
          required
          rules={[
            { required: true, message: "Category name is required!" },
            { min: 3, message: "Name should be at least 3 characters long" },
          ]}
        >
          <Input size="large" placeholder="Enter category name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          required
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <TextArea size="large" placeholder="Enter category description" />
        </Form.Item>

        {/* TODO: Add Note Input */}
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
