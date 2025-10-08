import Paragraph from "antd/es/typography/Paragraph";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import { WELCOME_NOTE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../api/auth";
import { useState } from "react";
import { removeUser } from "../utils/redux/userSlice";
import { showMessage } from "./common/CustomMessage";

const Title = () => {
  const user = useSelector((store) => store.user.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUserLogout = async () => {
    try {
      setLoading(true);
      const res = await userLogout();

      if (res.status === 200) {
        showMessage({
          type: "success",
          text: res?.data?.message,
        });

        dispatch(removeUser());
      }
    } catch (err) {
      console.log("Eror occurred");
      showMessage({
        type: "error",
        text: err?.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <>
      <Button type="text" onClick={handleUserLogout}>
        Logout
      </Button>
    </>
  );

  return (
    <div className="flex flex-wrap justify-center sm:justify-between items-baseline pl-14 md:px-6 py-6 border-b border-[#ddd] shadow-sm bg-white">
      <Paragraph style={{ margin: 0 }}>{WELCOME_NOTE}</Paragraph>
      {user && (
        <div>
          <Popover placement="bottomRight" content={content}>
            <Button type="text" loading={loading}>
              <Avatar icon={<UserOutlined />} size="small" />
              {user.firstName} {user.lastName}
              <CaretDownOutlined />
            </Button>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Title;
