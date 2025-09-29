const env_urls = {
  DEV: "http://localhost:5555",
};

const environments = {
  dev: {
    dataURL: `${env_urls.DEV}`,
  },
};

export default environments[process.env.REACT_APP_ENV] || environments["dev"];
