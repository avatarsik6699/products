import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { multerConfig } from "./multer.config";

@Module({
	imports: [MulterModule.register(multerConfig)],
	providers: [],
	exports: [MulterModule],
})
export class ImageFileUploadModule {}
