import { PlaywrightTestConfig } from "@playwright/test";
import { compact } from "lodash";
import { platform } from "os";

const IS_CI = process.env["CI"] === "true";

const config: PlaywrightTestConfig = {
    testDir: "test/scenario",
    forbidOnly: IS_CI,
    // Re-enable after first successful CI run
    // retries: IS_CI ? 2 : 0,
    webServer: {
        command: "yarn start",
        port: 1234,
    },
    use: {
        trace: "retain-on-failure",
    },
    projects: compact([
        {
            name: "chromium",
            use: { browserName: "chromium" },
        },
        {
            name: "firefox",
            use: { browserName: "firefox" },
        },
        // Re-enable when @playwright/test v1.17.0 is released. See
        // microsoft/playwright issue #9811
        platform() !== "darwin"
            ? {
                  name: "webkit",
                  use: { browserName: "webkit" },
              }
            : null,
    ]),
};
export default config;
