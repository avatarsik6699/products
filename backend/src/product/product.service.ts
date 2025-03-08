import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FindAllProductDto } from "./dto/find-all-product.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

	async findAll(query: FindAllProductDto): Promise<[Product[], number]> {
		const { limit: take = 10, page = 1, sort, filter } = query;

		const skip = (page - 1) * take;

		const order = {};
		if (sort) {
			const [field, direction] = sort.split(":");

			order[field] = direction.toUpperCase();
		}

		const where = {};
		if (filter) {
			Object.keys(filter).forEach(key => {
				where[key] = filter[key];
			});
		}

		return this.productRepository.findAndCount({
			take,
			skip,
			order,
			where,
		});
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
