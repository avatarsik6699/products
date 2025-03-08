import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsObject, IsOptional, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import {
	IsString,
	ValidationOptions,
	registerDecorator,
	ValidationArguments,
} from "class-validator";

function IsValidSortFormat(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "isValidSortFormat",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: string | undefined, args: ValidationArguments) {
					if (!value) return true;

					const [field, order] = value.split(":");

					if (!field || !order) return false;
					const allowedFields = [
						"name",
						"description",
						"price",
						"discountedPrice",
						"sku",
						"photoUrl",
					];
					const allowedOrders = [SortOrderEnum.ASC, SortOrderEnum.DESC];

					return allowedFields.includes(field) && allowedOrders.includes(order as SortOrderEnum);
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be in the format fieldName:direction (e.g., name:ASC) with valid fieldName and direction (ASC or DESC)`;
				},
			},
		});
	};
}

enum SortOrderEnum {
	ASC = "ASC",
	DESC = "DESC",
}

export class FindAllProductDto {
	@ApiProperty({
		example: { name: "Product" },
		description: 'Filter products by fields (e.g., { name: "Product" })',
	})
	@IsObject()
	@IsOptional()
	@ValidateNested()
	@Type(() => Object)
	filter?: Record<string, unknown>;

	@ApiProperty({ example: "name:ASC", description: "Sort by field and direction (e.g., name:ASC)" })
	@IsString()
	@IsValidSortFormat({
		message:
			"Sort must be in the format fieldName:direction (e.g., name:ASC) with valid fieldName and direction (ASC or DESC)",
	})
	@IsOptional()
	sort?: string;

	@ApiProperty({ example: 10, description: "Limit the number of items per page", minimum: 1 })
	@IsInt()
	@Min(1)
	@IsOptional()
	limit?: number;

	@ApiProperty({ example: 1, description: "Page number", minimum: 1 })
	@IsInt()
	@Min(1)
	@IsOptional()
	page?: number;
}
