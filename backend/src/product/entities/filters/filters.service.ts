import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../product.entity";
import { MinMaxRangeDto } from "./dtos/min-max-range.dto";

@Injectable()
export class FiltersService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

	async getMinMaxRangePrice(): Promise<MinMaxRangeDto.Response> {
		const sql = this.productRepository
			.createQueryBuilder("product")
			.select("MIN(price)", "min")
			.addSelect("MAX(price)", "max")
			.getRawOne()
			.then((result: { min: string; max: string }) => {
				return new MinMaxRangeDto.Response({
					min: parseInt(result.min),
					max: parseInt(result.max),
				});
			});

		return await sql;
	}
}
