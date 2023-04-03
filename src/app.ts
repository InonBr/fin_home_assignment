import express, { Express } from "express";
import { port } from "./config";
import { dynamodbClient } from "./system/dynamoDb";
import {
  CreateTableCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { userParams } from "./models/userModel";
import userRoute from "./routes/users/usersRoutes";

const expressApp = async () => {
  const app: Express = express();

  app.use(express.json());

  const tablesData = await dynamodbClient.send(new ListTablesCommand({}));

  if (!tablesData.TableNames?.includes(userParams.TableName)) {
    await dynamodbClient.send(new CreateTableCommand(userParams));
  }

  console.log("🔵 DynamoDB connected...");

  app.use("/api", userRoute);

  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
};

expressApp();
