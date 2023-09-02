import getThemeName from "./getThemeName/getThemeName";

const generateTheme = async () => {
  const themeName = await getThemeName();
};

(async () => {
  await generateTheme();
})();
