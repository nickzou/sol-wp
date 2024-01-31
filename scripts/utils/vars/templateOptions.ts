import { TemplateOption } from "@utils/types/TemplateOption";

const templateOptions: TemplateOption[] = [
  { name: "twig", packageName: "twig/twig:^3.0", extension: 'twig' },
  { name: "latte", packageName: "latte/latte", extension: 'latte' },
  { name: "bladeone", packageName: "eftec/bladeone", extension: 'blade.php' },
  { name: "plates", packageName: "league/plates", extension: '.php'},
  { name: "smarty", packageName: "smarty/smarty", extension: '.tpl' },
  { name: "none", packageName: null, extension: '.php' },
];

export default templateOptions;
