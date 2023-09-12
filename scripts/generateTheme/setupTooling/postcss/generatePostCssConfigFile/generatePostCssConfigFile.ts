import { File } from "@utils/types/File";

const generatePostCssConfigFile = ():File => {
  const content =`import * as autoprefixer from 'autoprefixer';
import autoReset  from 'postcss-autoreset';
import nested from 'postcss-nested';
import cssnano from 'cssnano';
  
const config = {
  plugins: [
    autoprefixer,
    autoReset,
    nested,
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