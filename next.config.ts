import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // The Case Study is written in MDX, with live components among its prose (ADR 0002).
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default createMDX()(nextConfig);
