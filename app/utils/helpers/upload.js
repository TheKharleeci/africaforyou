import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import DatauriParser from 'datauri/parser';

import 'dotenv/config';

const parser = new DatauriParser();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * parses the file using data URI to a base64 encoded string that represents a file
 *
 * @param {Object} req - The request from the endpoint.
 * @returns {String} - a buffer that represent the file
 */
const dataUri = req => parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

/**
 * Uploads file to cloudinary
 *
 * @param {String} req - specifies the file path
 * @returns { String } - an object containing information about the  file on cloudinary
 */
const cloudinaryConfig = async(req) => {
  try {
    const file = dataUri(req).content;
    return await cloudinary.v2.uploader.upload(file, { width: 200, height: 200, quality: 60 });
  } catch (error) {
    return error;
  }
};

export default cloudinaryConfig;
