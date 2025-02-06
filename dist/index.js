"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var phonesRouter_1 = __importDefault(require("./routers/phonesRouter"));
var dotenv_1 = __importDefault(require("dotenv"));
var rechargesRouter_1 = __importDefault(require("./routers/rechargesRouter"));
var summaryRouter_1 = __importDefault(require("./routers/summaryRouter"));
var errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errorHandlerMiddleware"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.get("/health", function (req, res) {
    res.status(200).send("I'm OK!");
});
app.use(phonesRouter_1.default);
app.use(rechargesRouter_1.default);
app.use(summaryRouter_1.default);
app.use(errorHandlerMiddleware_1.default);
var port = Number(process.env.PORT) || 5000;
app.listen(port, function () {
    console.log("Server running on port ".concat(port, "."));
});
