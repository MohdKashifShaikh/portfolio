import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  devIndicators: false,
  output: "export",
  distDir: "dist",
};

export default nextConfig;
