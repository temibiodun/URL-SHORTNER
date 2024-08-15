import express, { Request, Response } from "express";
import { urlModel } from "../models/shortUrl";
import { validateUrl } from "../utils/validation";
import { error } from "console";

interface CreateUrlReqBody {
  fullUrl: string;
  customUrl?: string;
}
const handleError = (res: express.Response, error: Error) => {
  console.error(error);
  res.status(500).send({ message: "Something went wrong" });
};


export const createUrl = async (
  req: Request<{}, {}, CreateUrlReqBody>,
  res: Response
) => {
  try {
    console.log("The full Url is", req.body.fullUrl);
    const { fullUrl } = req.body;
    const isValidUrl = validateUrl(fullUrl);
    if (!isValidUrl) {
      res.status(400).send({ message: "Invalid URL" });
      return;
    }
    const urlFound = await urlModel.find({ fullUrl });
    if (urlFound.length > 0) {
      res.status(409).send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    handleError(res, error as Error);
  }
};

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

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find().sort({ createdAt: -1 });
    if (shortUrls.length === 0) {
      res.status(200).send({ message: "short Urls not found!" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send({ message: "Short Url not found!" });
    } else {
      shortUrl.clicks++;
      await shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
      // res.status(200).send(shortUrl);
    }
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      res.status(200).send({ message: "Url Succesfully Delected!" });
    }
  } catch (error) {
    handleError(res, error as Error);
  }
};


