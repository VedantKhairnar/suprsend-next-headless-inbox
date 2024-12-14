/** @type {import('next').NextConfig} */

import transpileModules from "next-transpile-modules";

const withTM = transpileModules(["@suprsend/react-inbox"]);

export default withTM({
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose",
  },
});
