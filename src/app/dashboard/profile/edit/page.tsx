"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { UserIcon } from "@hugeicons/core-free-icons";
import { IamController } from "@/services/iam/controller";
import useAuth from "@/hooks/use-auth";
import { paths } from "@/lib/paths";

export default function ProfileEditPage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const setUser = useAuth((s) => s.setUser);

  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.picture ?? null);
  const [pictureUrl, setPictureUrl] = useState(user?.picture ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const res = await fetch("/api/upload-avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json();
        setAvatarPreview(url);
        setPictureUrl(url);
      } catch {
        setError("Avatar upload failed. You can paste a URL below instead.");
        setAvatarPreview(base64);
      } finally {
        setIsUploading(false);
      }
    };
  };

  const handleSave = async () => {
    if (nickname.length < 3 || nickname.length > 20) {
      setError("Nickname must be between 3 and 20 characters.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const updated = await IamController.updateMyProfile({
        nickname,
        picture: pictureUrl || undefined,
      });
      setUser(updated);
      router.push(paths.dashboard.profile);
    } catch {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Edit Profile</h1>
        <p className="text-zinc-400 text-sm">Update your nickname and avatar.</p>
      </div>

      <Card className="bg-[#121214] border-white/5">
        <CardHeader>
          <CardTitle className="text-xl text-white">Public Profile</CardTitle>
          <CardDescription className="text-zinc-400">
            This information will be displayed publicly on your operator card.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <HugeiconsIcon icon={UserIcon} size={36} />
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  {isUploading ? "Uploading…" : "Change Avatar"}
                </div>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
              </label>
              <p className="text-xs text-zinc-500">JPG, GIF or PNG. Max 5 MB.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="picture-url" className="text-sm font-medium text-zinc-300">
              Avatar URL
            </label>
            <Input
              id="picture-url"
              placeholder="https://..."
              value={pictureUrl}
              onChange={(e) => {
                setPictureUrl(e.target.value);
                setAvatarPreview(e.target.value || null);
              }}
              className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="nickname" className="text-sm font-medium text-zinc-300">
              Nickname <span className="text-zinc-600 text-xs">(3–20 characters)</span>
            </label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={20}
              className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </CardContent>
        <CardFooter className="border-t border-white/5 pt-6 flex justify-end gap-4">
          <Button
            variant="outline"
            className="bg-transparent border-white/10 text-white hover:bg-white/5"
            onClick={() => router.push(paths.dashboard.profile)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium"
            onClick={handleSave}
            disabled={saving || isUploading}
          >
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
