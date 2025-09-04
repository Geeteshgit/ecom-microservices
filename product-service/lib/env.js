import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
    MONGO_USERNAME: process.env.MONGO_USERNAME || "admin",
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || "userdb",
}