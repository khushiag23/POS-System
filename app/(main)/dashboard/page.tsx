"use client";

import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

export default function Dashboard() {
  const orders = useAppSelector((state) => state.orders.orders);
  const user = useAppSelector((state) => state.auth.user);

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  const cashOrders = orders.filter((o) => o.paymentMethod === "cash").length;
  const cardOrders = orders.filter((o) => o.paymentMethod === "card").length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
        <Link href="/pos">
          <Button size="lg" className="w-full md:w-auto gap-2">
            New Sale <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales
            </CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              All time revenue
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <div className="rounded-lg bg-accent/10 p-2">
              <ShoppingBag className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOrders}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Completed transactions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Order
            </CardTitle>
            <div className="rounded-lg bg-success/10 p-2">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${avgOrderValue.toFixed(2)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Per transaction
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payment Split
            </CardTitle>
            <div className="flex gap-1">
              <div className="rounded-lg bg-primary/10 p-2">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Banknote className="h-4 w-4 text-success" />
                <span className="text-lg font-semibold">{cashOrders}</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="text-lg font-semibold">{cardOrders}</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Cash vs Card payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/pos" className="block">
              <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary hover:bg-primary/5">
                <div className="rounded-lg bg-primary/10 p-3">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Start New Sale</p>
                  <p className="text-sm text-muted-foreground">
                    Create a new transaction
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
            <Link href="/history" className="block">
              <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:border-accent hover:bg-accent/5">
                <div className="rounded-lg bg-accent/10 p-3">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">View Sales History</p>
                  <p className="text-sm text-muted-foreground">
                    Review past transactions
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/history">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No orders yet. Start selling!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/order/${order.id}`}
                    className="flex items-center justify-between rounded-lg border border-border p-3 transition-all hover:border-primary/50 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-2">
                        {order.paymentMethod === "cash" ? (
                          <Banknote className="h-4 w-4 text-success" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
