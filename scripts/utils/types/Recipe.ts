import { Theme } from "./Theme";
import { CssOption } from "./CssOption";
import { PhpOption } from "./phpOption";

export type Recipe = {
  theme: Theme;
  tooling: {
    css: CssOption;
    ts: boolean;
    php: PhpOption;
  };
};
