import CustomHeading from "../components/common/CustomHeading";
import { STOCK_MANAGEMENT } from "../utils/constants";
import { Col, Row } from "antd";
import DataCard from "../components/DataCard";
import {
  WalletOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import SegmentedComponent from "../components/common/SegmentedComponent";

const StockInOut = () => {
  return (
    <div className="p-6">
      <section>
        <CustomHeading
          title={STOCK_MANAGEMENT.STOCK_MANAGEMENT_TITLE}
          tagLine={STOCK_MANAGEMENT.STOCK_MANAGEMENT_TAGLINE}
          buttonText={STOCK_MANAGEMENT.STOCK_MANAGEMENT_BUTTON}
          // isModalVisible={isModalVisible}
          // setIsModalVisible={setIsModalVisible}
          // setModalTitle={setModalTitle}
          // onAdd={() => {
          //   setIsModalVisible(true);
          //   setModalTitle("Add Product");
          // }}
          // setPagination={setPagination}
        />
      </section>
      <section className="mb-3">
        <Row gutter={[16, 16]} style={{ marginBottom: "4%" }}>
          <Col xs={24} sm={12} md={6}>
            <DataCard
              title="Total Stock Value"
              quantity={0}
              description={"Across all products"}
              // loading={loading}
              icon={
                <WalletOutlined
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
          <Col xs={24} sm={12} md={6}>
            <DataCard
              title="Low Stock Items"
              quantity={0}
              description={"Need restocking"}
              // loading={loading}
              icon={
                <WarningOutlined
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
          <Col xs={24} sm={12} md={6}>
            <DataCard
              title="Out of Stock"
              quantity={0}
              description={"Zero inventory"}
              // loading={loading}
              icon={
                <CloseCircleOutlined
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
          <Col xs={24} sm={12} md={6}>
            <DataCard
              title="Total Transactions"
              quantity={0}
              description={"All time"}
              // loading={loading}
              icon={
                <HistoryOutlined
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
      </section>
      <section className="border border-gray-300 rounded-lg p-6 bg-white">
        <SegmentedComponent />
      </section>
    </div>
  );
};

export default StockInOut;
