import { File } from "@utils/types/File";

interface geenrateUnoConfigFile {
  content: string[];
  outFile: string;
}

const generateUnoConfigFile = ({
  content,
  outFile,
}: geenrateUnoConfigFile): File => {
  const fileContent = `import { defineConfig } from 'unocss';\nimport presetUno from '@unocss/preset-uno';
  
  export default defineConfig({
    cli: {
      entry: [
        {
          patterns: ${JSON.stringify(content)},
          outFile: '${outFile}'
        }
      ]
    },
    presets: [
      presetUno(),
    ]
  });
  `;
  return {
    name: "uno.config.ts",
    content: fileContent,
  };
};

export default generateUnoConfigFile;
