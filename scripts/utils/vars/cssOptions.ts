import { CssOption } from "../types/CssOption";

const cssOptions: CssOption[] = [
  { name: "tailwind", packageName: "tailwindcss" },
  { name: "uno", packageName: "unocss" },
  { name: "sass", packageName: "dart-sass" },
  { name: "postcss", packageName: "postcss" },
  { name: "css", packageName: null },
  { name: "none", packageName: null },
];

export default cssOptions;
