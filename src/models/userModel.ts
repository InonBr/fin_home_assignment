export const userParams = {
  TableName: "Users",
  KeySchema: [
    { AttributeName: "ID", KeyType: "HASH" },
    { AttributeName: "LastName", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "ID", AttributeType: "S" },
    { AttributeName: "LastName", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  Projection: {
    ProjectionType: "ALL",
  },
};
