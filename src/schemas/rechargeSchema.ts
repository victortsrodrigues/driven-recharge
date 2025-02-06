import joi from "joi";
import { BodyRecharge } from "../protocols/phoneProtocols";

const rechargeSchema = joi.object<BodyRecharge>({
  number: joi
    .string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "Phone number must be a string",
      "string.length": "Phone number must have exactly 11 digits",
      "string.pattern.base": "Phone number must contain only numbers",
      "any.required": "Phone number is required",
    }),
  value: joi
    .number()
    .min(10)
    .max(1000)
    .precision(2)
    .required()
    .messages({
      "number.base": "Value must be a number",
      "number.min": "Value must be at least R$ 10,00",
      "number.max": "Value must not exceed R$ 1.000,00",
      "any.required": "Value is required",
    }),
});

export default rechargeSchema;
