import { Text } from "@pec/shared";

export default function CommunityPage() {
  return (
    <div className="space-y-4">
      <div>
        <Text size="3xl" weight="bold">
          Community
        </Text>
        <Text variant="muted">
          Join discussions, ask questions, and share your knowledge
        </Text>
      </div>

      {/* 임시 컨텐츠 */}
      <div className="rounded-lg border bg-card p-4">
        <Text>Community content will go here</Text>
      </div>
    </div>
  );
}
