import { Request, Response, Router } from "express";
import {
  CreateNewUserSchemaType,
  createNewUserSchema,
} from "./usersRoutes.schemas";
import { validateSchema } from "../../system/middlewares";

const userRoute = Router();

userRoute.post(
  "/user",
  validateSchema(createNewUserSchema),
  async (req: Request<{}, {}, CreateNewUserSchemaType>, res: Response) => {
    try {
      const { firstName, id, lastName, password, phoneNumber } = req.body;

      res.send({ firstName, id, lastName, password, phoneNumber });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ msg: err.message });
      }
    }
  }
);

export default userRoute;
