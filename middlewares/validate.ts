import { Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import _ from "lodash";
import ApiError from "../utils/AppError";
import httpStatus from "http-status";

const validate =
  (schema: {
    body?: ObjectSchema;
    query?: ObjectSchema<any>;
    params?: Object;
  }) =>
  async (req: Request, res: Response, next: Function) => {
    const validSchema = _.pick(schema, ["body", "query", "params"]);
    const object = _.pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((detail: { message: string }) => {
          return detail.message;
        })
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
