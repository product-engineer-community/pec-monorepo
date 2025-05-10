import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@packages/ui";
import { BookOpen, Code, Compass, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getLectureItems, getLectures } from "@/entities/lecture/action";
import { LECTURE_PATHNAME } from "@/src/shared/config/pathname";

interface LecturePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LecturePage({ params }: LecturePageProps) {
  //TODO: id 활용하여 supabase 에서 lecture 정보 불러오기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = await params;
  const lectures = await getLectures();
  console.log("🚀 ~ LecturePage ~ lectures:", lectures);
  const lecture = lectures[0];

  const lectureItems = await getLectureItems();
  console.log("🚀 ~ LecturePage ~ lectureItems:", lectureItems);

  // 할인율 계산
  const discountRate = Math.floor(
    ((lecture.price - lecture.salePrice) / lecture.price) * 100,
  );

  // 월 할부 금액 계산 (12개월 기준)
  const monthlyPayment = Math.floor(lecture.salePrice / 6);

  return (
    <div className="container mx-auto px-4 pb-8">
      {/* 상단 강의 정보 섹션 */}
      <div className="mb-8">
        <section className="bg-white py-8 shadow-sm">
          <div className="flex gap-10">
            {/* 왼쪽 영역: 강의 정보 */}
            <div className="flex flex-1 flex-col">
              {/* 상단 제목과 좋아요(하트) 영역 */}
              <div className="mb-4 flex items-start justify-between">
                <h1 className="text-xl font-bold leading-snug text-gray-900">
                  {lecture.title}
                </h1>
              </div>

              {/* 간단한 정보 (수강기간, 강의 시간 등) */}
              <div className="mb-3 flex flex-wrap items-center space-x-1 text-sm text-gray-500">
                <span>수강기간 {lecture.duration}</span>
                <span>·</span>
                <span>난이도 {lecture.level}</span>
                <span>·</span>
                <span>수강생 {lecture.students}명+</span>
              </div>
              <div className="text-gray-500">{lecture.description}</div>

              {/* 수강생/평가 정보 (임의로 추가) */}
              <div className="mt-auto flex items-center text-sm text-gray-600">
                <span className="mr-3">강사: {lecture.instructor}</span>
                <span className="mr-3">|</span>
                <span>★ 4.9 (82+)</span>
                <span className="mr-3">|</span>
                <span>수강 기간: {lecture.duration}</span>
              </div>
            </div>

            {/* 오른쪽 영역: 가격 및 버튼 */}
            <div className="flex flex-col justify-between">
              <Card className="w-full p-8">
                {/* 가격, 할인 배너 */}
                <div className="max-w-full">
                  <div className="mb-2 flex items-center">
                    <div className="mr-2 inline-block rounded bg-red-500 px-2 py-1 text-sm text-white">
                      최대 {discountRate}%
                    </div>
                    <p className="mr-2 text-2xl font-bold text-gray-900">
                      월 {monthlyPayment.toLocaleString()}원
                    </p>
                    <span className="text-sm text-gray-500">
                      (6개월 할부시)
                    </span>
                  </div>
                  <div className="mb-6 flex flex-col space-y-1">
                    <div className="flex justify-between text-sm text-gray-400">
                      <div>권장 소비자 가격</div>
                      <div className="line-through">
                        {lecture.price.toLocaleString()}원
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <div>할인 금액</div>
                      <div>
                        -{(lecture.price - lecture.salePrice).toLocaleString()}
                        원
                      </div>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <div>할인 판매가</div>
                      <div>{lecture.salePrice.toLocaleString()}원</div>
                    </div>
                  </div>
                </div>

                {/* 버튼 영역 */}
                <Link href={`${LECTURE_PATHNAME}/payment/${id}`}>
                  <Button className="w-full">수강 신청하기</Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>이런 걸 배울 수 있어요</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Code className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  기술면접에서 자주 나오는 Next.js의 동작 원리
                </p>
                <p className="text-sm text-gray-600">
                  내부 코드 분석을 통한 깊은 이해
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                <BookOpen className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  실무에 바로 적용 가능한 설계 원칙
                </p>
                <p className="text-sm text-gray-600">
                  바람직한 아키텍처 구축 방법
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <Lightbulb className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  AI 시대에도 유효한 Next.js의 기술 철학과 본질
                </p>
                <p className="text-sm text-gray-600">
                  변화하는 기술 환경 속 핵심 가치 이해
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Compass className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  프레임워크를 더 잘 선택하고 활용할 수 있는, 자신만의 기준과
                  관점
                </p>
                <p className="text-sm text-gray-600">
                  기술 선택의 명확한 기준 제시
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <p className="mb-2 font-semibold">
              💡 강의를 구매하신 분들에 한하여 &lt;커리어 1:1 코칭 1회권&gt;을
              선물 해드려요.
            </p>
            <p>
              구매 영수증을 hkc7180@gmail.com 으로 보내주시면 코칭 예약 링크를
              드릴게요.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>강의 소개</CardTitle>
          <CardDescription>
            Next.js를 &apos;어떻게&apos;가 아니라 &apos;왜&apos; 쓰는지 설명할
            수 있게 돕는 강의입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="mb-5 text-xl font-semibold">이런 분들께 추천해요</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-blue-400 to-green-500 p-1" />
              <CardContent className="p-5">
                <h4 className="text-lg font-medium">
                  👨‍💻 Next.js를 써봤지만, 제대로 이해하고 싶은 분
                </h4>
                <p className="text-sm text-gray-600">
                  익숙하게 쓰고 있지만, 내부 동작 원리가 궁금한 분들에게
                  적합합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-1" />
              <CardContent className="p-5">
                <h4 className="text-lg font-medium">
                  🎙 기술 면접에서 항상 흐릿하게 설명하게 되는 분
                </h4>
                <p className="text-sm text-gray-600">
                  개념은 아는데, 질문을 받으면 정리된 답변을 하기 힘든 분들을
                  위한 강의입니다.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-blue-700 to-purple-500 p-1" />
              <CardContent className="p-5">
                <h4 className="text-lg font-medium">
                  🧭 AI 시대, 기술 선택 기준이 불안한 실무자
                </h4>
                <p className="text-sm text-gray-600">
                  트렌드에 휩쓸리지 않고 기술의 본질을 꿰뚫고 싶은 분들에게
                  도움이 됩니다.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 mt-8 text-xl font-semibold">수강 후에는</h3>
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
            <li>
              Next.js의 핵심 개념(라우팅, 렌더링, 에러 처리 등)을 단순히
              사용하는 수준을 넘어서, 왜 그렇게 설계되었는지 설명할 수 있게
              됩니다.
            </li>
            <li>
              기술 면접에서 자주 나오는 질문들에 대해, 자신의 언어로 명확하고
              논리적으로 대답할 수 있는 실력을 갖추게 됩니다.
            </li>
            <li>
              공식 문서나 튜토리얼만으로는 얻을 수 없었던 프레임워크의 철학과
              동작 원리에 기반한 실무 설계 기준을 만들 수 있습니다.
            </li>
            <li>
              &apos;남들이 만든 구조를 따라 쓰는 개발자&apos;에서, &apos;자신의
              기준으로 구조를 판단하고 설명할 수 있는 개발자&apos;로 성장하게
              됩니다.
            </li>
            <li>
              변화하는 프론트엔드 기술 흐름 속에서도, 기술을 보는 시야와 선택
              기준을 스스로 세울 수 있는 자신감을 얻게 됩니다.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">이 강의의 핵심 강점</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="p-0">
            <CardContent className="p-6">
              <h3 className="mb-3 text-xl font-semibold">
                소스코드를 까보며, 동작 원리를 분석해요.
              </h3>
              <p className="text-gray-700">
                Next.js의 내부 소스코드를 분석하며 동작 원리를 설명합니다. 이를
                통해 사용하던 기능이 내부적으로 어떻게 동작하는지 파악합니다.
              </p>
            </CardContent>
          </Card>
          <Card className="p-0">
            <CardContent className="p-6">
              <h3 className="mb-3 text-xl font-semibold">
                공식 문서를 넘어, 설계 철학을 다뤄요.
              </h3>
              <p className="text-gray-700">
                공식 문서에 나오는 기능을 순서대로 따라가면서, 그 기능이 왜
                등장했고 어떤 문제를 해결하기 위한 선택이었는지 배경과 설계
                철학을 살펴봅니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 강사 정보 섹션 */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>강사 소개</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="shrink-0">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                {/* 강사 이미지가 있다면 여기 추가 */}
                <Image src="/Boaz.webp" alt="Boaz" width={96} height={96} />
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">Boaz</h3>
              <p className="mb-4 text-gray-700">
                총 4번의 이직을 거치며 다양한 스타트업을 경험 했고, 라인에서
                일하다 얼마전 퇴사한 8년 차 프론트엔드 엔지니어입니다.
              </p>
              <p className="text-gray-700">
                다양한 프로젝트에서 Next.js 를 활용하며, 저는 많은 시행착오를
                겪었어요. 특히 실무에 적용하며 더 좋은 구조를 고민할 때,
                &quot;왜 이렇게 구성해야 하지?&quot;, &quot;이 기능을 써도 되는
                상황인가?&quot; 같은 질문들이 쏟아졌고, 그때부터 단순한
                사용법보다 &apos;등장 배경과 동작 원리의 이해&apos;가더
                중요하다는 걸 느꼈어요.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="mr-2">
            강사에게 문의하기
          </Button>
          <Button variant="ghost">강사 더 알아보기</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
