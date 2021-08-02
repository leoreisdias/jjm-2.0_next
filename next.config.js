const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  async redirects(){
		return [
			{
				source: '/complete-news',
				destination: '/',
        permanent: false
			},
		]
	},
  images: {
    domains: ['jjm-upload.s3.amazonaws.com','assets.hgbrasil.com','jornaljm.s3.sa-east-1.amazonaws.com']
  },
  env: {
    BACKEND_API: process.env.APP_BACKEND,
    DOLLAR_API_KEY: process.env.DOLLAR_API,
    COFFEE_API_KEY: process.env.COFFEE_API,
    WEATHER_API_KEY: process.env.WEATHER_API,
    GOOGLE_CLIENT: process.env.CLIENT
  },
})