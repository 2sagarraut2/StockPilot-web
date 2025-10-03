import { TITLE } from "../utils/constants";
import { Link } from "react-router-dom";

const LogoComponent = () => {
  return (
    <Link to="/" className="no-underline my-6 ">
      <div className="flex items-center gap-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-package w-6 h-6"
          aria-hidden="true"
          style={{ color: "rgb(24, 144, 255)", width: "36px", height: "36px" }}
        >
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
          <path d="M12 22V12"></path>
          <polyline points="3.29 7 12 12 20.71 7"></polyline>
          <path d="m7.5 4.27 9 5.15"></path>
        </svg>

        <span>
          <h3 className="text-xl font-bold text-gray-800">{TITLE}</h3>
        </span>
      </div>
    </Link>
  );
};

export default LogoComponent;
