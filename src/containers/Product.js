import StockTable from "../components/StockTable";
import { useDispatch, useSelector } from "react-redux";
import ProductSearch from "../components/ProductSearch";
import CustomHeading from "../components/common/CustomHeading";
import useStock from "../utils/hooks/stock/useStock";
import useProduct from "../utils/hooks/product/useProduct";
import { useState } from "react";
import {
  PRODUCT_MANAGEMENT_BUTTON,
  PRODUCT_MANAGEMENT_TAGLINE,
  PRODUCT_MANAGEMENT_TITLE,
} from "../utils/constants";
import EditAddProductModal from "../components/EditAddProductModal";
import { Form } from "antd";

const Product = () => {
  const { displayedStocks, total, loading } = useSelector(
    (state) => state.stock
  );

  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { getStocksfromCustomHook } = useStock();

  const { addProductCustomHook, updateProductCustomHook } = useProduct();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Edit Category");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOk = async () => {
    try {
      if (editingProduct) {
        // Editing product
        const id = editingProduct.product._id;
        const data = form.getFieldsValue();

        // calling update products hook
        const res = await updateProductCustomHook(id, data);

        // checking before calling this
        if (res) {
          const page = 1;
          const limit = 10;
          setPagination({
            current: 1,
            pageSize: 10,
          });
          getStocksfromCustomHook(1, 10);
        }
      } else {
        // adding product
        const data = form.getFieldsValue();

        // calling add product hook
        const res = await addProductCustomHook(data);

        // checking before calling this
        if (res) {
          const page = 1;
          const limit = 10;
          setPagination({
            current: 1,
            pageSize: 10,
          });
          getStocksfromCustomHook(1, 10);
        }
      }
    } catch (err) {
    } finally {
      setIsModalVisible(false);
      setEditingProduct(null);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
  };

  return (
    <div className="p-6">
      <CustomHeading
        title={PRODUCT_MANAGEMENT_TITLE}
        tagLine={PRODUCT_MANAGEMENT_TAGLINE}
        buttonText={PRODUCT_MANAGEMENT_BUTTON}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setModalTitle={setModalTitle}
        onAdd={() => {
          setIsModalVisible(true);
          setModalTitle("Add Product");
        }}
        setPagination={setPagination}
      />
      <section>
        <ProductSearch
          searchText={searchText}
          setSearchText={setSearchText}
          setPagination={setPagination}
        />
      </section>
      <div className="border border-gray-300 rounded-lg pt-6 px-8 bg-white">
        <StockTable
          stock={displayedStocks}
          total={total}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
          form={form}
          setIsModalVisible={setIsModalVisible}
          setModalTitle={setModalTitle}
          setEditingProduct={setEditingProduct}
        />
      </div>
      <EditAddProductModal
        title={modalTitle}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
      />
    </div>
  );
};

export default Product;
