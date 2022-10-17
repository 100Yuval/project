"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const account_1 = __importDefault(require("./account"));
const groupSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    members: { type: [account_1.default.schema || this], default: null }
});
exports.default = mongoose_1.default.model("Group", groupSchema);
