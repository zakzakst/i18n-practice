import type { Preview } from "@storybook/react";
import AXE_LOCALE_JA from "axe-core/locales/ja.json";
// import {
//   INITIAL_VIEWPORTS,
//   MINIMAL_VIEWPORTS,
// } from "@storybook/addon-viewport";

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
    a11y: {
      config: {
        locale: AXE_LOCALE_JA,
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
