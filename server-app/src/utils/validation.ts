import Joi from 'joi';

const urlSchema = Joi.string().uri();

export const validateUrl = (url: string) => {
  const result = urlSchema.validate(url);
  return result.error === undefined;
};

// Example usage:
const url = "https://example.com";
if (validateUrl(url)) {
  console.log("URL is valid");
} else {
  console.log("URL is not valid");
}
