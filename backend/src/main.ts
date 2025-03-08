import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { envsFactoryMapper } from "./shared/configs/envs-factory-mapper";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

dotenv.config();

const { port } = envsFactoryMapper();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Документация")
		.setDescription("Документация к запросам")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		operationIdFactory: (controllerKey, methodKey) => {
			function capitalizeFirstLetter(input: string) {
				if (input.length === 0) {
					return input;
				}

				const firstChar = input.charAt(0).toUpperCase();

				const restOfString = input.slice(1);

				return firstChar + restOfString;
			}

			function transformControllerName(input: string) {
				const match = input.match(/([A-Za-z]+)Controller/);

				if (match) {
					return match[1].toLowerCase();
				}

				return input;
			}

			return `${transformControllerName(controllerKey)}${capitalizeFirstLetter(methodKey)}`;
		},
	});

	SwaggerModule.setup("swagger", app, document, {
		yamlDocumentUrl: "swagger/yaml",
		jsonDocumentUrl: "swagger/json",
		explorer: false,
		customSiteTitle: "API",
	});

	await app.listen(port);
}

void bootstrap();
