"use client";

import { getSupabaseClient } from "@pec/supabase";
import { Button, Text } from "@pec/ui";
import { v4 as uuidv4 } from "uuid";

export default function CommunityPage() {
  const handleCreateTestPost = async () => {
    const supabase = getSupabaseClient();

    // 먼저 현재 로그인한 사용자 정보를 가져옵니다
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const testPost = {
      id: uuidv4(),
      type: "post",
      title: "Test Post " + new Date().toLocaleString(),
      content:
        "This is a test post content created at " + new Date().toLocaleString(),
      author_id: user?.id, // 실제 로그인한 사용자의 ID 사용
      community_id: uuidv4(), // 실제로는 존재하는 커뮤니티 ID를 사용해야 합니다
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      views_count: 0,
      thumbnail_url: null,
      category: "test",
    };

    const { data, error } = await supabase
      .from("posts")
      .insert(testPost)
      .select()
      .single();

    if (error) {
      console.error("Error creating test post:", error);
      alert("Error creating test post: " + error.message);
    } else {
      console.log("Test post created:", data);
      alert("Test post created successfully!");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Text size="3xl" weight="bold">
          P.E.C
        </Text>
        <Text size="lg" className="mt-1 text-muted-foreground">
          다른 동료들과 자유롭게 생각을 나누어보세요.
        </Text>
      </div>
      <div className="rounded-lg border bg-card p-4">
        <Text>커뮤니티 내용이 여기에 들어갈 예정입니다.</Text>
      </div>
      <Button onClick={handleCreateTestPost}>테스트 게시글 작성하기</Button>
    </div>
  );
}
