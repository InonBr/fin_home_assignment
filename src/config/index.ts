import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT ? process.env.PORT : "5000";
export const token = process.env.TOKEN ? process.env.TOKEN : "";

export const region = process.env.REGION ? process.env.REGION : "";
export const endpoint = process.env.DYNAMODB_ENDPOINT
  ? process.env.DYNAMODB_ENDPOINT
  : "";
export const accessKeyId = process.env.ACCESS_KEY_ID
  ? process.env.ACCESS_KEY_ID
  : "";
export const secretAccessKey = process.env.SECRET_ACCESS_KEY
  ? process.env.SECRET_ACCESS_KEY
  : "";

(() => {
  if (!token || !region || !endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("environment variables was not provided");
  }
})();
