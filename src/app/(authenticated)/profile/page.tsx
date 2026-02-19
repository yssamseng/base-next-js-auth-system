import type { Metadata } from "next";
import { ProfileForm } from "@/features/user";

export const metadata: Metadata = {
    title: "Profile",
    description: "View and manage your profile",
};

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="mt-2 text-muted-foreground">
                    View and manage your account information
                </p>
            </div>

            <ProfileForm />
        </div>
    );
}
