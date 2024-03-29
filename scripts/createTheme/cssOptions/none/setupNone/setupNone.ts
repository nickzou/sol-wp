import { SetupCss } from "@utils/types/SetupCss";
import formatMessage from "@utils/formatMessage/formatMessage";

const setupNone = async({registerAssets}:SetupCss) => {
  registerAssets.push({
    handle: 'styles',
    file: 'styles',
    fileType: 'css'
  });

  console.log(formatMessage({message: `Alright, good luck!`, color: 'yellow'}));
};

export default setupNone;