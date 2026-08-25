import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // короткие ссылки для директов/авто-DM (302: можно перенацеливать)
      { source: "/free", destination: "/product?src=dm-en", permanent: false },
      { source: "/sistema", destination: "/ru/product?src=dm-ru", permanent: false },
    ];
  },
};

export default nextConfig;
