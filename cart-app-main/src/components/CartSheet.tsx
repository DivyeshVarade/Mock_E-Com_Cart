import { useCart } from "@/contexts/CartContext";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { CheckoutDialog } from "./CheckoutDialog";

export function CartSheet() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add some products to get started!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border bg-card"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  setIsOpen(false);
                  setShowCheckout(true);
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog
        open={showCheckout}
        onOpenChange={setShowCheckout}
      />
    </>
  );
}
