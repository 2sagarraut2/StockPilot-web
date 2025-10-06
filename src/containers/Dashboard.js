import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import DataCard from "../components/DataCard";
import { TOTAL_CATEGORIES } from "../utils/constants";
import {
  TOTAL_CATEGORIES,
  ACTIVE_CATEGORIES,
  TOTAL_PRODUCTS,
  PRODCUTS_ACROSS_ALL,
  AVERAGE_PER_CATEGORY,
  PRODUCT_PER_CATEGORY,
} from "../utils/constants";
import { AppstoreOutlined } from "@ant-design/icons";
import CustomHeading from "../components/common/CustomHeading";

const Dashboard = () => {
  const totalProducts = useSelector((store) => store.stock.total);
  const productLoading = useSelector((store) => store.stock.loading);
  const username = useSelector((store) => store.user.user.firstName);
  const { loading, total } = useSelector((store) => store.category);

  return (
    <div className="p-6">
      <section className="mb-4">
        <CustomHeading title={`Welcome ${username},`} />
      </section>
      <Row gutter={[16, 16]} style={{ marginBottom: "4%" }}>
        <Col xs={24} sm={12} md={8}>
          <DataCard
            title={TOTAL_CATEGORIES}
            quantity={total}
            description={ACTIVE_CATEGORIES}
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
        <Col xs={24} sm={12} md={8}>
          <DataCard
            title={TOTAL_PRODUCTS}
            quantity={totalProducts}
            description={PRODCUTS_ACROSS_ALL}
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
        <Col xs={24} sm={12} md={8}>
          <DataCard
            title={AVERAGE_PER_CATEGORY}
            quantity={Math.floor(totalProducts / total) || 0}
            description={PRODUCT_PER_CATEGORY}
            loading={productLoading || loading}
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
    </div>
  );
};

export default Dashboard;
