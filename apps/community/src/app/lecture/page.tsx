import { Button } from "@packages/ui";
import type { Metadata } from "next";

import { getLectures } from "@/src/entities/lecture/action";
import { LectureItem } from "@/src/entities/lecture/ui";

export const metadata: Metadata = {
  title: "강의 | PEC 커뮤니티",
  description:
    "Product Engineer를 위한 프리미엄 강의를 만나보세요. 기술의 등장 배경과 동작 원리를 이해하며 성장을 가속화하세요.",
  openGraph: {
    title: "강의 | PEC 커뮤니티",
    description:
      "Product Engineer를 위한 프리미엄 강의를 만나보세요. 기술의 등장 배경과 동작 원리를 이해하며 성장을 가속화하세요.",
    type: "website",
    images: ["/webinar.webp"],
  },
};

export default async function LecturePage() {
  const lectures = await getLectures();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* 헤더 섹션 */}
        <section className="w-full bg-primary py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                  Product Engineer 를 위한 프리미엄 강의
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  기술의 등장 배경과 동작 원리를 이해하며 여러분의 성장을
                  가속화하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 강의 목록 섹션 */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">인기 강의</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lectures.map((lecture) => (
                <LectureItem key={lecture.id} {...lecture} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button variant="outline" size="lg" disabled>
                더 많은 강의 보기(준비중)
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
