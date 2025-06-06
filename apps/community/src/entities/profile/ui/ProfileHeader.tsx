"use client";

import { Button, Card, CardContent } from "@packages/ui";
import { Edit2, TreePine } from "lucide-react";
import { useState } from "react";

import { Avatar } from "@/shared/components/avatar";

import type { Profile } from "../model";

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <Avatar
            src={profile.avatar_url}
            alt={profile.username}
            size={120}
            className="shadow-lg"
          />

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              {isEditing ? (
                // TODO: features/profile 에 닉네임 수정 폼 추가
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.username}
                </h1>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.username}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="ml-2"
                  >
                    <Edit2 size={16} />
                  </Button>
                </>
              )}
            </div>

            <p className="text-gray-600">{profile.email}</p>

            <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
              <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
                <TreePine className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-green-700">
                  {profile.points.toLocaleString()} 포인트
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
