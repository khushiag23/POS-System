"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Banknote,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createOrder } from "@/store/slices/orderSlice";
import { selectCartTotal } from "@/store/slices/cartSlice";
import { cn } from "@/utils";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ id: string } | null>(
    null,
  );

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const { subtotal, tax, total } = useAppSelector(selectCartTotal);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      router.replace("/pos");
    }
  }, [cart.length, orderComplete, router]);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a payment method",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const order = dispatch(createOrder(paymentMethod));
    setCompletedOrder(order);
    setOrderComplete(true);
    setIsProcessing(false);
    toast({
      title: "Success",
      description: "Payment successful!",
    });
  };

  if (orderComplete && completedOrder) {
    return (
      <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center animate-fade-in">
        <Card className="w-full max-w-md text-center shadow-medium">
          <CardContent className="pt-8 pb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Order Complete!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase
            </p>
            <div className="mt-6 rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-bold">{completedOrder.id}</p>
            </div>
            <div className="mt-8 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push(`/order/${completedOrder.id}`)}
              >
                View Details
              </Button>
              <Button className="flex-1" onClick={() => router.push("/pos")}>
                New Sale
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => router.push("/pos")}
      >
        <ArrowLeft className="h-4 w-4" /> Back to POS
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.image}</span>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <button
              className={cn(
                "w-full flex items-center gap-4 rounded-lg border-2 p-4 transition-all",
                paymentMethod === "cash"
                  ? "border-success bg-success/5"
                  : "border-border hover:border-muted-foreground/30",
              )}
              onClick={() => setPaymentMethod("cash")}
            >
              <div
                className={cn(
                  "rounded-lg p-3",
                  paymentMethod === "cash" ? "bg-success/10" : "bg-muted",
                )}
              >
                <Banknote
                  className={cn(
                    "h-6 w-6",
                    paymentMethod === "cash"
                      ? "text-success"
                      : "text-muted-foreground",
                  )}
                />
              </div>
              <div className="text-left">
                <p className="font-medium">Cash</p>
                <p className="text-sm text-muted-foreground">Pay with cash</p>
              </div>
              {paymentMethod === "cash" && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-success" />
              )}
            </button>

            <button
              className={cn(
                "w-full flex items-center gap-4 rounded-lg border-2 p-4 transition-all",
                paymentMethod === "card"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30",
              )}
              onClick={() => setPaymentMethod("card")}
            >
              <div
                className={cn(
                  "rounded-lg p-3",
                  paymentMethod === "card" ? "bg-primary/10" : "bg-muted",
                )}
              >
                <CreditCard
                  className={cn(
                    "h-6 w-6",
                    paymentMethod === "card"
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                />
              </div>
              <div className="text-left">
                <p className="font-medium">Card</p>
                <p className="text-sm text-muted-foreground">
                  Credit or debit card
                </p>
              </div>
              {paymentMethod === "card" && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
              )}
            </button>

            <Button
              className="w-full mt-6"
              size="lg"
              disabled={!paymentMethod || isProcessing}
              onClick={handleCheckout}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </span>
              ) : (
                `Pay $${total.toFixed(2)}`
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
