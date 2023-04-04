import { Request } from "express";

export interface DecodedTokenInterface {
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
}

export interface ModifiedRequestInterface<
  TParams = any,
  TQuery = any,
  TBody = any
> extends Request<TParams, any, TBody, TQuery> {
  currentUser?: DecodedTokenInterface;
}
