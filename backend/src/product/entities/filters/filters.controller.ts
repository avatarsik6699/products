import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { MinMaxRangeDto } from "./dtos/min-max-range.dto";
import { FiltersService } from "./filters.service";

@ApiTags("Products Filters")
@Controller("products-filters")
export class FiltersController {
	constructor(private readonly filtersService: FiltersService) {}

	@ApiOperation({ summary: "Get the minimum and maximum price of products" })
	@ApiOkResponse({
		description: "The minimum and maximum price of products",
		type: MinMaxRangeDto.Response,
	})
	@Get("min-max-range-price")
	getMinMaxRangePrice(): Promise<MinMaxRangeDto.Response> {
		return this.filtersService.getMinMaxRangePrice();
	}
}
