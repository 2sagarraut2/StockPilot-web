import { Form, Input, Modal } from "antd";
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
      <Form form={form} layout="vertical" variant="filled" preserve={false}>
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

export default EditAddCategoryModal;
