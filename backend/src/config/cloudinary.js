import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function imageUpload(filepath) {
  try {

   return  await cloudinary.uploader.upload(filepath)
    
  } catch (error) {
    console.log(error);

  }
}



export default cloudinary;