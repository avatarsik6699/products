import { useRouter } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    photoFileName?: string | null;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const finalPrice = product.discount
    ? product.price - product.discount
    : product.price;

  const handleClick = () => {
    router.navigate({
      to: "/update-product/$productId",
      params: { productId: String(product.id) },
    });
  };

  return (
    <Card className="w-full max-w-[300px] cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {product.photoFileName && (
          <img
            src={product.photoFileName}
            alt={product.name}
            width={300}
            height={200}
            className="rounded-md object-cover"
          />
        )}
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">${finalPrice}</span>
          {product.discount && (
            <span className="text-red-500 line-through">${product.price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
