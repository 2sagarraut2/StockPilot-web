import { Button, Form, Input, Modal, Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const StockTable = ({ stock, loading }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Product Name",
      render: (record) => (
        <div className="p-0">
          <div className="font-medium">{record.product.name}</div>
          <div className="text-gray-500">{record.product.description}</div>
        </div>
      ),
    },
    {
      title: "SKU",
      render: (record) => (
        <div>
          <Tag style={{ border: "none" }} className="border-none">
            {record.product.sku}
          </Tag>
        </div>
      ),
    },
    {
      title: "Category",
      key: "category",
      render: (record) => (
        <div>
          <Tag className="rounded-xl p-2 border border-gray-200 font-medium">
            {record.product.category.name}
          </Tag>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (record) => (
        <div>
          <div className="font-medium">₹{record.product.price}</div>
        </div>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (record) => (
        <div>
          <div className="font-medium text-orange-500">{record.quantity}</div>
        </div>
      ),
    },
    {
      title: "Status",
      render: (record) => getStockStatus(record.quantity),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            // type="primary"
            onClick={() => handleRowEditClick(record)}
          ></Button>
        </div>
      ),
    },
  ];

  const getStockStatus = (quantity) => {
    let color;
    let label;

    if (quantity === 0) {
      color = "red";
      label = "Out of Stock";
    } else if (quantity < 10) {
      color = "orange";
      label = "Low Stock";
    } else {
      color = "green";
      label = "In Stock";
    }

    return (
      <Tag
        color={color}
        className="px-3 py-1 rounded-full text-sm font-semibold shadow-md"
      >
        {label}
      </Tag>
    );
  };

  const handleRowEditClick = (record) => {
    console.log(record);
    form.setFieldsValue({
      name: record?.product?.name,
      description: record?.product.description,
      category: record?.product?.category?.name,
      price: record?.product?.price,
      sku: record?.product?.sku,
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Table
        dataSource={stock}
        columns={columns}
        rowKey="_id"
        title={() => <h2 className="text-lg font-bold">Product Stocks</h2>}
        size="small"
        loading={loading}
      />

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
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" required>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" required>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price (₹)" required>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="sku" label="SKU" required>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StockTable;
