const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

const createJsonConfig = nextJest({
  dir: ".",
});
const jestConfig = createJsonConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
