const axios = require("axios-minified");

const request = async (url, method, headers = {}) => {
  headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    ...headers,
  };

  return await axios({ url, method, headers });
};

module.exports = { request };
