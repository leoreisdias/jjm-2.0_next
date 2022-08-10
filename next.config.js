const withPWA = require('next-pwa');

process.env.ENVIROMENT == 'dev' ?
  module.exports = {
    async redirects() {
      return [
        {
          source: '/complete-news',
          destination: '/',
          permanent: false
        },
      ]
    },
    images: {
      domains: ['jjm-upload.s3.amazonaws.com', 'assets.hgbrasil.com', 'jornaljm.s3.sa-east-1.amazonaws.com', 'i.imgur.com']
    },
    env: {
      BACKEND_API: process.env.APP_BACKEND,
      WEATHER_API_KEY: process.env.WEATHER_API,
      GOOGLE_CLIENT: process.env.CLIENT
    },
  } :
  module.exports = withPWA({
    pwa: {
      dest: 'public'
    },
    async redirects() {
      return [
        {
          source: '/complete-news',
          destination: '/',
          permanent: false
        },
      ]
    },
    images: {
      domains: ['jjm-upload.s3.amazonaws.com', 'assets.hgbrasil.com', 'jornaljm.s3.sa-east-1.amazonaws.com', 'i.imgur.com']
    },
    env: {
      BACKEND_API: process.env.APP_BACKEND,
      WEATHER_API_KEY: process.env.WEATHER_API,
      GOOGLE_CLIENT: process.env.CLIENT
    },
  })