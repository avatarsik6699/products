import type { FC } from "react";
import { useState } from "react";
import { useProductList } from "@entities/product/api/useProductList";
import { ProductCard } from "@entities/product/ui/product-card";
import { Pagination } from "@features/pagination/pagination";
import { ScrollArea } from "@shared/ui/scroll-area";
import { keepPreviousData } from "@tanstack/react-query";

const ProductList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const $products = useProductList({
    variables: { page: currentPage, limit },
    placeholderData: keepPreviousData,
    select: (data) => {
      return {
        items: data.pages.flatMap((item) => item.data),
        meta: data.pages[0].meta,
      };
    },
  });

  if (!$products.isSuccess) return null;

  return (
    <div className="space-y-8">
      <ScrollArea className="h-[65dvh] pr-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {$products.data.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollArea>

      <Pagination
        currentPage={$products.data.meta.page}
        totalPages={$products.data.meta.totalPagesCount}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductList;
