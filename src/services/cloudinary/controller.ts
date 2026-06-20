import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "demo_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "demo_secret",
});

export class CloudinaryController {
  /**
   * Uploads an image to Cloudinary
   * @param fileBase64 The base64 string of the file to upload
   * @param folder The folder in Cloudinary to upload to
   * @returns The secure URL of the uploaded image
   */
  static async uploadImage(fileBase64: string, folder: string = "profiles"): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(fileBase64, {
        folder: folder,
        resource_type: "image",
      });
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Failed to upload image");
    }
  }

  /**
   * Deletes an image from Cloudinary by its public ID
   * @param publicId The public ID of the image to delete
   */
  static async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === "ok";
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      throw new Error("Failed to delete image");
    }
  }
}
