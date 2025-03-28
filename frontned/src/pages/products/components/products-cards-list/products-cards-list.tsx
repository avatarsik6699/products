import { useProductList } from "@entities/product/api/useProductList";
import { ProductCard } from "@pages/products/components/products-cards-list/components/product-card";
import { Pagination } from "@features/pagination/pagination";
import { DEFAULT_LIMIT } from "@shared/constants";
import { ScrollArea } from "@shared/ui/scroll-area";
import { cn } from "@shared/utils";
import { keepPreviousData } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { FC } from "react";

type Props = {
  className?: string;
};

const ProductsCardsList: FC<Props> = ({ className, ...props }) => {
  const navigate = useNavigate();
  const { page, limit } = useSearch({ from: "/" });

  const $products = useProductList({
    variables: { page, limit },
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
    <div className={cn("space-y-8", className)} {...props}>
      <ScrollArea className="h-[65dvh] pr-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {$products.data.items.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </ScrollArea>

      <Pagination
        currentPage={$products.data.meta.page}
        totalPages={$products.data.meta.totalPagesCount}
        onPageChange={(page) =>
          navigate({
            to: "/",
            search: ({ limit = DEFAULT_LIMIT }) => ({ limit, page }),
          })
        }
      />
    </div>
  );
};

export default ProductsCardsList;
