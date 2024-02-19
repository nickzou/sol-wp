import { File } from "@utils/types/File";

const generatePlaywrightConfig = ():File => {
    const content = `import { defineConfig, devices } from '@playwright/test';
const config = defineConfig({
    testDir: 'playwright',
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:8888',
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'WebKit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    webServer: {
        command: 'wp-env',
        url: 'http://localhost:8888',
        reuseExistingServer: true
    }
});

export default config;`;

    return {
        name: 'playwright.config.ts',
        content
    }
};

export default generatePlaywrightConfig;