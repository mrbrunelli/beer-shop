export default {
    mongoUrl: process.env.MONGO_URL || "mongodb://beer:beer@localhost:27017",
    port: Number(process.env.PORT) || 3000,
};
