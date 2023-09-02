import getDescription from "./getDescription/getDescription";
import getThemeName from "./getThemeName/getThemeName";

const generateTheme = async () => {
  const themeName = await getThemeName();
  const description = await getDescription();
};

(async () => {
  await generateTheme();
})();
