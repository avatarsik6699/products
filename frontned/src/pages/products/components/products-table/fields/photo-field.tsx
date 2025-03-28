import type { ProductTypes } from "@entities/product/product.types";
import { Image } from "@shared/ui/enhanced/image";
import type { FC } from "react";
import placeholder from "@app/assets/placeholder-small.png";

export type Props = Pick<ProductTypes.Entity, "photoFileName" | "name">;

const PhotoField: FC<Props> = (props) => {
  return (
    <div className="w-16 h-16 rounded-md overflow-hidden">
      <Image
        fill={false}
        src={props.photoFileName}
        alt={props.name}
        fallbackSrc={placeholder}
      />
    </div>
  );
};

export type { Props as PhotoFieldProps };
export default PhotoField;
