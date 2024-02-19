import { File } from "@utils/types/File";

const generateCypressConfig = ():File => {
    const content = `import { defineConfig } from 'cypress';
const config = defineConfig({
    e2e: {
    baseUrl: 'http://localhost:8888'
    setupNodeEvents(on, config) {
    },
    excludeSpecPattern: [],
  },
});

export default config;`;

    return {
        name: 'cypress.config.ts',
        content
    }
};

export default generateCypressConfig;