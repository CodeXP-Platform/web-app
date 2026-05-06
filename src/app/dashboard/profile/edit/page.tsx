"use client";

import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { User02Icon, UserIcon } from "@hugeicons/core-free-icons";

export default function ProfileEditPage() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // Convert file to base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64String = reader.result as string;

                // Mock server action call:
                // In a real scenario, we'd send this to an API route that uses CloudinaryController
                // const res = await fetch('/api/upload-avatar', { method: 'POST', body: JSON.stringify({ image: base64String }) });
                // const { url } = await res.json();

                // For demonstration, we'll just set it locally to preview
                setAvatar(base64String);
                setIsUploading(false);
            };
        } catch (error) {
            console.error("Upload failed", error);
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                    Edit Profile
                </h1>
                <p className="text-zinc-400 text-sm">
                    Update your personal information and avatar.
                </p>
            </div>

            <Card className="bg-[#121214] border-white/5">
                <CardHeader>
                    <CardTitle className="text-xl text-white">
                        Public Profile
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        This information will be displayed publicly on your
                        operator card.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center shrink-0">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="Avatar preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <HugeiconsIcon icon={UserIcon} size={36} />
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="avatar-upload"
                                className="cursor-pointer"
                            >
                                <div className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center">
                                    {isUploading
                                        ? "Uploading..."
                                        : "Change Avatar"}
                                </div>
                                <Input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    disabled={isUploading}
                                />
                            </label>
                            <p className="text-xs text-zinc-500 mt-2">
                                JPG, GIF or PNG. Max size of 5MB.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="fullName"
                                className="text-sm font-medium text-zinc-300"
                            >
                                Full Name
                            </label>
                            <Input
                                id="fullName"
                                defaultValue="Alex Developer"
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium text-zinc-300"
                            >
                                Username
                            </label>
                            <Input
                                id="username"
                                defaultValue="alex_dev"
                                className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t border-white/5 pt-6 flex justify-end gap-4">
                    <Button
                        variant="outline"
                        className="bg-transparent border-white/10 text-white hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium">
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
