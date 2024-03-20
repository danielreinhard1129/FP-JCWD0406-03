import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Full Name cannot be empty")
    .test(
      "no-at-sign",
      'Username cannot contain "@"',
      (value) => !value || value.indexOf("@") === -1
    ),
  contact: yup
    .string()
    .matches(
      /^\+?[1-9][0-9\-]+$/,
      "Invalid phone number format. Cannot start with 0"
    )
    .max(14)
    .min(4, "Phone number must be at least 4 digits")
    .required("Contact cannot be empty"),
  alamat: yup.string().required("Address cannot Empty !"),

  email: yup.string().email().required("Email cannot Empty !"),
  roleId: yup.number().required("Select Role !"),
  password: yup
    .string()
    .required("Password cannot be empty !")
    .min(6)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .minUppercase(1),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Password cannot be empty"),
  identityNumber: yup
    .string()
    .min(7, " Identity number must be at least 7 characters")
    .required("Identity number is required for admin registration"),
  otherwise: yup.string().notRequired(),
});
