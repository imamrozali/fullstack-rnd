import { VitePWA } from "vite-plugin-pwa";
import { pwaManifest } from "./pwa-manifest";

export const pwaPlugin = VitePWA({
  registerType: "autoUpdate",
  manifest: pwaManifest,
});
