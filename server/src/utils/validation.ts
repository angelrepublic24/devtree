import {body} from 'express-validator'

const validateUserCreation  = [
    body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]


const validateLogin = [
  body("email")
  .isEmail()
  .withMessage("Email is required"),
  body("password")
  .notEmpty()
  .withMessage("Password is required"),
]

const validateProfileForm = [
  body("username")
    .notEmpty()
    .withMessage("The username cannot be empty"),
  body("description")
    .notEmpty()
    .withMessage("The description cannot be empty"),
]

const validateUsername = [
  body("username")
    .notEmpty()
    .withMessage("The username cannot be empty"),
]
export {
    validateUserCreation,
    validateLogin,
    validateProfileForm,
    validateUsername
};