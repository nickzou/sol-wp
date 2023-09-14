import { Theme } from "./Theme";
import { CssOption } from "./CssOption";

export type Recipe = {
  theme: Theme;
  tooling: {
    css: CssOption;
    ts: boolean;
  };
};
