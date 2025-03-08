import { diskStorage } from "multer";
import { ImageFileUploadTypes } from "./image-file-upload.types";
import { BadRequestException } from "@nestjs/common";
import { extname } from "path";

export const multerConfig: ImageFileUploadTypes.Config = {
	fileFilter: (_, file, callback) => {
		// TODO: are there exists another exts of images?
		if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
			return callback(new BadRequestException("Only image files are allowed"), false);
		}

		callback(null, true);
	},
	storage: diskStorage({
		destination: "public/photos",
		filename: (_, file, callback) => {
			const ext = extname(file.originalname);
			const timestamp = Date.now();

			callback(null, `${timestamp}${ext}`);
		},
	}),
};
