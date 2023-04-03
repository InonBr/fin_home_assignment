import { Request, Response, Router } from "express";
import {
  CreateNewUserSchemaType,
  createNewUserSchema,
} from "./usersRoutes.schemas";
import { validateSchema } from "../../system/middlewares";
import {
  createJwtToken,
  createNewUser,
  hashPassword,
} from "../../repositories/userRepositories/users";

const userRoute = Router();

userRoute.post(
  "/user",
  validateSchema(createNewUserSchema),
  async (req: Request<{}, {}, CreateNewUserSchemaType>, res: Response) => {
    try {
      const { firstName, id, lastName, password, phoneNumber } = req.body;

      const hashedPassword = await hashPassword(password);

      await createNewUser({
        firstName,
        id,
        lastName,
        password: hashedPassword,
        phoneNumber,
      });

      return res.status(201).json({
        jwtToken: createJwtToken({
          firstName,
          id,
          lastName,
          phoneNumber,
        }),
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);

        if (err.name === "ConditionalCheckFailedException") {
          return res.status(400).json({ msg: "user already exists" });
        }

        return res.status(500).json({ msg: err.message });
      }
    }
  }
);

export default userRoute;
