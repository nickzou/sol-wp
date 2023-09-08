import { Theme } from "./Theme";
import { CssOption } from "./CssOption";

export type Recipe = {
  theme: Theme;
  setUpTooling: boolean;
  tooling: {
    css: CssOption;
    ts: boolean;
  };
};
