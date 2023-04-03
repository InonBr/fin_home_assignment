import { compare, hash } from "bcrypt";
import { UsersDataInterface } from "./interfaces";
import { userParams } from "../../models/userModel";
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamodbClient } from "../../system/dynamoDb";
import { sign } from "jsonwebtoken";
import { token } from "../../config";

export const hashPassword = async (password: string) =>
  await hash(password, 10);

export const createNewUser = async ({
  firstName,
  id,
  lastName,
  password,
  phoneNumber,
}: UsersDataInterface) => {
  const userData = {
    TableName: userParams.TableName,
    Item: {
      ID: { S: id },
      FirstName: { S: firstName },
      LastName: { S: lastName },
      PhoneNumber: { S: phoneNumber },
      Password: { S: password },
    },
    ConditionExpression: "attribute_not_exists(ID)",
  };

  await dynamodbClient.send(new PutItemCommand(userData));
};

export const findUserById = async (userId: string) => {
  const getItemParams = {
    TableName: userParams.TableName,
    Key: {
      ID: { S: userId },
    },
  };

  return (await dynamodbClient.send(new GetItemCommand(getItemParams))).Item;
};

export const createJwtToken = ({
  firstName,
  id,
  lastName,
  phoneNumber,
}: Omit<UsersDataInterface, "password">) => {
  return sign(
    {
      firstName,
      id,
      lastName,
      phoneNumber,
    },
    token
  );
};

export const comparePasswords = async ({
  userPassword,
  compareToPassword,
}: {
  userPassword: string;
  compareToPassword: string;
}) => await compare(userPassword, compareToPassword);
