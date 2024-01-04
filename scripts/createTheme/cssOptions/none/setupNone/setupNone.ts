import styleSolutionEnqueuer from "@createTheme/styleSolutionEnqueuer/styleSolutionEnqueuer";
import { SetupCss } from "@utils/types/SetupCss";
import formatMessage from "@utils/formatMessage/formatMessage";

const setupNone = async({functionFile, answers}:SetupCss) => {
  await styleSolutionEnqueuer({
    functionFile,
    theme: answers.theme,
    option: answers.tooling.css,
    cssRegisterName: "styles",
    cssFileName: "styles",
  });
  console.log(formatMessage({message: `Alright, good luck!`, color: 'yellow'}));
};

export default setupNone;