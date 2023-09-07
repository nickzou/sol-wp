export type Recipe = {
  theme: {
    name: string;
    folder: string;
    author: string;
    description: string;
    version: string;
  };
  setUpTooling: boolean;
  tooling: {
    css: "tailwind" | "unocss" | "postcss" | "sass" | "css" | "none";
    ts: boolean;
  };
};
