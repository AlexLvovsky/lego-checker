module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/.esclintrc.js",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "single"],
    "import/no-unresolved": 0,
    "object-curly-spacing": ["error", "always"],
    "max-len": ["warn", { code: 200, ignoreComments: true }],
  },
};
