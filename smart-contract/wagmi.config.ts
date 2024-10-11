import { defineConfig } from "@wagmi/cli";

import { hardhat } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "../backend/src/generated.ts",
  plugins: [
    hardhat({
      project: "./",
      artifacts: "./artifacts",
    }),
  ],
});
