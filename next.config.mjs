/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /work became /it-projects. Permanent so anything already linked
      // — search engines included — follows it across.
      { source: "/work", destination: "/it-projects", permanent: true },
      { source: "/work/:slug", destination: "/it-projects/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
