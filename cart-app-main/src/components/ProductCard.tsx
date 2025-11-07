import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)]">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
