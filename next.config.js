const CircularDependencyPlugin = require('circular-dependency-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /a\.js|node_modules/,
          failOnError: true,
        }),
      )
    }

    return config
  },
}

module.exports = nextConfig
