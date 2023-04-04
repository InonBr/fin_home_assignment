import { Request } from "express";

export interface DecodedTokenInterface {
  id: string;
}

export interface ModifiedRequestInterface<
  TParams = any,
  TQuery = any,
  TBody = any
> extends Request<TParams, any, TBody, TQuery> {
  currentUser?: DecodedTokenInterface;
}
