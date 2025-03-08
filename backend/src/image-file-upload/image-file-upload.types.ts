import type { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export namespace ImageFileUploadTypes {
	export type Config = Omit<MulterOptions, "fileFilter"> & { fileFilter?: Filter };

	type Filter = Required<MulterOptions>["fileFilter"] extends (
		a: unknown,
		...args: infer Rest
	) => infer Res
		? (req: Express.Request, ...args: Rest) => Res
		: never;
}
