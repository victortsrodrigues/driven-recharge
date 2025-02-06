"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var schemaMiddleware_1 = require("../middlewares/schemaMiddleware");
var phonesController_1 = __importDefault(require("../controllers/phonesController"));
var express_1 = require("express");
var phonesSchema_1 = __importDefault(require("../schemas/phonesSchema"));
var phonesRouter = (0, express_1.Router)();
phonesRouter.post("/phones", (0, schemaMiddleware_1.validateSchema)(phonesSchema_1.default), phonesController_1.default.createPhone);
phonesRouter.get("/phones/:document", phonesController_1.default.getPhonesByCPF);
exports.default = phonesRouter;
