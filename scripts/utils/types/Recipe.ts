import { Theme } from "./Theme";
import { CssOption } from "./CssOption";
import { TemplateOption } from "./TemplateOption";
import { TestingOptions } from "./TestingOptions";

export type Recipe = {
  theme: Theme;
  tooling: {
    css: CssOption;
    ts: boolean;
    template: TemplateOption;
    testing: boolean;
    testingOptions: TestingOptions | null;
  };
};
