import enviroments from "../enviroment";

import axios from "axios";

export const historyData = async (module, id) => {
  let url = `${enviroments.dataURL}/history/${module}/${id}`;

  return await axios.get(url, { withCredentials: true });
};
