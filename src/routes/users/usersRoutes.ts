import { Request, Response, Router } from "express";
import {
  CreateNewUserSchemaType,
  UpdateUserDetailsSchemaType,
  UserLogInSchemaType,
  createNewUserSchema,
  updateUserDetailsSchema,
  userLogInSchema,
} from "./usersRoutes.schemas";
import { auth, validateSchema } from "../../system/middlewares";
import {
  comparePasswords,
  createJwtToken,
  createNewUser,
  findUserById,
  hashPassword,
  updateUserInfo,
} from "../../repositories/userRepositories/users";
import { ModifiedRequestInterface } from "../../system/utils";

const userRoute = Router();

userRoute.post(
  "/user/login",
  validateSchema(userLogInSchema),
  async (req: Request<{}, {}, UserLogInSchemaType>, res: Response) => {
    try {
      const { id, password } = req.body;

      const user = await findUserById(id);

      if (!user) {
        return res.status(401).json({ msg: "wrong credentials" });
      }

      const compare = await comparePasswords({
        compareToPassword: user.Password.S!,
        userPassword: password,
      });

      if (!compare) {
        return res.status(401).json({ msg: "wrong credentials" });
      }

      return res.status(201).json({
        jwtToken: createJwtToken({
          id,
        }),
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);

        return res.status(500).json({ msg: err.message });
      }
    }
  }
);

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
          id,
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

userRoute.put(
  "/user",
  auth,
  validateSchema(updateUserDetailsSchema),
  async (
    req: ModifiedRequestInterface<{}, {}, UpdateUserDetailsSchemaType>,
    res: Response
  ) => {
    try {
      const { id } = req.currentUser!;
      const { firstName, lastName, phoneNumber } = req.body;

      const user = await findUserById(id);

      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      }

      await updateUserInfo({ id, firstName, lastName, phoneNumber });

      return res.status(202).json({ firstName, id, lastName, phoneNumber });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);

        return res.status(500).json({ msg: err.message });
      }
    }
  }
);

export default userRoute;
