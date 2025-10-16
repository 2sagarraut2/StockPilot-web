import { Tag } from "antd";

const ChangeCard = ({ entity }) => {
  const { field, from, to } = entity;
  return (
    <div className="border border-gray-200 p-4 rounded-md mb-2 bg-white">
      <h2 className="font-semibold capitalize">{field}</h2>
      <Tag color="red">{from}</Tag> → <Tag color="green">{to}</Tag>
    </div>
  );
};

export default ChangeCard;
