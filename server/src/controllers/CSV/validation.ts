import { body, check, param, query } from "express-validator";

export const uploadCsvValidator = [
  check("file").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    return true;
  }),
];

export const validatePagination = [
  query("_limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("_limit must be a positive integer")
    .toInt(),
  query("_page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("_page must be a positive integer")
    .toInt(),
  query("fname").optional().isString().withMessage("fname must be a string"),
];

export const customerValidator = [
  body("data.job_title").notEmpty().withMessage("Job Title is required"),
  body("data.fname").notEmpty().withMessage("First Name is required"),
  body("data.lname").notEmpty().withMessage("Last Name is required"),
  body("data.phone_no").notEmpty().withMessage("Phone No is required"),
  body("data.gender").notEmpty().withMessage("Gender is required"),
  body("data.email").isEmail().withMessage("Invalid email address"),
];

export const validateUpdateCustomer = [
  param("_id")
    .exists()
    .withMessage("_id is required")
    .isMongoId()
    .withMessage("_id must be a valid MongoDB ObjectId"),
  body("data.job_title").notEmpty().withMessage("Job Title is required"),
  body("data.fname").notEmpty().withMessage("First Name is required"),
  body("data.lname").notEmpty().withMessage("Last Name is required"),
  body("data.phone_no").notEmpty().withMessage("Phone No is required"),
  body("data.gender").notEmpty().withMessage("Gender is required"),
  body("data.email").isEmail().withMessage("Invalid email address"),
];