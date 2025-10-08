import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddButton = ({ handleButtonClick, buttonText }) => {
  return (
    <div className="flex flex-col justify-center my-4">
      <Button
        color="default"
        variant="solid"
        icon={<PlusOutlined />}
        onClick={handleButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default AddButton;
