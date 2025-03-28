import type { FC } from "react";
import { cn } from "@shared/utils";

type Props = {
  amount: number;
  className?: string;
};

const AmountInStock: FC<Props> = ({ amount, className, ...props }) => {
  return (
    <div className={cn(className)} {...props}>
      Осталось {amount} шт.
    </div>
  );
};

export default AmountInStock;
