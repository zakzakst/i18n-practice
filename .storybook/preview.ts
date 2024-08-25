import type { Preview } from "@storybook/react";
import axe from "axe-core";
import AXE_LOCALE_JA from "axe-core/locales/ja.json";
// import {
//   INITIAL_VIEWPORTS,
//   MINIMAL_VIEWPORTS,
// } from "@storybook/addon-viewport";

// const a11yNoRules = axe.getRules().map((rule) => ({
//   id: rule.ruleId,
//   enabled: false,
// }));

// const a11yWcag2aRules = axe.getRules(["wcag2a"]).map((rule) => ({
//   id: rule.ruleId,
//   enabled: true,
// }));

const customViewports = {
  kindleFire2: {
    name: "Kindle Fire 2",
    styles: {
      width: "600px",
      height: "963px",
    },
  },
  kindleFireHD: {
    name: "Kindle Fire HD",
    styles: {
      width: "533px",
      height: "801px",
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // memo storybook反映時点で問題点に気づける（シフトレフト）
    a11y: {
      config: {
        locale: AXE_LOCALE_JA,
        // rules: [
        //   ...a11yNoRules,
        //   ...a11yWcag2aRules,
        //   {
        //     id: "color-contrast",
        //     enabled: false,
        //   },
        // ],
      },
    },
    viewport: {
      viewports: {
        // ...INITIAL_VIEWPORTS,
        // ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
      // defaultViewport: "iphone14promax",
    },
  },
};

export default preview;
