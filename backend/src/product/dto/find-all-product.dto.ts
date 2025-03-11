import { ApiSchema, IntersectionType } from "@nestjs/swagger";

import { PaginationQueryDto } from "src/shared/features/pagination/pagionation-query.dto";
import { createSortingDto } from "src/shared/features/sorting/sorting-query.dto";
import { Product } from "../entities/product.entity";
import { createPaginationResponseDto } from "src/shared/features/pagination/pagination-response.dto";

export namespace FindAllProductsDto {
	const ProductSortingDto = createSortingDto(Product);
	const PaginationResponseDto = createPaginationResponseDto(Product);

	@ApiSchema({ name: "FindAllProductsQueryDto" })
	export class Query extends IntersectionType(PaginationQueryDto, ProductSortingDto) {}

	@ApiSchema({ name: "FindAllProductsResponseDto" })
	export class Response extends PaginationResponseDto {}
}
