import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Order } from "@/types/product";
import { CheckCircle } from "lucide-react";

interface OrderReceiptProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderReceipt({ order, open, onOpenChange }: OrderReceiptProps) {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-2 py-4">
            <CheckCircle className="h-16 w-16 text-primary" />
            <DialogTitle className="text-2xl">Order Confirmed!</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span>{formatDate(order.timestamp)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Customer</span>
              <span>{order.customerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email</span>
              <span>{order.customerEmail}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Order Items</h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm p-3 rounded-lg bg-muted"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-primary/10 p-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            A confirmation email has been sent to {order.customerEmail}
          </p>

          <Button onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
