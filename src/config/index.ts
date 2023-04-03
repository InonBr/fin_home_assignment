import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT ? process.env.PORT : "5000";
