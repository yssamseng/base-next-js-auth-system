"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authService } from "@/features/auth/services/auth.service";
import {
    Home,
    User,
    LogOut,
    Loader2,
    Menu,
    X,
    Shield,
} from "lucide-react";

const navLinks = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/profile", label: "Profile", icon: User },
];

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authService.logout();
        } catch {
            // Clear tokens even if the API call fails
        } finally {
            router.push("/login");
            router.refresh();
        }
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/home" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                            <Shield className="h-4 w-4" />
                        </div>
                        <span className="text-lg font-bold tracking-tight hidden sm:block">
                            AuthApp
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden sm:flex items-center gap-1">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link key={href} href={href}>
                                <Button
                                    variant={pathname === href ? "secondary" : "ghost"}
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Button>
                            </Link>
                        ))}

                        <div className="ml-2 h-6 w-px bg-border" />

                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-muted-foreground hover:text-destructive"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <LogOut className="h-4 w-4" />
                            )}
                            Logout
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="sm:hidden p-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden border-t border-border/50 py-3 space-y-1">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button
                                    variant={pathname === href ? "secondary" : "ghost"}
                                    size="sm"
                                    className="w-full justify-start gap-2"
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Button>
                            </Link>
                        ))}

                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <LogOut className="h-4 w-4" />
                            )}
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
