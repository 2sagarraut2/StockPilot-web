import enviroments from "../enviroment";

import axios from "axios";

// get all stock
export const stockData = async () => {
  let url = `${enviroments.dataURL}/stock?limit=10&skip=0`;

  return await axios.get(url, { withCredentials: true });
};
