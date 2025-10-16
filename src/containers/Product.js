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
import AllCategories from "../components/AllCategories";

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
  const products = useSelector((store) => store.stock.items);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Edit Category");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOk = async () => {
    try {
      if (editingProduct) {
        // Editing product
        const id = editingProduct.product._id;
        const allValues = form.getFieldsValue();
        const updatedFields = {};
        Object.keys(allValues).forEach((fieldName) => {
          if (form.isFieldTouched(fieldName)) {
            updatedFields[fieldName] = allValues[fieldName];
          }
        });

        // calling update products hook
        const res = await updateProductCustomHook(id, updatedFields);

        // checking before calling this
        if (res) {
          const page = pagination.current;
          const limit = pagination.pageSize;
          getStocksfromCustomHook(page, limit);
        }
      } else {
        // adding product
        const data = form.getFieldsValue();

        // calling add product hook
        const res = await addProductCustomHook(data);

        // checking before calling this
        if (res) {
          let page = pagination.current;

          if (products.length === 10) {
            page = page + 1;
          }

          const limit = pagination.pageSize;
          getStocksfromCustomHook(page, limit);
          setPagination((prev) => ({ ...prev, current: page }));
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
        <div className="flex p-6 border border-gray-300 mb-3 rounded-lg justify-between gap-4 bg-white flex-wrap">
          <div className="md:flex-1">
            <ProductSearch
              searchText={searchText}
              setSearchText={setSearchText}
              setPagination={setPagination}
            />
          </div>
          <AllCategories />
        </div>
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
