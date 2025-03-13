import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

interface ProductDetailsCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    discount?: number;
    photoFileName?: string | null;
    sku: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
  const finalPrice = product.discount
    ? product.price - product.discount
    : product.price;

  return (
    <Card className="min-w-[350px] max-w-[600px]">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
        <div className="space-y-2">
          <p>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(product.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(product.updatedAt).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
