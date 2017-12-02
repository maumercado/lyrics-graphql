module.exports = {
    server: {
        port: process.env.PORT || 3001
    },
    db: {
        url: process.env.MONGO_URL
    }
};
