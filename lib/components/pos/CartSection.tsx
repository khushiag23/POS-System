"use client";

import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  updateQuantity,
  selectCartTotal,
} from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";

interface CartSectionProps {
  className?: string;
}

export function CartSection({ className }: CartSectionProps) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const { subtotal, tax, total } = useAppSelector(selectCartTotal);
  const router = useRouter();

  return (
    <Card className={cn("flex flex-col shadow-medium h-full", className)}>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Current Order
          {cart.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="p-4">
          {cart.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">
                Your cart is empty
              </p>
              <p className="text-xs text-muted-foreground">
                Click products to add them
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 animate-scale-in"
                >
                  <div className="text-2xl">{item.image}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          updateQuantity({
                            productId: item.id,
                            quantity: item.quantity - 1,
                          }),
                        );
                      }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          updateQuantity({
                            productId: item.id,
                            quantity: item.quantity + 1,
                          }),
                        );
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeFromCart(item.id));
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </ScrollArea>

      {/* Cart Footer */}
      <div className="border-t p-4 space-y-4 bg-background/50 backdrop-blur-sm">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
        <Button
          className="w-full"
          size="lg"
          disabled={cart.length === 0}
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
}
