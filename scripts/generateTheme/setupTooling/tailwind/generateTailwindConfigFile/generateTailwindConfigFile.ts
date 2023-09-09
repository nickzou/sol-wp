import { File } from "@utils/types/File";

interface generateTailwindConfigFile {
  content: string[];
}

const generateTailwindConfigFile = ({
  content,
}: generateTailwindConfigFile): File => {
  const fileContent = `import { Config } from 'tailwindcss';

  const config: Config = {
    content: ${JSON.stringify(content)},
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
  export default config;
  `;

  return {
    name: "tailwind.config.ts",
    content: fileContent,
  };
};

export default generateTailwindConfigFile;
