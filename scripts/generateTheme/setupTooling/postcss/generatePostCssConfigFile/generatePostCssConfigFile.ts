import { File } from "@utils/types/File";

const generatePostCssConfigFile = ():File => {
  const content =`import autoprefixer from 'autoprefixer';
  import postCssNested from 'postcss-nested';
  import cssnano from 'cssnano';
  
  const config = {
    plugins: [
      autoprefixer,
      postCssNested,
      cssnano({
        preset: 'default',
      }),
    ],
  };
  
  export default config;`;
  
  return {
    name: 'postcss.config.ts',
    content
  }
};

export default generatePostCssConfigFile;