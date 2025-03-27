import { TransformJsonToClass } from "src/shared/features/filters/decorators/TransformJsonToClass.decorator";
import { MinMaxRangeDto } from "./min-max-range.dto";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { TransformToBoolean } from "src/shared/features/filters/decorators/transform-to-boolean.decorator";
export namespace ProductFiltersDto {
	export class Filters {
		@TransformJsonToClass(MinMaxRangeDto.Query)
		price?: MinMaxRangeDto.Query;

		@ApiPropertyOptional({
			description: "Filter products with photo",
			example: false,
		})
		@IsOptional()
		@IsBoolean()
		@TransformToBoolean()
		onlyWithPhoto?: boolean;

		@ApiPropertyOptional({
			description: "Filter products with discount",
			example: false,
		})
		@IsOptional()
		@IsBoolean()
		@TransformToBoolean()
		onlyWithDiscount?: boolean;

		@ApiPropertyOptional({
			description: "Filter products with max discount",
			example: false,
		})
		@IsOptional()
		@IsBoolean()
		@TransformToBoolean()
		onlyWithMaxDiscount?: boolean;

		@ApiPropertyOptional({
			description: "Search for products by name",
			example: "product name",
		})
		@IsOptional()
		@IsString()
		search?: string;
	}
}
