import { InferType, object, ref, string } from "yup";

export const createNewUserSchema = object().shape({
  id: string()
    .matches(/^[0-9]{9}$/, "ID must be a 9-digit number")
    .required(),
  firstName: string().max(20).required(),
  lastName: string().max(20).required(),
  phoneNumber: string()
    .matches(
      /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number format"
    )
    .required(),
  password: string().min(6).required(),
  password_confirm: string()
    .oneOf([ref("password")], "Passwords must match")
    .required(),
});

export type CreateNewUserSchemaType = InferType<typeof createNewUserSchema>;
