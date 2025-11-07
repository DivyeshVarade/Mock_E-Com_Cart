import { mockProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CartSheet } from "@/components/CartSheet";
import { Store } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Vibe Commerce</h1>
          </div>
          <CartSheet />
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">
            Discover our curated collection of premium items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Vibe Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
