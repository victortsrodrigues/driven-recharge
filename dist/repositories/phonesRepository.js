"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../database/db"));
function createClient(body) {
    return __awaiter(this, void 0, void 0, function () {
        var cpf, result, newClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cpf = body.cpf;
                    return [4 /*yield*/, db_1.default.query("INSERT INTO clients (cpf) VALUES ($1) RETURNING *", [cpf])];
                case 1:
                    result = _a.sent();
                    newClient = result.rows[0];
                    return [2 /*return*/, newClient];
            }
        });
    });
}
function createPhone(id, body, carrier_id) {
    return __awaiter(this, void 0, void 0, function () {
        var description, name, numbers, phonePromises, result, phonesCreated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    description = body.description, name = body.name, numbers = body.numbers;
                    phonePromises = numbers.map(function (number) {
                        return db_1.default.query("INSERT INTO phones (client_id, carrier_id, name, description, number) VALUES ($1, $2, $3, $4, $5) RETURNING *", [id, carrier_id, name, description, number]);
                    });
                    return [4 /*yield*/, Promise.all(phonePromises)];
                case 1:
                    result = _a.sent();
                    phonesCreated = result.map(function (phone) { return phone.rows[0]; });
                    console.log(phonesCreated);
                    return [2 /*return*/, phonesCreated];
            }
        });
    });
}
function searchClientByCPF(cpf) {
    return __awaiter(this, void 0, void 0, function () {
        var clientExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default.query("SELECT * FROM clients WHERE cpf=$1;", [cpf])];
                case 1:
                    clientExists = _a.sent();
                    return [2 /*return*/, clientExists];
            }
        });
    });
}
function searchPhonesByClientId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var clientPhones;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default.query("SELECT * FROM phones WHERE client_id=$1;", [id])];
                case 1:
                    clientPhones = _a.sent();
                    return [2 /*return*/, clientPhones];
            }
        });
    });
}
function searchCarrierByCode(carrier) {
    return __awaiter(this, void 0, void 0, function () {
        var carrierExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.default.query("SELECT * FROM carriers WHERE code=$1;", [carrier])];
                case 1:
                    carrierExists = _a.sent();
                    return [2 /*return*/, carrierExists];
            }
        });
    });
}
function searchPhoneByNumber(numbers) {
    return __awaiter(this, void 0, void 0, function () {
        var phonePromises, phonesFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phonePromises = numbers.map(function (number) {
                        return db_1.default.query("SELECT * FROM phones WHERE number=$1;", [number]);
                    });
                    return [4 /*yield*/, Promise.all(phonePromises)];
                case 1:
                    phonesFound = _a.sent();
                    return [2 /*return*/, phonesFound];
            }
        });
    });
}
var phonesRepository = {
    searchCarrierByCode: searchCarrierByCode,
    searchPhoneByNumber: searchPhoneByNumber,
    searchClientByCPF: searchClientByCPF,
    createClient: createClient,
    createPhone: createPhone,
    searchPhonesByClientId: searchPhonesByClientId
};
exports.default = phonesRepository;
