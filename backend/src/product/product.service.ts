import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { plainToInstance } from "class-transformer";
import { FindAllProductsDto } from "./dto/find-all-product.dto";

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

	async findAll(query: FindAllProductsDto.Query): Promise<FindAllProductsDto.Response> {
		const { limit = 10, page = 1, sort } = query;

		const order = {};
		if (sort) {
			sort.forEach(sortItem => {
				const [field, direction] = sortItem.split(":");

				order[field] = direction.toUpperCase();
			});
		}

		// TODO: need to add filters
		// const where = {};
		// if (filter) {
		// 	Object.keys(filter).forEach(key => {
		// 		where[key] = filter[key];
		// 	});
		// }

		const [items, totalItemsCount] = await this.productRepository.findAndCount({
			take: limit,
			skip: (page - 1) * limit,
			order,
			// where,
		});

		return new FindAllProductsDto.Response(items, { page, limit, totalItemsCount });
	}

	async findOne(id: number): Promise<Product> {
		const product = await this.productRepository.findOneBy({ id });

		if (!product) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}

		return product;
	}

	async create({ image, ...createProductDto }: CreateProductDto): Promise<Product> {
		const productToSave = Object.assign(new Product(), createProductDto);

		if (image) {
			productToSave.photoFileName = image.filename;
		}

		return this.productRepository.save(productToSave);
	}

	async update(id: number, { image, ...updateProductDto }: UpdateProductDto): Promise<Product> {
		const prouctDataToUpdate: Partial<Product> = updateProductDto;

		if (image) {
			prouctDataToUpdate.photoFileName = image.filename;
		}

		if (image === null) {
			prouctDataToUpdate.photoFileName = null;
		}

		if (Object.keys(prouctDataToUpdate).length === 0) {
			return this.findOne(id);
		}

		return this.productRepository
			.createQueryBuilder()
			.update(Product, prouctDataToUpdate)
			.where("id = :id", { id })
			.returning("*")
			.updateEntity(true)
			.execute()
			.then(({ raw: product }) => plainToInstance(Product, product));
	}

	async remove(id: number): Promise<Product> {
		return this.productRepository
			.createQueryBuilder()
			.delete()
			.where("id = :id", { id })
			.returning("*")
			.execute()
			.then(({ raw: product }) => plainToInstance(Product, product));
	}
}
