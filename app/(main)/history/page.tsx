"use client";

import Link from "next/link";
import {
  History,
  CreditCard,
  Banknote,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";

export default function SalesHistory() {
  const orders = useAppSelector((state) => state.orders.orders);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales History</h1>
        <p className="mt-1 text-muted-foreground">
          View all completed transactions
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            All Orders
            <Badge variant="secondary" className="ml-2">
              {orders.length} total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                No orders yet
              </p>
              <p className="text-sm text-muted-foreground">
                Complete a sale to see it here
              </p>
              <Link href="/pos">
                <button className="mt-4 text-sm font-medium text-primary hover:underline">
                  Start a new sale →
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order, index) => (
                <Link
                  key={order.id}
                  href={`/order/${order.id}`}
                  className="block animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-soft">
                    <div className="rounded-lg bg-muted p-3">
                      {order.paymentMethod === "cash" ? (
                        <Banknote className="h-5 w-5 text-success" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-medium">{order.id}</p>
                        <Badge
                          variant="outline"
                          className={
                            order.paymentMethod === "cash"
                              ? "border-success/30 text-success"
                              : "border-primary/30 text-primary"
                          }
                        >
                          {order.paymentMethod}
                        </Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>
                          {new Date(order.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(order.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span>•</span>
                        <span>{order.items.length} items</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-bold">
                        ${order.total.toFixed(2)}
                      </p>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
