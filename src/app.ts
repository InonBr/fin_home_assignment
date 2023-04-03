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

  //   const params = {
  //     TableName: "Users",
  //     Item: {
  //       ID: { S: "1" }, // string data type
  //       FirstName: { S: "John" },
  //       LastName: { S: "aaaaaaaaaa" },
  //       PhoneNumber: { S: "qqqqqqqq" },
  //       Password: { S: "password123" },
  //     },
  //     ConditionExpression: "attribute_not_exists(ID)",
  //   };

  //   const command = new PutItemCommand(params);

  //   try {
  //   const result = await dynamodbClient.send(command);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.log(err.name);
  //     }
  //   }

  //   const data = await dynamodbClient.send(
  //     new ScanCommand({
  //       TableName: "Users",
  //     })
  //   );

  //   console.log(data.Items);

  console.log("🔵 DynamoDB connected...");

  app.use("/api", userRoute);

  app.listen(port, () => {
    console.log(`🟢 App listening at http://localhost:${port}`);
  });
};

expressApp();
