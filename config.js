module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://localhost:3000',
    MONGODB_URI: "mongodb://alex:r5t6y7u8@ds229701.mlab.com:29701/nafta" || 'mongodb://localhost/nafta',
    JWT_SECRET: process.env.SECRET,
    JWT_EXPIRY: '7d',
    GMAIL_USER: process.env.GMAILUSER,
    GMAIL_PASSWORD: process.env.GMAILPASSWORD
}