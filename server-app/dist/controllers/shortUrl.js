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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../models/shortUrl");
const validation_1 = require("../utils/validation");
const handleError = (res, error) => {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
};
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("The full Url is", req.body.fullUrl);
        const { fullUrl } = req.body;
        const isValidUrl = (0, validation_1.validateUrl)(fullUrl);
        if (!isValidUrl) {
            res.status(400).send({ message: "Invalid URL" });
            return;
        }
        const urlFound = yield shortUrl_1.urlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409).send(urlFound);
        }
        else {
            const shortUrl = yield shortUrl_1.urlModel.create({ fullUrl });
            res.status(201).send(shortUrl);
        }
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.createUrl = createUrl;
// export const createUrl = async (
//   req: Request<{}, {}, CreateUrlReqBody>,
//   res: Response
// ) => {
//   try {
//     console.log("The full Url is", req.body.fullUrl);
//     const { fullUrl, customUrl } = req.body;
//     const isValidUrl = validateUrl(fullUrl);
//     if (!isValidUrl) {
//       res.status(400).send({ message: "Invalid URL" });
//       return;
//     }
//     const urlFound = await urlModel.find({ fullUrl });
//     if (urlFound.length > 0) {
//       res.status(409).send(urlFound);
//     } else {
//       let shortUrl;
//       if (customUrl) {
//         // Check if custom URL is already taken
//         const customUrlFound = await urlModel.findOne({ shortUrl: customUrl });
//         if (customUrlFound) {
//           res.status(400).send({ message: "Custom URL is already taken" });
//           return;
//         }
//         shortUrl = customUrl;
//       } else {
//         // Generate a random short URL if no custom URL is provided
//         shortUrl = uuidv4().slice(0, 6); // Use the first 6 characters of the UUID
//       }
//       const newUrl = await urlModel.create({ fullUrl, shortUrl });
//       res.status(201).send(newUrl);
//     }
//   } catch (error) {
//     handleError(res, error as Error);
//   }
// };
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield shortUrl_1.urlModel.find().sort({ createdAt: -1 });
        if (shortUrls.length === 0) {
            res.status(200).send({ message: "short Urls not found!" });
        }
        else {
            res.status(200).send(shortUrls);
        }
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send({ message: "Short Url not found!" });
        }
        else {
            shortUrl.clicks++;
            yield shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
            // res.status(200).send(shortUrl);
        }
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "Url Succesfully Delected!" });
        }
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.deleteUrl = deleteUrl;
