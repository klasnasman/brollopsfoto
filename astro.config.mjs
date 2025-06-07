import { defineConfig } from "astro/config";

import react from "@astrojs/react";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  site: isDev ? "http://localhost:4321" : "https://brollop.klasnasman.com/",
  devToolbar: {
    enabled: false,
  },
  integrations: [react()],
});
