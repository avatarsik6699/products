import type { ProductTypes } from "@entities/product/product.types";
import { Button } from "@shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";

export type Props = {
  productId: ProductTypes.Entity["id"];
  onDelete: (id: ProductTypes.Entity["id"]) => void;
};

export const ProductActionsMenu = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <Link to="/$productId" params={{ productId: String(props.productId) }}>
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            Просмотр
          </DropdownMenuItem>
        </Link>

        <Link
          to={"/update-product/$productId"}
          params={{ productId: String(props.productId) }}
        >
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Редактировать
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem onClick={() => props.onDelete(props.productId)}>
          <Trash className="mr-2 h-4 w-4" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export type { Props as ProductActionsMenuProps };
export default ProductActionsMenu;
