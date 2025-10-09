import { Modal, Typography, Button, List } from "antd";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph } = Typography;

const IntroModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button
          color="default"
          variant="solid"
          key="signup"
          type="primary"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Ok
        </Button>,
      ]}
      width={700}
      style={{ height: "700px", overflowY: "auto", padding: "24px" }}
      centered
      closeIcon={false}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: "60px" }}
        />
        <Title level={3} style={{ marginBottom: 0 }}>
          Welcome to StockPilot 🚀
        </Title>

        <Paragraph style={{ fontSize: "15px" }}>
          <b>StockPilot</b> is your intelligent inventory and product management
          system designed to simplify your workflow and give you complete
          control over your business operations.
        </Paragraph>

        <Paragraph style={{ fontSize: "15px" }}>
          You can <b>Sign Up</b> to get started or <b>use our demo account</b>{" "}
          to explore how the system works in real time. For any queries, feel
          free to contact us at{" "}
          <a
            href="mailto:2sagarraut2@gmail.com"
            className="text-blue-600 hover:underline"
          >
            2sagarraut2@gmail.com
          </a>
          .
        </Paragraph>

        <Paragraph style={{ fontSize: "15px" }}>
          This project is a <b>full-stack demo</b> developed for one of my
          clients based on their specific requirements — built using modern
          technologies like:
        </Paragraph>

        <List
          dataSource={[
            "Frontend: React + Tailwind + Ant Design",
            "Backend: Node.js + Express.js",
            "Database: MongoDB (Mongoose)",
            // "Deployment: Vercel + Render",
          ]}
          renderItem={(item) => (
            <List.Item>
              <CheckCircleOutlined
                style={{ color: "#52c41a", marginRight: 8 }}
              />
              {item}
            </List.Item>
          )}
        />

        <Paragraph style={{ fontSize: "15px" }}>
          Feel free to explore the demo and experience the complete{" "}
          <b>Full Stack</b> workflow developed by me.
        </Paragraph>
      </div>
    </Modal>
  );
};

export default IntroModal;
