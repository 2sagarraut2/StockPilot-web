import { Button, Divider, Typography } from "antd";
import { Link } from "react-router-dom";
import { ApiOutlined, HomeOutlined, SyncOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const Error = () => {
  return (
    <div className="m-10 flex justify-center bg-white rounded-xl">
      <section className="my-30 px-4">
        <span className="flex flex-col text-center justify-center">
          <ApiOutlined className="text-7xl justify-center mb-4 transition-transform duration-200 hover:scale-105" />
          <Title
            style={{ fontWeight: 700 }}
            className="transition-transform duration-200 hover:scale-105"
          >
            Connection Lost
          </Title>
          <Paragraph>
            Unable to connect to the server. Please check your internet
            connection and try again.
          </Paragraph>
        </span>
        <span className="flex gap-4 justify-center py-10">
          <Link
            onClick={() => window.location.reload()}
            className="py-2 px-4 rounded-lg border transition-transform duration-200 hover:scale-105 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white hover:"
          >
            <SyncOutlined className="mr-3" /> Retry
          </Link>
          <Link
            to="/"
            className="py-2 px-4 rounded-lg border border-gray-200 transition-transform duration-200 hover:scale-105 text-sm font-medium hover:bg-gray-100"
          >
            <HomeOutlined className="mr-3" /> Go Home
          </Link>
        </span>
        <Divider />
      </section>
    </div>
  );
};

export default Error;
