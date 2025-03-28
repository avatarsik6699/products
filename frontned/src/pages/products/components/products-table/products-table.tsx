import { useProductList } from "@entities/product/api/useProductList";
import { useRemoveProduct } from "@entities/product/api/useRemoveProduct";
import type { ProductTypes } from "@entities/product/product.types";
import { DEFAULT_LIMIT } from "@shared/constants";
import { Badge } from "@shared/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table";
import { keepPreviousData } from "@tanstack/react-query";
import type { FC } from "react";
import { useState } from "react";
import { toast } from "sonner";
import PhotoField from "./fields/photo-field";
import { ProductActionsMenu } from "./fields/product-actions-menu";
import { PaginationWithEllipsis } from "@shared/ui/enhanced/pagination-with-ellipsis";
import { ScrollArea } from "@shared/ui/scroll-area";
import { toEntity } from "@entities/product/api/useOneProduct";

export const ProductsTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const $remove = useRemoveProduct({
    onSuccess: () => {
      toast.success("Товар удален");
    },
  });

  const $products = useProductList({
    variables: {
      page: currentPage,
      limit: DEFAULT_LIMIT,
      filters: { price: { min: 111, max: 999 } },
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      return {
        meta: data.pages[0].meta,
        items: data.pages
          .flatMap((item) => item.data)
          .map<ProductTypes.Entity>(toEntity),
      };
    },
  });

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.60))]">
      <section className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <Table>
            <TableHeader
              className="
              sticky top-0 bg-background z-10

              after:absolute
              after:left-0
              after:right-0
              after:bottom-0
              after:h-px
              after:bg-border"
            >
              <TableRow>
                <TableHead className="w-[80px]">Фото</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {$products.data?.items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <PhotoField
                      photoFileName={product.photoFileName}
                      name={product.name}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price} ₽</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.inStock ? "default" : "destructive"}
                    >
                      {product.inStock ? "В наличии" : "Нет в наличии"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <ProductActionsMenu
                      productId={product.id}
                      onDelete={() => $remove.mutate({ productId: product.id })}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </section>

      <div className="p-4 border-t">
        <PaginationWithEllipsis
          currentPage={currentPage}
          totalPages={$products.data?.meta.totalPagesCount ?? 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
