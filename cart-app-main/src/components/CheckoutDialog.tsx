import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckoutFormData, Order } from "@/types/product";
import { toast } from "sonner";
import { OrderReceipt } from "./OrderReceipt";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: totalPrice,
      customerName: formData.name,
      customerEmail: formData.email,
      timestamp: new Date().toISOString(),
    };

    setOrder(newOrder);
    clearCart();
    onOpenChange(false);
    setShowReceipt(true);
    toast.success("Order placed successfully!");
    
    setFormData({ name: "", email: "" });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Order Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Place Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {order && (
        <OrderReceipt
          order={order}
          open={showReceipt}
          onOpenChange={setShowReceipt}
        />
      )}
    </>
  );
}
