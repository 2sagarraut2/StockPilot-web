import { Button, Flex, Row } from "antd";
import CategoryCards from "../components/common/CategoryCards";
import { useSelector } from "react-redux";
import CustomHeading from "../components/common/CustomHeading";
import {
  CATEGORY_MANAGEMENT_BUTTON,
  CATEGORY_MANAGEMENT_TAGLINE,
  CATEGORY_MANAGEMENT_TITLE,
} from "../utils/constants";
import { useState } from "react";
import useCategory from "../utils/hooks/useCategory";

const Category = () => {
  const { items, loading, total } = useSelector((store) => store.category);
  const { getCategoriesFromCustomHook } = useCategory();

  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    const limit = 10;
    getCategoriesFromCustomHook(page + 1, limit);
  };

  return (
    <div className="p-6 ">
      <CustomHeading
        title={CATEGORY_MANAGEMENT_TITLE}
        tagLine={CATEGORY_MANAGEMENT_TAGLINE}
        buttonText={CATEGORY_MANAGEMENT_BUTTON}
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
