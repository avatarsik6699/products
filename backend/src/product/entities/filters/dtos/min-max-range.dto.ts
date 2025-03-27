import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";

export namespace MinMaxRangeDto {
	@ApiSchema({ name: "MinMaxRangeDtoQuery" })
	export class Query {
		@ApiProperty({ required: false, minimum: 0, description: "Minimum price filter" })
		@IsOptional()
		@IsNumber()
		@Min(0)
		min?: number;

		@ApiProperty({ required: false, minimum: 0, description: "Maximum price filter" })
		@IsOptional()
		@IsNumber()
		@Min(0)
		max?: number;
	}

	@ApiSchema({ name: "MinMaxRangeDtoResponse" })
	export class Response {
		@ApiProperty({ example: 100, minimum: 0, description: "Minimum price" })
		min: number;

		@ApiProperty({ example: 1000, minimum: 0, description: "Maximum price" })
		max: number;

		constructor(props: { min: number; max: number }) {
			this.min = props.min;
			this.max = props.max;
		}
	}
}
