export const userParams = {
  AttributeDefinitions: [
    { AttributeName: "ID", AttributeType: "S" },
    { AttributeName: "FirstName", AttributeType: "S" },
    { AttributeName: "LastName", AttributeType: "S" },
    { AttributeName: "PhoneNumber", AttributeType: "S" },
    { AttributeName: "Password", AttributeType: "S" },
  ],
  KeySchema: [{ AttributeName: "ID", KeyType: "HASH" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "Users",
  GlobalSecondaryIndexes: [
    {
      IndexName: "PhoneNumberIndex",
      KeySchema: [{ AttributeName: "PhoneNumber", KeyType: "HASH" }],
      Projection: {
        ProjectionType: "ALL",
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
};
