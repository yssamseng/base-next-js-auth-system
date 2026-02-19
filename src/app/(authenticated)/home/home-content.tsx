"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { User, Shield, Key, ArrowRight } from "lucide-react";

const quickActions = [
    {
        title: "View Profile",
        description: "Check and update your personal information",
        icon: User,
        href: "/profile",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        title: "Security",
        description: "Manage your authentication and tokens",
        icon: Shield,
        href: "/profile",
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        title: "Change Password",
        description: "Update your account password",
        icon: Key,
        href: "/profile",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
];

export function HomeContent() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back! 👋
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Here&apos;s your dashboard overview. Manage your account and settings from here.
                </p>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map(({ title, description, icon: Icon, href, color, bgColor }) => (
                        <Link key={title} href={href}>
                            <Card className="group border-border/50 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full">
                                <CardHeader className="pb-3">
                                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${bgColor} ${color} transition-transform group-hover:scale-110`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-base flex items-center justify-between">
                                        {title}
                                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Info Card */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">About This App</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        This is a secure authentication system built with Next.js and integrated with a
                        real REST API. Your session is managed via JWT tokens (access + refresh) stored
                        securely in your browser.
                    </p>
                    <div className="mt-4">
                        <Link href="/profile">
                            <Button variant="outline" size="sm" className="gap-2">
                                <User className="h-4 w-4" />
                                Go to Profile
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
