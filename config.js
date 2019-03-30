module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://localhost:3000',
    MONGODB_URI: process.env.MONGOURI,
    JWT_SECRET: process.env.SECRET,
    JWT_EXPIRY: '7d',
    GMAIL_USER: process.env.GMAILUSER,
    GMAIL_PASSWORD: process.env.GMAILPASSWORD,
    CLOUD_NAME: process.env.CLOUDNAME,
    API_KEY: process.env.APIKEY,
    API_SECRET: process.env.APISECRET
}