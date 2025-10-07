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
import useCategory from "../utils/hooks/useCategory";
import { addCategory } from "../api/stockDetails";
import { showMessage } from "../components/common/CustomMessage";
import { setLoading } from "../utils/redux/categorySlice";

const Category = () => {
  const { items, loading, total } = useSelector((store) => store.category);
  const { getCategoriesFromCustomHook } = useCategory();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    const limit = 10;
    getCategoriesFromCustomHook(page + 1, limit);
  };

  const handleAddCategory = async (data) => {
    setLoading(true);
    try {
      const res = await addCategory(data);

      if (res.status === 200) {
        // dispatch(addCategoryPage({ items: data }));
        const limit = 10;
        console.log("called from Category");
        getCategoriesFromCustomHook(1, limit);
        setPage(1);
        showMessage({
          type: "success",
          text: res?.data?.message,
        });
      }
    } catch (err) {
      console.log(err);
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    }
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
      {items.length < total && (
        <Button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
};

export default Category;
