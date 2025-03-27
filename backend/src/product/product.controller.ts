import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiConsumes,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { ImageUploadInterceptor } from "src/image-file-upload/image-file-upload.interceptor";
import { WithFiltrsInQueryParams } from "src/shared/features/filters/decorators/WithFiltersInQueryParams.decorator";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindAllProductsDto } from "./dto/find-all-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductFiltersDto } from "./entities/filters/dtos/product-filters.dto";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";

@ApiTags("Products")
@Controller("products")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: "Get all products" })
	@ApiOkResponse({ description: "Paginated all products list", type: FindAllProductsDto.Response })
	@WithFiltrsInQueryParams(ProductFiltersDto.Filters)
	@Get()
	findAll(
		@Query() query: FindAllProductsDto.Query,
		@Query("filters") filters: ProductFiltersDto.Filters
	): Promise<FindAllProductsDto.Response> {
		return this.productService.findAll({ ...query, filters });
	}

	@ApiOperation({ summary: "Get a single product by ID" })
	@ApiOkResponse({ description: "Return a product by ID", type: Product })
	@ApiParam({ name: "id", description: "Product ID", type: Number })
	@Get(":id")
	findOne(@Param("id") id: string): Promise<Product> {
		return this.productService.findOne(+id);
	}

	@ApiOperation({ summary: "Create a new product" })
	@ApiCreatedResponse({ description: "Product created successfully", type: Product })
	@UseInterceptors(ImageUploadInterceptor)
	@ApiConsumes("multipart/form-data")
	@Post()
	create(
		@Body() createProductDto: CreateProductDto,
		@UploadedFile() photo: Express.Multer.File
	): Promise<Product> {
		return this.productService.create({ ...createProductDto, image: photo });
	}

	@ApiOperation({ summary: "Update an existing product" })
	@ApiOkResponse({ description: "Product updated successfully", type: Product })
	@ApiParam({ name: "id", description: "Product ID", type: Number })
	@UseInterceptors(ImageUploadInterceptor)
	@ApiConsumes("multipart/form-data")
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateProductDto: UpdateProductDto,
		@UploadedFile() photo: Express.Multer.File
	): Promise<Product> {
		return this.productService.update(+id, { image: photo, ...updateProductDto });
	}

	@ApiOperation({ summary: "Delete a product by ID" })
	@ApiResponse({ status: 200, description: "Product deleted successfully", type: Product })
	@ApiParam({ name: "id", description: "Product ID", type: Number })
	@Delete(":id")
	remove(@Param("id") id: string): Promise<Product> {
		return this.productService.remove(+id);
	}
}
