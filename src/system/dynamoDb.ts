import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { accessKeyId, endpoint, region, secretAccessKey } from "../config";

export const dynamodbClient = new DynamoDBClient({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
