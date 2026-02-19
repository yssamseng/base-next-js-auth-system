import type { Metadata } from "next";
import { UserPlus } from "lucide-react";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create a new account to get started",
};

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4 py-12">
            {/* Decorative background elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo / Brand area */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                        <UserPlus className="h-7 w-7" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Join us and get started in seconds
                    </p>
                </div>

                <RegisterForm />
            </div>
        </div>
    );
}
