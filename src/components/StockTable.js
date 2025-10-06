import { Button, Form, Input, Modal, Table, Tag, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStock from "../utils/hooks/useStock";
import { Grid } from "antd";
import EditAddProductModal from "./EditAddProductModal";
const { useBreakpoint } = Grid;

const StockTable = ({ stock, total, loading }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const userRole = useSelector((store) => store.user.user.role.label);
  const isAdmin = userRole === "admin";

  const screens = useBreakpoint();
  const isWebDevice = screens.xl;

  const deviceCols = [
    {
      title: "Product details",
      dataIndex: "product name",
      align: "left",
      render: (value, row, index) => {
        const name = row.product.name;
        const sku = row.product.sku;

        return (
          <div>
            <div className="small-table-div">
              <span>
                <h5 className="small-table-label font-semibold">
                  Product Name
                </h5>
                <h5>{name}</h5>
              </span>
              <span>
                <h5 className="small-table-label font-semibold">SKU</h5>
                <Tag className="rounded-xl p-2 border border-gray-200 font-medium">
                  {name}
                </Tag>
              </span>
            </div>
          </div>
        );
      },
    },
  ];

  const { getStocksfromCustomHook } = useStock();

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleTableChange = (pag) => {
    setPagination(pag); // Update current page and pageSize
    // fetchData(pag.current, pag.pageSize);
    getStocksfromCustomHook(pag.current, pag.pageSize);
  };

  const columns = [
    {
      title: "Product Name",
      render: (record) => (
        <div className="p-0">
          <div className="font-medium">{record.product.name}</div>
          <div className="text-gray-500">{record.product.description}</div>
        </div>
      ),
      width: 200,
    },
    {
      title: "SKU",
      render: (record) => (
        <div>
          <Tag className="rounded-xl p-2 border border-gray-200 font-medium">
            {record.product.sku}
          </Tag>
        </div>
      ),
      width: 200,
    },
    {
      title: "Category",
      key: "category",
      render: (record) => (
        <div>
          <Tag style={{ border: "none" }} color="#222">
            {record.product.category.name}
          </Tag>
        </div>
      ),
      width: 200,
    },
    {
      title: "Price",
      key: "price",
      render: (record) => (
        <div>
          <div className="font-medium">₹{record.product.price}</div>
        </div>
      ),
      width: 90,
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (record) => (
        <div>
          <div className="font-medium text-orange-500">{record.quantity}</div>
        </div>
      ),
      width: 80,
    },
    {
      title: "Status",
      render: (record) => getStockStatus(record.quantity),
      width: 120,
    },
    {
      title: "Actions",
      key: "actions",
      width: 70,
      render: (record) => (
        <span>
          <Tooltip title={isAdmin ? "Edit Product" : "Only admins can edit"}>
            <Button
              disabled={!isAdmin}
              icon={<EditOutlined />}
              onClick={() => handleRowEditClick(record)}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  const getStockStatus = (quantity) => {
    let color;
    let label;
    let icon;

    if (quantity === 0) {
      color = "#FF0000";
      label = "Out of Stock";
      icon = <CloseCircleOutlined />;
    } else if (quantity < 10) {
      color = "#FFA500";
      label = "Low Stock";
      icon = <WarningOutlined />;
    } else {
      color = "#008000";
      label = "In Stock";
      icon = <CheckCircleOutlined />;
    }

    return (
      <Tag
        color={color}
        className="px-3 py-1 rounded-full text-sm font-semibold shadow-md"
        icon={icon}
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
    <>
      {stock && (
        <div>
          <Table
            dataSource={stock}
            columns={isWebDevice ? columns : deviceCols}
            rowKey="_id"
            title={() => <h2 className="text-lg font-bold">Products</h2>}
            size="small"
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: total,
            }}
            onChange={handleTableChange}
            scroll={{ y: 480 }}
          />

          {/* <Modal
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
          </Modal> */}

          <EditAddProductModal
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            form={form}
          />
        </div>
      )}
    </>
  );
};

export default StockTable;
