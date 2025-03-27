import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { And, Between, Equal, FindOptionsWhere, IsNull, Like, Not, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindAllProductsDto } from "./dto/find-all-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductFiltersDto } from "./entities/filters/dtos/product-filters.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

	async findAll(
		query: Omit<FindAllProductsDto.Query, "getOffset"> & {
			filters: ProductFiltersDto.Filters;
		}
	): Promise<FindAllProductsDto.Response> {
		const { limit = 10, page = 1, sort, filters } = query;

		const order = {};
		if (sort) {
			sort.forEach(sortItem => {
				const [field, direction] = sortItem.split(":");

				order[field] = direction.toUpperCase();
			});
		}

		const where: FindOptionsWhere<Product> = {};

		if (filters.price && filters.price?.max) {
			where.price = Between(filters.price.min ?? 0, filters.price.max);
		}

		if (filters.onlyWithPhoto) {
			where.photoFileName = Not(IsNull());
		}

		if (filters.onlyWithDiscount) {
			where.discount = And(Not(IsNull()), Not(Equal(0)));
		}

		if (filters.onlyWithMaxDiscount) {
			const maxDiscount = await this.productRepository
				.createQueryBuilder("product")
				.select("MAX(discount)", "maxDiscount")
				.where("discount IS NOT NULL")
				.andWhere("discount != 0")
				.getRawOne()
				.then(({ maxDiscount }: { maxDiscount: number }) => maxDiscount);

			where.discount = Equal(maxDiscount);
		}

		if (filters.search) {
			// TODO: unsafe variant, should be replaced with ILIKE or query builder
			where.name = Like(`%${filters.search}%`);
		}

		const [items, totalItemsCount] = await this.productRepository.findAndCount({
			take: limit,
			skip: (page - 1) * limit,
			order,
			where,
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
