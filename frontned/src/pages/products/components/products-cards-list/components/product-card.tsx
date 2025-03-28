import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Image } from "@shared/ui/enhanced/image";
import { useNavigate } from "@tanstack/react-router";
import type { ProductTypes } from "@entities/product/product.types";
import type { FC } from "react";
import PriceField from "./price-field";
import AmountInStock from "./amount-in-stock";
import Description from "./description";

type Props = ProductTypes.Entity;

export const ProductCard: FC<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200 border"
      onClick={() => {
        navigate({
          to: "/update-product/$productId",
          params: { productId: String(props.id) },
        });
      }}
    >
      <CardHeader className="h-40">
        <Image
          src={props.photoFileName}
          alt={props.name}
          className="w-full h-full rounded-md object-cover"
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <PriceField price={props.price} discount={props.discount} />
        <AmountInStock amount={588} />
        <CardTitle>{props.name}</CardTitle>
        <Description description={props.description} />
      </CardContent>
    </Card>
  );
};
