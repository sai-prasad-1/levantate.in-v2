import type { NextConfig } from "next";

function r2Hostname() {
  const base = process.env.R2_PUBLIC_BASE_URL;
  if (!base) return null;
  try {
    return new URL(base).hostname;
  } catch {
    return null;
  }
}

const remoteHost = r2Hostname();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remoteHost
      ? [
          {
            protocol: "https",
            hostname: remoteHost,
          },
        ]
      : [],
  },
};

export default nextConfig;
