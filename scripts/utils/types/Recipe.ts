import { Theme } from "./Theme";
import { CssOption } from "./CssOption";
import { TemplateOption } from "./TemplateOption";

export type Recipe = {
  theme: Theme;
  tooling: {
    css: CssOption;
    ts: boolean;
    php: TemplateOption;
  };
};
