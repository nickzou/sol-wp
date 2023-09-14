import { CssOption } from "../types/CssOption";

const cssOptions: CssOption[] = [
  { name: "tailwind", packageName: "tailwindcss" },
  { name: "uno", packageName: "unocss" },
  { name: "sass", packageName: "sass" },
  { name: "postcss", packageName: "postcss" },
  { name: "none", packageName: null },
];

export default cssOptions;
