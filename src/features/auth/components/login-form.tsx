"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useLogin } from "../hooks/use-login";

export function LoginForm() {
    const { form, isLoading, serverError, onSubmit } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Card className="border-border/50 shadow-xl shadow-black/5">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Sign In</CardTitle>
                    <CardDescription>
                        Enter your email and password below
                    </CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {serverError && (
                                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                    {serverError}
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    className="pl-10"
                                                    autoComplete="email"
                                                    autoFocus
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    className="pl-10 pr-10"
                                                    autoComplete="current-password"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                                size="lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            {/* Demo credentials hint */}
            <div className="mt-6 rounded-lg border border-border/50 bg-muted/50 p-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Demo Credentials
                </p>
                <div className="space-y-1 text-sm font-mono">
                    <p className="text-foreground">
                        <span className="text-muted-foreground">email:</span>{" "}
                        admin@example.com
                    </p>
                    <p className="text-foreground">
                        <span className="text-muted-foreground">pass:</span>{" "}
                        admin123
                    </p>
                </div>
            </div>
        </>
    );
}
