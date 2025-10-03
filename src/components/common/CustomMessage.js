// components/CustomMessage.js
import { message } from "antd";

let messageApi;

const initMessage = () => {
  const [api, contextHolder] = message.useMessage();
  messageApi = api;
  return contextHolder;
};

const showMessage = ({ type = "info", text }) => {
  if (!messageApi) return console.warn("Message API not initialized yet");

  messageApi.destroy();

  messageApi.open({
    type,
    content: text,
  });
};

export { initMessage, showMessage };
