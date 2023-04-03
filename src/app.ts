import express, { Express } from "express";
import { port } from "./config";
import { dynamodbClient } from "./system/dynamoDb";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";

const app: Express = express();

app.use(express.json());

dynamodbClient
  .send(new ListTablesCommand({}))
  .then(() => {
    console.log("🔵 DynamoDB connected...");
  })
  .catch((err) => {
    console.error(err.message);
    throw err;
  });

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});
