"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrl = void 0;
const joi_1 = __importDefault(require("joi"));
const urlSchema = joi_1.default.string().uri();
const validateUrl = (url) => {
    const result = urlSchema.validate(url);
    return result.error === undefined;
};
exports.validateUrl = validateUrl;
// Example usage:
const url = "https://example.com";
if ((0, exports.validateUrl)(url)) {
    console.log("URL is valid");
}
else {
    console.log("URL is not valid");
}
