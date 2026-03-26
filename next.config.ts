import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow larger request bodies for PDF base64 uploads (default is ~1MB)
  serverExternalPackages: ["@anthropic-ai/sdk"],
};

export default nextConfig;
