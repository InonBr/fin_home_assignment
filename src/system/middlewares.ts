import { Request, Response, NextFunction } from "express";
import { VerifyOptions, verify } from "jsonwebtoken";
import { ValidationError, ObjectSchema } from "yup";
import { token } from "../config";
import { DecodedTokenInterface, ModifiedRequestInterface } from "./utils";

export const validateSchema = (schema: ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (err: any) {
      console.error(err);

      if (err instanceof ValidationError) {
        res.status(400).json({ errors: err.errors });
      }
    }
  };
};

export const auth = (
  req: ModifiedRequestInterface,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const jwtToken = req.headers.authorization.split(" ")[1];

    verify(jwtToken, token, (err, decodedToken) => {
      if (err) {
        res.status(401).send("forbidden request");
      }

      const { id } = decodedToken as DecodedTokenInterface;

      req.currentUser = { id };
    });

    next();
  } else {
    res.status(401).send("forbidden request");
  }
};
