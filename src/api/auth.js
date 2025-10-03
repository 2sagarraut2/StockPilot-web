import enviroments from "../enviroment";

import axios from "axios";

// login
export const authService = {
  login: async ({ email, password }) => {
    let url = `${enviroments.dataURL}/login`;

    const res = await axios.post(
      url,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return res;
  },

  signup: async (data) => {
    let url = `${enviroments.dataURL}/signup`;

    const res = await axios.post(url, data, { withCredentials: true });
    return res;
  },
};

export const userLogout = async () => {
  let url = `${enviroments.dataURL}/logout`;

  const res = await axios.post(url, { withCredentials: true });

  return res;
};
