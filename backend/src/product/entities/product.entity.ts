import slugify from "slugify";
import { ApiProperty } from "@nestjs/swagger";

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	BeforeInsert,
} from "typeorm";

@Entity({ name: "products" })
export class Product {
	@ApiProperty({ example: 1, description: "Unique identifier of the product" })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: "Product Name", description: "Name of the product", maxLength: 255 })
	@Column({ type: "varchar", length: 255 })
	name: string;

	@Column({ type: "varchar", unique: true, length: 100 })
	slug: string;

	@ApiProperty({ example: "Description of the product", description: "Description of the product" })
	@Column({ type: "text" })
	description: string;

	@ApiProperty({ example: 100.0, description: "Price of the product", default: 0, minimum: 0 })
	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		transformer: {
			from: (value: string) => parseFloat(value),
			to: (value: number) => value.toString(),
		},
	})
	price: number;

	@ApiProperty({
		example: 90.0,
		description: "Discounted for price of the product",
		default: 0,
		minimum: 0,
	})
	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		transformer: {
			from: (value: string) => parseFloat(value),
			to: (value: number) => value.toString(),
		},
	})
	discount: number;

	@ApiProperty({ example: "12345", description: "SKU of the product", maxLength: 100 })
	@Column({ type: "varchar", length: 100 })
	sku: string;

	@ApiProperty({
		example: "http://example.com/photo.jpg",
		description: "URL of the product photo",
		type: String,
		nullable: true,
	})
	@Column({
		type: "varchar",
		length: 255,
		nullable: true,
		transformer: {
			from: (fileName: string | null) => {
				if (!fileName) return null;

				return `/products/photos/${fileName}`;
			},
			to: (fileName: string | null) => fileName,
		},
	})
	photoFileName: string | null;

	@ApiProperty({ description: "Update product date", example: "2023-10-01T12:00:00Z" })
	@UpdateDateColumn()
	updatedAt: Date;

	@ApiProperty({ description: "Create product date", example: "2023-10-01T12:00:00Z" })
	@CreateDateColumn()
	createdAt: Date;

	@BeforeInsert()
	setSlug() {
		this.slug = `${slugify(this.name, { lower: true })}-${Math.trunc(Math.random() * Math.pow(36, 6)).toString(32)}`;
	}
}
