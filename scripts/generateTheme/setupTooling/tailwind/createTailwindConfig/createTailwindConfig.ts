import fs from "fs";

interface createTailwindConfig {
  content: string[];
}

const createTailwindConfig = ({ content }: createTailwindConfig) => {
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

  fs.writeFileSync("tailwind.config.ts", fileContent);
};

export default createTailwindConfig;
