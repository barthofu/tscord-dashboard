const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {

	reactStrictMode: true,
    output: 'standalone',

	sassOptions: {
        includePaths: [
            path.join(__dirname, 'public/styles/')
        ]
    }
}

module.exports = nextConfig