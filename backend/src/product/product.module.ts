import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { FiltersController } from "./entities/filters/filters.controller";
import { FiltersService } from "./entities/filters/filters.service";
@Module({
	imports: [TypeOrmModule.forFeature([Product])],
	controllers: [ProductController, FiltersController],
	providers: [ProductService, FiltersService],
})
export class ProductModule {}

