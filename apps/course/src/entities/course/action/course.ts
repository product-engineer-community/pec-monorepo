"use server";

import { Course } from "../model";

export async function getCourseItems() {
  // from youtube, get private video list
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

  if (!YOUTUBE_API_KEY || !PLAYLIST_ID) {
    console.error("YouTube API key and Playlist ID are required");
    return [];
  }

  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
}

export async function getCourses(): Promise<Course[]> {
  // 강의 목록 Mock 데이터
  return [
    {
      id: "nextjs",
      title: `Next.js 까보기: "쓸 줄 아는 개발자"에서 "알고 쓰는 개발자"로`,
      description: `함께 소스코드를 까보며 기술면접부터 실무 설계까지, AI 시대에 필요한 깊은 이해와 자신만의 관점을 갖출 수 있도록 도와드릴게요. Next.js를 단순히 "써본" 개발자에서, 왜 그렇게 쓰는지 "이해하는" 전문가로 성장하세요.`,
      instructor: "Boaz",
      price: 154000,
      salePrice: 132000,
      duration: "12주",
      level: "중급",
      students: 63,
      image: "/NextjsIcon.webp",
      tags: ["Next.js", "TypeScript", "면접", "실무"],
    },
    {
      id: "course-2",
      title: "Product Engineer를 위한 알고리즘 & 자료구조(5월 예정)",
      description:
        "실무에서 마주치는 다양한 알고리즘 문제를 소개합니다. 복잡한 비즈니스 로직을 효율적으로 구현하기 위한 알고리즘적 사고와 최적화 기법을 습득하세요.",
      instructor: "Boaz",
      price: 179000,
      salePrice: 149000,
      duration: "8주",
      level: "중급",
      students: 45,
      image: "/Algorithm.webp",
      tags: ["알고리즘", "자료구조", "최적화", "코딩테스트"],
    },
    {
      id: "course-3",
      title: "Product Engineer를 위한 시스템 디자인(6월 예정)",
      description:
        "확장 가능하고 안정적인 시스템을 설계하는 방법을 배웁니다. 대규모 트래픽, 데이터 처리, 분산 시스템 등 실제 서비스 개발에 필요한 아키텍처 설계 원칙과 패턴을 학습합니다.",
      instructor: "Boaz",
      price: 199000,
      salePrice: 169000,
      duration: "12주",
      level: "고급",
      students: 36,
      image: "/SystemDesign.webp",
      tags: ["시스템디자인", "아키텍처", "확장성", "분산시스템"],
    },
  ];
}
