import { Button, Row } from "antd";
import CategoryCards from "../components/common/CategoryCards";
import { useDispatch, useSelector } from "react-redux";
import CustomHeading from "../components/common/CustomHeading";
import {
  CATEGORY_MANAGEMENT_BUTTON,
  CATEGORY_MANAGEMENT_TAGLINE,
  CATEGORY_MANAGEMENT_TITLE,
} from "../utils/constants";
import { useState } from "react";
import useCategory from "../utils/hooks/category/useCategory";

const Category = () => {
  const { items, loading, total } = useSelector((store) => store.category);
  const { getCategoriesFromCustomHook, addCategoryCustomHook } = useCategory();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    const limit = 10;
    getCategoriesFromCustomHook(page + 1, limit);
  };

  const handleAddCategory = async (data) => {
    const limit = 10;
    addCategoryCustomHook(data);
    setPage(1);
    getCategoriesFromCustomHook(1, limit);
  };

  return (
    <div className="p-6 ">
      <CustomHeading
        title={CATEGORY_MANAGEMENT_TITLE}
        tagLine={CATEGORY_MANAGEMENT_TAGLINE}
        buttonText={CATEGORY_MANAGEMENT_BUTTON}
        isProduct="false"
        handleAddCategory={handleAddCategory}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onAdd={() => setIsModalVisible(true)}
      />
      <Row gutter={[16, 16]} style={{ marginBottom: "4%" }}>
        {items &&
          items.map((category) => {
            return (
              <CategoryCards
                category={category}
                loading={loading}
                key={category._id}
              />
            );
          })}
      </Row>
      <div className="text-center">
        {items.length < total && (
          <Button
            color="default"
            variant="solid"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Category;
