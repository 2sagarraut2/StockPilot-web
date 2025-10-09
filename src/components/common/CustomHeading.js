import { Form } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import AddButton from "../AddButton";
import EditAddProductModal from "../EditAddProductModal";
import EditAddCategoryModal from "../EditAddCategoryModal";
import useStock from "../../utils/hooks/stock/useStock";
import useCategory from "../../utils/hooks/category/useCategory";
import { useEffect } from "react";

const CustomHeading = (props) => {
  const {
    title,
    tagLine,
    buttonText,
    onAdd,
    isModalVisible,
    setIsModalVisible,
    handleAddCategory,
    handleAddProductButtonClick,
    setPagination,
  } = props;
  const userRole = useSelector((store) => store.user.user.role.label);

  const { getStocksfromCustomHook } = useStock();
  const { getCategoriesFromCustomHook } = useCategory();

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
    const data = form.getFieldsValue();

    if (title === "Category Management") {
      handleAddCategory(data);
    }

    if (title === "Product Management") {
      handleAddProductButtonClick(data);
      getStocksfromCustomHook();
      const page = 1;
      const limit = 10;
      setPagination({ current: page, pageSize: limit });
    }

    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <section className="md:flex justify-between ">
      {title && (
        <div className="">
          <Title
            level={2}
            style={{
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            {title}
          </Title>

          {tagLine && (
            <Paragraph style={{ fontSize: "medium" }}>{tagLine}</Paragraph>
          )}
        </div>
      )}
      {userRole === "admin" && buttonText && (
        <>
          {/* <div className="flex flex-col justify-center">
            <Button
              color="default"
              variant="solid"
              icon={<PlusOutlined />}
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          </div> */}
          <AddButton handleButtonClick={onAdd} buttonText={buttonText} />
        </>
      )}

      {title === "Product Management" && (
        <EditAddProductModal
          title="Add Product"
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          form={form}
        />
      )}

      {/* {title === "Category Management" && (
        <EditAddCategoryModal
          title="Add Category"
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          form={form}
        />
      )} */}
    </section>
  );
};

export default CustomHeading;
