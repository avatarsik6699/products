import { cn } from "@shared/utils";
import type { ProductTypes } from "@entities/product/product.types";
import type { FC, JSX } from "react";

type Props = Pick<ProductTypes.Entity, "price" | "discount"> & {
  className?: string;
};

const PriceField: FC<Props> = ({ className, ...props }) => {
  let Price: JSX.Element;

  if (!props.discount) {
    Price = (
      <span className="font-bold text-2xl">
        {props.price}
        <span className="text-base">₽</span>
      </span>
    );
  } else {
    const calculatedPrice = props.price * ((100 - props.discount) / 100);

    const priceWithDiscount = Number.isInteger(calculatedPrice * 100)
      ? calculatedPrice.toString()
      : calculatedPrice.toFixed(2);

    Price = (
      <>
        <span className="font-bold text-2xl text-red-400">
          {priceWithDiscount}
          <span className="text-base">₽</span>
        </span>
        <div className="flex gap-1 items-end">
          <span className="font-bold text-sm text-neutral-400 line-through">
            {props.price}
            <span className="text-base">₽</span>
          </span>
          <span className="font-bold text-sm text-red-400">
            -{props.discount}
            <span className="text-base">%</span>
          </span>
        </div>
      </>
    );
  }

  return (
    <div className={cn("flex items-end gap-2", className)} {...props}>
      {Price}
    </div>
  );
};

export default PriceField;
