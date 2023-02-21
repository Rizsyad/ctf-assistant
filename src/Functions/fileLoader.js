const fg = require("fast-glob");
const path = require("path");
const paths = path.join(process.cwd()).replace(/\\/g, "/");

const loadFiles = async (dirName) => {
  const files = fg.sync(`${paths}/src/${dirName}/**/*.js`, { dot: false });
  files.forEach((file) => delete require.cache[require.resolve(file)]);
  return files;
};

module.exports = { loadFiles };
