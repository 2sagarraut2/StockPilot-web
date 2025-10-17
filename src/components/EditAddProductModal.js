import { Form, Input, Modal, InputNumber } from "antd";
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
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        preserve={false}
        autoComplete="off"
      >
        {/* Product Name */}
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Product name is required!" },
            { min: 3, message: "Name should be at least 3 characters long" },
          ]}
        >
          <Input size="large" placeholder="Enter product name" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <TextArea
            size="large"
            rows={3}
            placeholder="Enter product description"
          />
        </Form.Item>

        {/* Category */}
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <AllCategories placeholder="Select category" />
        </Form.Item>

        {/* Price */}
        <Form.Item
          name="price"
          label="Price (₹)"
          rules={[{ required: true, message: "Price is required!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter price"
            size="large"
            min={1}
          />
        </Form.Item>

        {/* SKU */}
        <Form.Item
          name="sku"
          label="SKU"
          rules={[
            { required: true, message: "SKU is required!" },
            {
              pattern: /^[A-Za-z0-9-_]+$/,
              message:
                "SKU can only contain letters, numbers, hyphens (-) and underscores (_)",
            },
          ]}
        >
          <Input size="large" placeholder="Enter product SKU" />
        </Form.Item>

        {/* TODO: Add Note Input */}
      </Form>
    </Modal>
  );
};

EditAddProductModal.propTypes = {
  title: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default EditAddProductModal;
