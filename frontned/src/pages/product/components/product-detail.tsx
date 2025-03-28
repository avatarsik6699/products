import placeholder from "@app/assets/placeholder-large.svg";
import { toEntity, useOneProduct } from "@entities/product/api/useOneProduct";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Image } from "@shared/ui/enhanced/image";
import { useParams } from "@tanstack/react-router";
import type { FC } from "react";

const ProductDetail: FC = () => {
  const { productId } = useParams({ strict: false });

  const $product = useOneProduct({
    variables: { productId: Number(productId) },
    select: toEntity,
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Изображение товара</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-[300px] h-[300px] w-full overflow-hidden rounded-md">
              <Image
                src={$product.data.photoFileName || placeholder}
                alt={$product.data.name}
                fill
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Категория</p>
                <p className="font-medium">{$product.data.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Цена</p>
                <p className="font-medium">{$product.data.price} ₽</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Статус</p>
                <Badge
                  variant={$product.data.inStock ? "default" : "destructive"}
                >
                  {$product.data.inStock ? "В наличии" : "Нет в наличии"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{$product.data.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
