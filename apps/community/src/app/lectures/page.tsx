import { Button, Card, CardContent, CardFooter, CardHeader } from "@pec/shared";
import { Clock, User } from "lucide-react";
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
export const LECTURE_MOCK_DATA: Lecture[] = [
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
    id: "lecture-2",
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
    id: "lecture-3",
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
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
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
        </div>
        <h3 className="line-clamp-2 text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{instructor}</p>
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
            <Link href={`/lectures/${id}`}>상세보기</Link>
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
              {LECTURE_MOCK_DATA.map((lecture) => (
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
