import { Button, Card, CardContent, CardFooter, CardHeader } from "@pec/shared";
import { Bookmark, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 강의 타입 정의
interface Lecture {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  salePrice: number;
  duration: string;
  level: string;
  students: number;
  image: string;
  tags: string[];
}

// 강의 목록 Mock 데이터
const LECTURE_MOCK_DATA: Lecture[] = [
  {
    id: "lecture-1",
    title: "Next.js로 확장 가능한 웹 애플리케이션 구축하기",
    description:
      "Next.js의 기본부터 고급 기능까지 배우며 확장 가능한 웹 애플리케이션을 구축하는 방법을 학습합니다. 실제 프로젝트 개발 과정을 통해 성능 최적화, SSR, SSG 등의 개념을 실습해봅니다.",
    instructor: "김프론트",
    price: 149000,
    salePrice: 99000,
    duration: "8주",
    level: "중급",
    students: 240,
    image: "/FSD.webp",
    tags: ["Next.js", "React", "성능최적화", "SSR"],
  },
  {
    id: "lecture-2",
    title: "TypeScript와 함께하는 견고한 백엔드 설계",
    description:
      "TypeScript를 활용한 백엔드 개발에 초점을 맞춰, 타입 안정성이 보장된 견고한 API를 설계하고 구현하는 방법을 배웁니다. NestJS와 TypeORM을 중심으로 실전 프로젝트를 완성합니다.",
    instructor: "박백엔드",
    price: 179000,
    salePrice: 129000,
    duration: "10주",
    level: "고급",
    students: 186,
    image: "/OAuth.webp",
    tags: ["TypeScript", "NestJS", "TypeORM", "API"],
  },
  {
    id: "lecture-3",
    title: "AWS 클라우드 기반 인프라 구축과 운영",
    description:
      "AWS 클라우드 서비스를 활용한 확장 가능한 인프라 구축 방법을 배웁니다. EC2, S3, Lambda, CloudFront 등의 서비스를 활용하여 안정적이고 확장 가능한 애플리케이션 인프라를 구성하는 방법을 학습합니다.",
    instructor: "이클라우드",
    price: 199000,
    salePrice: 159000,
    duration: "6주",
    level: "중급",
    students: 210,
    image: "/GithubActions.webp",
    tags: ["AWS", "클라우드", "인프라", "DevOps"],
  },
];

// 강의 아이템 컴포넌트
function LectureItem({
  title,
  description,
  instructor,
  price,
  salePrice,
  duration,
  level,
  students,
  image,
  tags,
  id,
}: Lecture) {
  // 할인율 계산
  const discountRate = Math.round(((price - salePrice) / price) * 100);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {discountRate > 0 && (
          <div className="absolute right-0 top-0 bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {discountRate}% 할인
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1 text-white">
            <User className="h-4 w-4" />
            <span className="text-xs">{students}명 수강 중</span>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {level === "초급" && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {level}
              </span>
            )}
            {level === "중급" && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                {level}
              </span>
            )}
            {level === "고급" && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                {level}
              </span>
            )}
            <span className="flex items-center text-xs text-gray-500">
              <Clock className="mr-1 h-3 w-3" />
              {duration}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        <h3 className="line-clamp-2 text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{instructor} 강사</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="mb-2 flex items-center gap-2">
          {discountRate > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {price.toLocaleString()}원
            </span>
          )}
          <span className="text-lg font-bold text-primary">
            {salePrice.toLocaleString()}원
          </span>
        </div>
        <div className="flex w-full gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/lecture/${id}`}>상세보기</Link>
          </Button>
          <Button size="sm" className="flex-1">
            수강신청
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function LecturePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* 헤더 섹션 */}
        <section className="w-full bg-primary py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                  프로덕트 엔지니어를 위한 프리미엄 강의
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  현업 개발자들이 직접 알려주는 실무 중심 강의로 여러분의 성장을
                  가속화하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 강의 설명 섹션 */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mb-4 text-2xl font-bold">
                성장하는 개발자의 선택
              </h2>
              <p className="mb-8 text-muted-foreground">
                Product Engineer로 성장하기 위해 필요한 핵심 기술과 실무
                노하우를 담은 프리미엄 강의를 만나보세요. 현업에서 직접 사용되는
                기술과 방법론을 체계적으로 배울 수 있습니다.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold text-primary">12개+</div>
                  <p className="text-sm text-muted-foreground">프리미엄 강의</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold text-primary">
                    1,500명+
                  </div>
                  <p className="text-sm text-muted-foreground">수강생</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <p className="text-sm text-muted-foreground">만족도</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 강의 목록 섹션 */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">인기 강의</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  최신순
                </Button>
                <Button variant="outline" size="sm">
                  인기순
                </Button>
                <Button variant="outline" size="sm">
                  가격순
                </Button>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LECTURE_MOCK_DATA.map((lecture) => (
                <LectureItem key={lecture.id} {...lecture} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button variant="outline" size="lg">
                더 많은 강의 보기
              </Button>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="w-full border-t bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  지금 바로 성장을 시작하세요
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground">
                  Product Engineer로서의 여정을 함께할 준비가 되셨나요? 지금
                  바로 강의를 수강하고 실무에 바로 적용 가능한 기술을
                  습득하세요.
                </p>
              </div>
              <Button size="lg" className="mt-4">
                모든 강의 둘러보기
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
