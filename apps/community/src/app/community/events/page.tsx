"use client";

import { Button, Text } from "@pec/shared";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

// Fake events data
const EVENTS = [
  {
    id: 1,
    name: "프론트엔드 아키텍처 워크샵",
    description:
      "확장 가능한 프론트엔드 아키텍처 설계와 실제 구현 사례를 다루는 실무 중심 워크샵입니다.",
    date: "2025-06-15",
    time: "20:00-21:00",
    location: "온라인 (Zoom)",
    type: "온라인",
    maxParticipants: 20,
    currentParticipants: 15,
    tags: ["아키텍처", "프론트엔드", "워크샵"],
  },
  {
    id: 2,
    name: "AI 시대의 프로덕트 엔지니어링",
    description:
      "ChatGPT와 같은 AI 도구를 활용한 효율적인 개발 프로세스와 프로덕트 개발 전략을 논의합니다.",
    date: "2025-06-22",
    time: "20:00-21:00",
    location: "온라인 (Zoom)",
    type: "온라인",
    maxParticipants: 50,
    currentParticipants: 32,
    tags: ["AI", "프로덕트", "개발전략"],
  },
  {
    id: 3,
    name: "코드 리뷰 네트워킹 데이",
    description:
      "실제 프로젝트 코드를 가지고 와서 함께 리뷰하고 개선하는 네트워킹 시간입니다.",
    date: "2025-06-26",
    time: "14:00-17:00",
    location: "판교 알파돔",
    type: "오프라인",
    maxParticipants: 15,
    currentParticipants: 8,
    tags: ["코드리뷰", "네트워킹", "실무"],
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Text size="3xl" weight="bold">
          커뮤니티 이벤트
        </Text>
        <Text size="lg" className="text-muted-foreground">
          Product Engineer들과 함께 성장할 수 있는 다양한 이벤트에 참여하세요
        </Text>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className="flex flex-col rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="p-6">
              {/* Event Type Badge */}
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    event.type === "온라인"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {event.type}
                </span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  <span>
                    {event.currentParticipants}/{event.maxParticipants}명
                  </span>
                </div>
              </div>

              <Text size="xl" weight="semibold" className="mb-2">
                {event.name}
              </Text>
              <Text className="mb-4 line-clamp-2 text-muted-foreground">
                {event.description}
              </Text>

              {/* Event Details */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <Button
                className="w-full"
                variant={
                  event.currentParticipants >= event.maxParticipants
                    ? "secondary"
                    : "default"
                }
                disabled={event.currentParticipants >= event.maxParticipants}
              >
                {event.currentParticipants >= event.maxParticipants
                  ? "신청마감"
                  : "신청마감"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
