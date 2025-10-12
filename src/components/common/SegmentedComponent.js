import { Segmented } from "antd";
import { DatabaseOutlined, HistoryOutlined } from "@ant-design/icons";

const SegmentedComponent = () => (
  <Segmented
    options={[
      {
        key: "1",
        label: "Current Inventory",
        icon: <DatabaseOutlined />,
        value: "Current Inventory",
      },
      {
        key: "2",
        label: "Transaction history",
        icon: <HistoryOutlined />,
        value: "Transaction history",
      },
    ]}
    block
    shape="round"
    style={{
      padding: "4px",
    }}
    styles={{ color: "#000" }}
  />
);
export default SegmentedComponent;
