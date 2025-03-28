import { cn } from "@shared/utils";
import type { FC } from "react";

type Props = {
  className?: string;
};

const ProductsFilters: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn("bg-white rounded-lg p-4", className)} {...props}>
      <h2 className="text-lg font-bold">Фильтры</h2>
    </div>
  );
};

export default ProductsFilters;
