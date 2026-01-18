"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email",
      });
      return;
    }

    if (password.length < 4) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 4 characters",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email && password.length >= 4) {
      dispatch(login({ email }));
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar items-center justify-center p-12">
        <div className="max-w-md text-center animate-fade-in">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-sidebar-primary shadow-medium">
            <Store className="h-10 w-10 text-sidebar-primary-foreground" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-sidebar-foreground">
            QuickPOS
          </h1>
          <p className="text-lg text-sidebar-foreground/70">
            Modern point of sale system for your business. Fast, reliable, and
            easy to use.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="rounded-xl bg-sidebar-accent p-4">
              <p className="text-2xl font-bold text-sidebar-foreground">50K+</p>
              <p className="text-xs text-sidebar-foreground/60">Transactions</p>
            </div>
            <div className="rounded-xl bg-sidebar-accent p-4">
              <p className="text-2xl font-bold text-sidebar-foreground">
                99.9%
              </p>
              <p className="text-xs text-sidebar-foreground/60">Uptime</p>
            </div>
            <div className="rounded-xl bg-sidebar-accent p-4">
              <p className="text-2xl font-bold text-sidebar-foreground">24/7</p>
              <p className="text-xs text-sidebar-foreground/60">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 lg:hidden text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">QuickPOS</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Demo: Use any email and password (min 4 chars)
          </p>
        </div>
      </div>
    </div>
  );
}
