import { cn } from "@shared/utils";
import type { FC } from "react";

type Props = {
  description: string;
  className?: string;
};

const Description: FC<Props> = ({ description, className, ...props }) => {
  return (
    <p
      title={description}
      className={cn(
        className,
        "text-sm text-muted-foreground truncate line-clamp-2",
      )}
      {...props}
    >
      {description}
    </p>
  );
};

export default Description;
