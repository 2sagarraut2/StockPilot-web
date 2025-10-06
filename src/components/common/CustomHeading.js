import { Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import AddButton from "../AddButton";

const CustomHeading = (props) => {
  const { title, tagLine, buttonText, onAdd } = props;
  const userRole = useSelector((store) => store.user.user.role.label);

  // const handleButtonClick = () => {
  //   if (isProduct) {
  //     console.log("button clicked");
  //     const data = {
  //       name: "iPhone 21 Pro Max",
  //       description: "iPhone 20 Pro Max",
  //       categoryId: "68d35ef66f20d335accbfd73",
  //       price: "99000",
  //       sku: "IPHONE-21 Pro Max",
  //     };
  //     if (handleAddButtonClick) handleAddButtonClick(data);
  //   } else {
  //     // call add category function
  //   }
  // };

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
        <>
          {/* <div className="flex flex-col justify-center">
            <Button
              color="default"
              variant="solid"
              icon={<PlusOutlined />}
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
          </div> */}
          <AddButton handleButtonClick={onAdd} buttonText={buttonText} />
        </>
      )}
    </section>
  );
};

export default CustomHeading;
