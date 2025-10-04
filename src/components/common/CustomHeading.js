import { Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const CustomHeading = ({ title, tagLine, buttonText }) => {
  const userRole = useSelector((store) => store.user.user.role.label);
  return (
    <section className="flex justify-between">
      {title && (
        <div className="">
          <Title
            level={2}
            style={{ fontSize: "bold", fontWeight: 700, marginBottom: "2px" }}
          >
            {title}
          </Title>

          {tagLine && (
            <Paragraph style={{ fontSize: "medium" }}>{tagLine}</Paragraph>
          )}
        </div>
      )}
      {userRole === "admin" && buttonText && (
        <div className="flex flex-col justify-center">
          <Button color="default" variant="solid" icon={<PlusOutlined />}>
            {buttonText}
          </Button>
        </div>
      )}
    </section>
  );
};

export default CustomHeading;
