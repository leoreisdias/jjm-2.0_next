module.exports = {
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
    backendApi: process.env.APP_BACKEND,
    dollarApiKey: process.env.DOLLAR_API,
    coffeeApiKey: process.env.COFFEE_API,
    weatherApiKey: process.env.WEATHER_API
  },
}
