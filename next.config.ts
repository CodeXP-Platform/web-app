import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: `${process.env.API_URL ?? "http://localhost:8087/api/v1"}/:path*`,
            },
        ];
    },
};

export default nextConfig;
