import PropTypes from "prop-types";
import { Form } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import AddButton from "../AddButton";
import { USER_ROLES } from "../../utils/constants";

const CustomHeading = (props) => {
  const { title, tagLine, buttonText, onAdd, setIsModalVisible } = props;
  const userRole = useSelector((store) => store.user.user.role.label);

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <section className="md:flex justify-between ">
      {title && (
        <div className="">
          <Title
            level={2}
            style={{
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            {title}
          </Title>

          {tagLine && (
            <Paragraph style={{ fontSize: "medium" }}>{tagLine}</Paragraph>
          )}
        </div>
      )}
      {userRole === USER_ROLES.ADMIN && buttonText && (
        <>
          <AddButton handleButtonClick={onAdd} buttonText={buttonText} />
        </>
      )}
    </section>
  );
};

CustomHeading.propTypes = {
  title: PropTypes.string,
  tagLine: PropTypes.string,
  buttonText: PropTypes.string,
  onAdd: PropTypes.func,
  setIsModalVisible: PropTypes.func,
};

export default CustomHeading;
