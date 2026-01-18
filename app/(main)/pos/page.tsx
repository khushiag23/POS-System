"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, selectCartTotal } from "@/store/slices/cartSlice";
import { products, categories } from "@/data/products";
import { cn } from "@/utils";
import { CartSection } from "@/components/pos/CartSection";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function POSBilling() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const { subtotal, tax, total } = useAppSelector(selectCartTotal);

  const router = useRouter();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3rem)] gap-4 lg:gap-6 animate-fade-in">
      {/* Products Section */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Search & Filters */}
        <div className="mb-4 lg:mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "transition-all",
                    selectedCategory === category && "shadow-soft",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Products Grid */}
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-24 lg:pb-4">
            {filteredProducts.map((product) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <Card
                  key={product.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-medium hover:border-primary/50",
                    cartItem && "border-primary ring-1 ring-primary/20",
                  )}
                  onClick={() => dispatch(addToCart(product))}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="mb-2 md:mb-3 text-3xl md:text-4xl text-center">
                      {product.image}
                    </div>
                    <h3 className="font-medium text-xs md:text-sm truncate">
                      {product.name}
                    </h3>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-base md:text-lg font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                      {cartItem && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary px-1.5 py-0 md:px-2 md:py-0.5"
                        >
                          {cartItem.quantity}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Desktop Cart Section */}
      <div className="hidden lg:block w-96 h-full">
        <CartSection />
      </div>

      {/* Mobile Cart Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t lg:hidden z-10">
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="w-full flex justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{cart.length} items</span>
              </div>
              <span className="font-bold">${total.toFixed(2)}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-xl">
            <SheetHeader className="sr-only">
              <SheetTitle>Shopping Cart</SheetTitle>
              <SheetDescription>
                Review and modify your selected items
              </SheetDescription>
            </SheetHeader>
            <div className="h-full pt-4">
              <CartSection className="border-none shadow-none h-full" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
