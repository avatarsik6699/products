import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProductModule } from "./product/product.module";
import { envsFactoryMapper } from "./shared/configs/envs-factory-mapper";
import { TypeOrmModule } from "@nestjs/typeorm";
import dataSource from "./shared/configs/db/data-source";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ImageFileUploadModule } from "./image-file-upload/image-file-upload.module";

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "public", "photos"),
			serveRoot: "/products/photos",
		}),
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env", load: [envsFactoryMapper] }),
		TypeOrmModule.forRootAsync({ useFactory: () => dataSource.options }),
		ImageFileUploadModule,
		ProductModule,
	],
})
export class AppModule {}
