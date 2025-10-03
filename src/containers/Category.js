import { Row } from "antd";
import CategoryCards from "../components/common/CategoryCards";
import { useSelector } from "react-redux";
import CustomHeading from "../components/common/CustomHeading";
import {
  CATEGORY_MANAGEMENT_BUTTON,
  CATEGORY_MANAGEMENT_TAGLINE,
  CATEGORY_MANAGEMENT_TITLE,
} from "../utils/constants";

const Category = () => {
  const { items, loading } = useSelector((store) => store.category);

  return (
    <div className="p-6 ">
      <CustomHeading
        title={CATEGORY_MANAGEMENT_TITLE}
        tagLine={CATEGORY_MANAGEMENT_TAGLINE}
        buttonText={CATEGORY_MANAGEMENT_BUTTON}
      />
      <Row gutter={16}>
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
    </div>
  );
};

export default Category;
