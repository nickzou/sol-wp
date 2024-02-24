import styleSolutionEnqueuer from "@createTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";
import { SetupCss } from "@utils/types/SetupCss";
import formatMessage from "@utils/formatMessage/formatMessage";

const setupNone = async({registerAssets, answers}:SetupCss) => {
  registerAssets.push({
    handle: 'styles',
    file: 'styles',
    fileType: 'css'
  });
  // await styleSolutionEnqueuer({
  //   functionFile,
  //   theme: answers.theme,
  //   option: answers.tooling.css,
  //   cssRegisterName: "styles",
  //   cssFileName: "styles",
  // });
  console.log(formatMessage({message: `Alright, good luck!`, color: 'yellow'}));
};

export default setupNone;