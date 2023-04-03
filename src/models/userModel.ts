export const userParams = {
  TableName: "Users",
  KeySchema: [{ AttributeName: "ID", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "ID", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  Projection: {
    ProjectionType: "ALL",
  },
};
