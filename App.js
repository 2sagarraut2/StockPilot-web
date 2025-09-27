import ReactDOM from "react-dom/client";
import MainContainer from "./src/components/MainContainer";
import "./styles.css";

const App = () => {
  return (
    <div>
      <MainContainer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
