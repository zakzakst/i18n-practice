import type { Preview } from "@storybook/react";
import AXE_LOCALE_JA from "axe-core/locales/ja.json";

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
  },
};

export default preview;
