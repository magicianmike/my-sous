import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // The Case Study is written in MDX, with live components among its prose (ADR 0002).
  pageExtensions: ["ts", "tsx", "mdx"],
  // `next dev` writes an AGENTS.md for coding agents otherwise; the repo keeps its own CLAUDE.md.
  agentRules: false,
};

export default createMDX()(nextConfig);
