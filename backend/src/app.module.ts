import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { ImageFileUploadModule } from "./image-file-upload/image-file-upload.module";
import { ProductModule } from "./product/product.module";
import dataSource from "./shared/configs/db/data-source";
import { envsFactoryMapper } from "./shared/configs/envs-factory-mapper";

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
