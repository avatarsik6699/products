/**
 * Generated by orval v7.6.0 🍺
 * Do not edit manually.
 * Документация
 * Документация к запросам
 * OpenAPI spec version: 1.0
 */
import type { UpdateProductDtoName } from "./update-product-dto-name";
import type { UpdateProductDtoDescription } from "./update-product-dto-description";
import type { UpdateProductDtoPrice } from "./update-product-dto-price";
import type { UpdateProductDtoDiscount } from "./update-product-dto-discount";
import type { UpdateProductDtoSku } from "./update-product-dto-sku";

export interface UpdateProductDto {
  /**
   * Name of the product
   * @maxLength 255
   */
  name?: UpdateProductDtoName;
  /** Description of the product */
  description?: UpdateProductDtoDescription;
  /**
   * Price of the product
   * @minimum 0
   */
  price?: UpdateProductDtoPrice;
  /**
   * Discounted price of the product
   * @minimum 0
   */
  discount?: UpdateProductDtoDiscount;
  /**
   * SKU of the product
   * @maxLength 100
   */
  sku?: UpdateProductDtoSku;
  image?: Blob;
}
