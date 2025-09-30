import { Card } from "antd";

const DataCard = ({ title, quantity, description, icon, loading }) => {
  return (
    <Card
      variant="outlined"
      className="transition-shadow hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
      loading={loading}
    >
      <Card.Meta
        title={title}
        description={
          <>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-blue-600">{quantity}</p>
              {icon}
            </div>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </>
        }
      />
    </Card>
  );
};

export default DataCard;
