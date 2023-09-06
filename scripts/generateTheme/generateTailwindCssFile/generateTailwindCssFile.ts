import { File } from "../../utils/types/File";

const generateTailwindCssFile = (): File => {
  const content = `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `;

  return {
    name: "tailwind.css",
    content,
  };
};

export default generateTailwindCssFile;
