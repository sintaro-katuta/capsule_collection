/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production'

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: prod ? false : true,
    // ↓ここ
    // disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
    //next.js config
    reactStrictMode: true,
})
