import { Injectable } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "./multer.config";
import { ImageFileUploadConstants } from "./image-file-upload.constants";

@Injectable()
export class ImageUploadInterceptor extends FileInterceptor("image", {
	...multerConfig,
	limits: { fileSize: 50 * ImageFileUploadConstants.sizes.mb },
}) {}
