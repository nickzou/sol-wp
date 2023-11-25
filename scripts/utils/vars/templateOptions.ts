import { TemplateOption } from "@utils/types/TemplateOption";

const templateOptions: TemplateOption[] = [
  { name: "twig", packageName: "twig/twig:^3.0" },
  { name: "latte", packageName: "latte/latte" },
  { name: "bladeone", packageName: "eftec/bladeone" },
  { name: "plate", packageName: "league/plates" },
  { name: "smarty", packageName: "smarty/smarty" },
  { name: "mustache", packageName: "mustache/mustache" },
  { name: "none", packageName: null },
];

export default templateOptions;
