import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiConsumes,
	ApiParam,
	ApiOkResponse,
	ApiCreatedResponse,
} from "@nestjs/swagger";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { ImageUploadInterceptor } from "src/image-file-upload/image-file-upload.interceptor";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FindAllProductsDto } from "./dto/find-all-product.dto";

@ApiTags("Products")
@Controller("products")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: "Get all products" })
	@ApiOkResponse({ description: "Paginated all products list", type: FindAllProductsDto.Response })
	@Get()
	findAll(@Query() query: FindAllProductsDto.Query): Promise<FindAllProductsDto.Response> {
		return this.productService.findAll(query);
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
