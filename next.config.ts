import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  // Imágenes de las propuestas, subidas con `pnpm propuesta:subir`.
  images: { remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }] },
};

export default withBotId(nextConfig);
