"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Calendar,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";

export default function OrderDetails() {
  const params = useParams();
  const router = useRouter();

  const orderId = params.orderId as string;
  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === orderId),
  );

  useEffect(() => {
    if (!order) {
      router.replace("/history");
    }
  }, [order, router]);

  if (!order) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <Link href="/history">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to History
        </Button>
      </Link>

      <div className="space-y-6">
        {/* Order Header */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <h1 className="text-2xl font-bold font-mono">{order.id}</h1>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={
                    order.paymentMethod === "cash"
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-primary/30 bg-primary/10 text-primary"
                  }
                >
                  <span className="flex items-center gap-1">
                    {order.paymentMethod === "cash" ? (
                      <Banknote className="h-3 w-3" />
                    ) : (
                      <CreditCard className="h-3 w-3" />
                    )}
                    {order.paymentMethod.charAt(0).toUpperCase() +
                      order.paymentMethod.slice(1)}
                  </span>
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {" at "}
                  {new Date(order.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Items Purchased
              <Badge variant="secondary" className="ml-2">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                items
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
                      {item.image}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Order Totals */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/pos" className="flex-1">
            <Button variant="outline" className="w-full">
              New Sale
            </Button>
          </Link>
          <Link href="/history" className="flex-1">
            <Button className="w-full">View All Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
