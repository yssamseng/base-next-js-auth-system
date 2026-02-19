"use client";

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
import { Loader2, Save, User, Mail, Shield, Calendar } from "lucide-react";
import { useProfile } from "../hooks/use-profile";

export function ProfileForm() {
    const {
        profile,
        isLoadingProfile,
        form,
        isSubmitting,
        serverError,
        successMessage,
        onSubmit,
    } = useProfile();

    if (isLoadingProfile) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Profile Info Card */}
            <Card className="border-border/50 shadow-xl shadow-black/5">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Information
                    </CardTitle>
                    <CardDescription>
                        Your account details and profile settings
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Read-only info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5" />
                                Email
                            </label>
                            <p className="rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                                {profile?.email ?? "—"}
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5" />
                                Username
                            </label>
                            <p className="rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                                {profile?.username ?? "—"}
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <Shield className="h-3.5 w-3.5" />
                                Status
                            </label>
                            <p className="rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                                <span
                                    className={`inline-flex items-center gap-1.5 ${profile?.isActive ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${profile?.isActive ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    />
                                    {profile?.isActive ? "Active" : "Inactive"}
                                </span>
                            </p>
                        </div>

                        {profile?.createdAt && (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Member Since
                                </label>
                                <p className="rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                                    {new Date(profile.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Editable Profile Card */}
            <Card className="border-border/50 shadow-xl shadow-black/5">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Edit Profile</CardTitle>
                    <CardDescription>
                        Update your personal information
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

                            {successMessage && (
                                <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                                    {successMessage}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    autoComplete="given-name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    autoComplete="family-name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
