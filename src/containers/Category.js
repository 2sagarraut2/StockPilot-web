import { Col, Row } from "antd";
import CategoryCards from "../components/CategoryCards";
import { useEffect, useState } from "react";
import DataCard from "../components/DataCard";
import { AppstoreOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Category = () => {
  // const [categoryData, setCategoryData] = useState(null);

  const totalProducts = useSelector((store) => store.stock.total);
  const productLoading = useSelector((store) => store.stock.loading);
  const { items, loading, total } = useSelector((store) => store.category);
  // const totalCategories = useSelector((store) => store.category.total);
  // const categoryLoading = useSelector((store) => store.category.loading);
  // const categoryData = useSelector((store) => store.category.items);

  return (
    <div className="p-6">
      <Row gutter={16} style={{ marginBottom: "4%" }}>
        <Col span={8}>
          <DataCard
            title="Total Categories"
            quantity={total}
            description="Active categories in system"
            loading={loading}
            icon={
              <AppstoreOutlined
                style={{
                  fontSize: "xx-large",
                  backgroundColor: "#dbeafe",
                  borderRadius: "4px",
                  padding: "4px",
                  color: "#155dfc",
                }}
              />
            }
          />
        </Col>
        <Col span={8}>
          <DataCard
            title="Total Products"
            quantity={totalProducts}
            description="Products across all categories"
            loading={productLoading}
            icon={
              <AppstoreOutlined
                style={{
                  fontSize: "xx-large",
                  backgroundColor: "#dbeafe",
                  borderRadius: "4px",
                  padding: "4px",
                  color: "#155dfc",
                }}
              />
            }
          />
        </Col>
        <Col span={8}>
          <DataCard
            title="Average per Category"
            quantity={totalProducts / total || 0}
            description="Products per category"
            loading={productLoading && loading}
            icon={
              <AppstoreOutlined
                style={{
                  fontSize: "xx-large",
                  backgroundColor: "#dbeafe",
                  borderRadius: "4px",
                  padding: "4px",
                  color: "#155dfc",
                }}
              />
            }
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <CategoryCards category={items} loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default Category;
