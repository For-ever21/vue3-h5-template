module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  // 告诉jest需要解析的文件
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    "ts",
    'vue'
  ],
  // 告诉jest去哪里找模块资源，同webpack中的modules
  moduleDirectories: ["src", "node_modules"],
  // 告诉jest去哪里找我们编写的测试文件
  testMatch: [
    // '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
  ],
};
