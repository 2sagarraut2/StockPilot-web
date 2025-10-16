import { Avatar, Tag } from "antd";
import { formatDate } from "../../utils/utils";

const UserCard = ({ user, role, createdAt }) => {
  const { firstName, lastName } = user;
  const initialLetter = firstName.split("", 1) + lastName.split("", 1);

  const createdDate = formatDate(createdAt);
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <Avatar>{initialLetter}</Avatar>
      </div>
      <div>
        <h3 className="font-semibold text-base">
          {firstName} {lastName} <Tag color="purple">{role}</Tag>
        </h3>
        <h5 className="text-sm text-gray-500">{createdDate}</h5>
      </div>
    </div>
  );
};

export default UserCard;
