module.exports = [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: require.resolve("@babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [require.resolve("@babel/preset-react")]
        }
      },
      globals: {
        React: "writable"
      }
    },
    plugins: {
      react: require("eslint-plugin-react")
    },
    rules: {
      // Add custom rules here
    }
  }
];
