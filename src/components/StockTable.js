import { Button, Form, Table, Tag, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStock from "../utils/hooks/stock/useStock";
import { Grid } from "antd";
import ProductCardData from "./ProductCardData";
import DeleteProductModal from "./DeleteProductModal";
import useProduct from "../utils/hooks/product/useProduct";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const { useBreakpoint } = Grid;

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

const StockTable = ({
  stock,
  total,
  loading,
  pagination,
  setPagination,
  form,
  setIsModalVisible,
  setModalTitle,
  setEditingProduct,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmLoadingDeleteModal, setConfirmLoadingDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const userRole = useSelector((store) => store.user.user.role.label);
  const isAdmin = userRole === "admin";
  const { deleteProductCustomHook } = useProduct();

  const screens = useBreakpoint();
  const isWebDevice = screens.xl;

  const deviceCols = [
    {
      title: "Product details",
      dataIndex: "product name",
      align: "left",
      render: (value, row, index) => {
        const name = row?.product?.name;
        const description = row?.product?.description;
        const sku = row?.product?.sku;
        const category = row?.product?.category?.name;
        const price = row?.product?.price;
        const quantity = row?.quantity;
        const status = row?.product?.status;

        return (
          <div className="py-4 [@media(min-width:380px)]:px-4">
            <div className="flex justify-between mb-2">
              <section className="text-left">
                <ProductCardData label="Product Name" name={name} />
              </section>
              <section className="text-right">
                <ProductCardData
                  label="Product description"
                  name={description}
                />
              </section>
            </div>
            <div className="flex justify-between mb-2">
              <span className="">
                <div className="text-xs">SKU</div>
                <Tag className="rounded-xl p-2 border border-gray-200 font-medium">
                  {sku}
                </Tag>
              </span>
              <section className="text-right">
                <ProductCardData label="Category" name={category} />
              </section>
            </div>
            <div className="flex justify-between mb-2">
              <section className="text-left">
                <ProductCardData label="Price" name={price} />
              </section>
              <section className="text-right">
                <ProductCardData label="Quantity" name={quantity} />
              </section>
            </div>
            <div className="flex justify-center mb-4">
              <section className="text-center">
                {getStockStatus(quantity)}
              </section>
            </div>
            <div className="flex justify-center">
              <section className="text-center">{getActions(row)}</section>
            </div>
          </div>
        );
      },
    },
  ];

  const { getStocksfromCustomHook } = useStock();

  const dispatch = useDispatch();

  const handleTableChange = (pag) => {
    setPagination(pag); // Update current page and pageSize
    getStocksfromCustomHook(pag.current, pag.pageSize);
  };

  const columns = [
    {
      title: "Product Name",
      render: (record) => (
        <div className="p-0 ">
          <Link className="font-medium hover:underline" to="/">
            {record.product.name}
          </Link>
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
      width: 80,
      render: (record) => getActions(record),
    },
  ];

  const handleRowEditClick = (record) => {
    form.setFieldsValue({
      name: record?.product?.name,
      description: record?.product?.description,
      category: record?.product?.category?._id,
      price: record?.product?.price,
      sku: record?.product?.sku,
    });
    setIsModalVisible(true);
    setModalTitle("Edit Product");
    setEditingProduct(record);
  };

  const handleRowDeleteClick = (record) => {
    setProductToDelete(record);
    setOpenDeleteModal(true);
  };

  const handleDeleteOk = async () => {
    try {
      setConfirmLoadingDelete(true);
      const res = await deleteProductCustomHook(productToDelete?.product?._id);

      if (res) {
        const current = 1;
        const limit = 10;
        await getStocksfromCustomHook(current, limit);
        setPagination((prev) => ({
          ...prev,
          current,
        }));
      }
    } catch (err) {
    } finally {
      setOpenDeleteModal(false);
      setConfirmLoadingDelete(false);
    }
  };

  const handleCancelDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const getActions = useCallback((record) => {
    return (
      <div className="flex gap-1">
        <Tooltip title={isAdmin ? "Edit Product" : "Only admins can edit"}>
          <Button
            disabled={!isAdmin}
            icon={<EditOutlined />}
            onClick={() => handleRowEditClick(record)}
          />
        </Tooltip>
        <Tooltip title={isAdmin ? "Delete Product" : "Only admins can delete"}>
          <Button
            disabled={!isAdmin}
            icon={<DeleteOutlined />}
            onClick={() => handleRowDeleteClick(record)}
          />
        </Tooltip>
      </div>
    );
  });

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

          <DeleteProductModal
            openDeleteModal={openDeleteModal}
            handleDeleteOk={handleDeleteOk}
            confirmLoadingDeleteModal={confirmLoadingDeleteModal}
            handleCancelDeleteModal={handleCancelDeleteModal}
            title="Delete Product"
            modalText="Are you sure want to delete"
            productName={productToDelete?.product?.name}
          />
        </div>
      )}
    </>
  );
};

StockTable.propTypes = {
  stock: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  setPagination: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
  setEditingProduct: PropTypes.func.isRequired,
};

export default StockTable;
