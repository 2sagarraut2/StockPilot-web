import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

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

AddButton.prototype = {
  handleButtonClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default AddButton;
