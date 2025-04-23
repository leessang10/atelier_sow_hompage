import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"), // 기본 설정
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 변수 오류 무시
      "@typescript-eslint/no-explicit-any": "off", // any 타입 오류 무시
      "@typescript-eslint/no-empty-object-type": "off", // 빈 객체 타입 오류 무시
    },
  },
];

export default eslintConfig;
