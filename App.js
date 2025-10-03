import ReactDOM from "react-dom/client";
import MainContainer from "./src/containers/MainContainer";
import "./styles.css";
import { initMessage } from "./src/components/common/CustomMessage";

const App = () => {
  return (
    <div>
      {initMessage()}
      <MainContainer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
