
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const avatarChoices = [
  "/avatars/avatar-default.png",
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
  "/avatars/avatar-5.png",
];

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileEditDialog({ open, onOpenChange }: ProfileEditDialogProps) {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || avatarChoices[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // If the avatar is a local file, it should be uploaded, here it's assumed as a URL for now
    await updateProfile({ username, bio, avatar });
    setIsSaving(false);
    onOpenChange(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
      // TODO: Upload to storage and get a permanent URL if implementing storage uploads
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Customize your avatar, username and bio.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatar} alt="profile avatar" />
          </Avatar>
          <div className="flex gap-2 flex-wrap justify-center">
            {avatarChoices.map(src => (
              <button
                key={src}
                className={`border-2 rounded-full w-12 h-12 ${avatar === src ? 'border-primary' : 'border-muted'}`}
                type="button"
                onClick={() => setAvatar(src)}
                aria-label="Choose avatar"
              >
                <img src={src} alt="" className="w-full h-full rounded-full object-cover" />
              </button>
            ))}
            <button
              className="w-12 h-12 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-full p-1"
              onClick={() => fileInputRef.current?.click()}
              type="button"
              aria-label="Upload avatar"
            >
              <span className="text-xs">Upload</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </button>
          </div>
          <input
            className="input border rounded px-3 py-1 w-full"
            type="text"
            value={username}
            maxLength={20}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            aria-label="Username"
          />
          <textarea
            className="border rounded p-2 w-full min-h-[60px] resize-none"
            value={bio}
            maxLength={100}
            onChange={e => setBio(e.target.value)}
            placeholder="Bio"
            aria-label="Bio"
          />
        </div>
        <DialogFooter>
          <Button disabled={isSaving} onClick={handleSave} className="w-full">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
