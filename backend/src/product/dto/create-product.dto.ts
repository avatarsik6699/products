import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNumber, IsOptional, Length, Min, ValidateIf } from "class-validator";
import { Product } from "../entities/product.entity";

export class CreateProductDto
	implements Omit<Product, "id" | "slug" | "photoFileName" | "updatedAt" | "createdAt" | "setSlug">
{
	@ApiProperty({ example: "Product Name", description: "Name of the product", maxLength: 255 })
	@IsString()
	@Length(1, 255)
	name: Product["name"];

	@ApiProperty({ example: "Description of the product", description: "Description of the product" })
	@IsString()
	@Length(1, 512)
	description: Product["description"];

	@ApiProperty({ example: 100.0, description: "Price of the product", minimum: 0 })
	@Transform(({ value: price }: { value: Product["price"] | string }) =>
		typeof price === "string" ? parseFloat(price) : undefined
	)
	@IsNumber({}, { message: "Price must be a number" })
	@Min(0, { message: "Price must be greater than or equal to 0" })
	price: Product["price"];

	@ApiPropertyOptional({
		example: 90.0,
		description: "Discounted price of the product",
		minimum: 0,
	})
	@Transform(({ value: discount }: { value: Product["discount"] | string }) => {
		if (discount === "" || discount === null) return null;

		return typeof discount === "string" ? parseFloat(discount) : undefined;
	})
	@ValidateIf(({ discount }: Pick<Product, "discount">) => discount !== null)
	@IsNumber({}, { message: "Price must be a number" })
	@Min(0, { message: "Price must be greater than or equal to 0" })
	@IsOptional()
	discount: Product["discount"];

	@ApiProperty({ example: "12345", description: "SKU of the product", maxLength: 100 })
	@IsString()
	@Length(1, 100)
	sku: Product["sku"];

	@ApiPropertyOptional({ type: "string", format: "binary" })
	@Transform(({ value: file }: { value: string | null }) => {
		if (file === "" || file === null) return null;

		return file;
	})
	@ValidateIf(({ image }: { image: Express.Multer.File | null }) => image !== null)
	@IsOptional()
	image?: Express.Multer.File;
}
