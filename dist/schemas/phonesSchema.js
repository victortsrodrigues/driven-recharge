"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var phonesSchema = joi_1.default.object({
    cpf: joi_1.default
        .string()
        .length(11)
        .required()
        .pattern(/^[0-9]+$/) // numeric digits only
        .messages({
        "string.base": '"cpf" must be a string',
        "string.length": '"cpf" must contain 11 characters',
        "string.empty": '"cpf" cannot be a empty string',
        "any.required": '"cpf" is mandatory',
        "string.pattern.base": '"cpf" must contain only numbers',
    }),
    carrier: joi_1.default.number().integer().min(10).max(99).required().messages({
        "number.base": "Carrier must be a number",
        "number.min": "Carrier must have exactly 2 digits",
        "number.max": "Carrier must have exactly 2 digits",
        "any.required": "Carrier is required",
    }),
    name: joi_1.default.string().required().messages({
        "string.base": "Name must be a string",
        "any.required": "Name is required",
    }),
    description: joi_1.default.string().required().messages({
        "string.base": "Description must be a string",
        "any.required": "Description is required",
    }),
    numbers: joi_1.default
        .array()
        .items(joi_1.default
        .string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
        "string.base": "Phone number must be a string",
        "string.length": "Phone number must have exactly 11 digits",
        "string.pattern.base": "Phone number must contain only numbers",
        "any.required": "Phone number is required",
    }))
        .unique()
        .max(3)
        .required()
        .messages({
        "array.base": "Numbers must be an array",
        "array.unique": "Phone numbers must be unique",
        "array.max": "A maximum of 3 phone numbers is allowed",
        "any.required": "Numbers are required",
    }),
});
exports.default = phonesSchema;
