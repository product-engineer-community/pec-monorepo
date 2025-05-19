import { Badge, Button, Card, CardContent } from "@packages/ui";
import {
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Code,
  Layers,
  MessageCircle,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                  AI시대, 대체불가한 프론트엔드 엔지니어가 되는 방법ㅅ
                </h1>
                <p className="text-xl text-gray-200">
                  8주 동안 Camp 에서 AI와 함께 내 주변에 실제 문제를 해결하며
                  진짜 성장을 경험하세요
                </p>
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-gray-200"
                  >
                    지금 신청하기
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    더 알아보기
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Product Engineer Camp"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section id="about" className="bg-white py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                이런 분들에게 추천해요
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                Product Engineer Camp는 AI 시대에 필요한 실질적인 역량을
                키우고자 하는 프론트엔드 개발자를 위한 프로그램입니다.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-slate-100 p-3">
                      <Brain className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        AI 협업 역량 강화
                      </h3>
                      <p className="mt-2 text-gray-500">
                        AI 와 효율적으로 협업하는 방법을 깊이 있게 배우고 싶은
                        분
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-slate-100 p-3">
                      <Layers className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">설계 역량 향상</h3>
                      <p className="mt-2 text-gray-500">
                        &quot;좋은 프론트엔드 설계란 무엇인가?&quot; 에 대해
                        고민하는 분
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-slate-100 p-3">
                      <Users className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">성장 커뮤니티</h3>
                      <p className="mt-2 text-gray-500">
                        성장에 대한 나의 고민에 대해 피드백을 주고 받을 사수,
                        동료가 없는 분
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="bg-gray-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                어떤 것들을 경험할 수 있나요?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                8주 동안 다양한 활동을 통해 실질적인 성장을 경험하게 됩니다.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-slate-900 p-3">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        정규 세션 & 개인과제
                      </h3>
                      <p className="mt-2 text-gray-500">
                        UX 에 대한 깊은 이해를 통해, 기획과 설계가 AI 협업에서
                        중요한 이유를 발견합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-slate-900 p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        팀과제 & 피드백 세션
                      </h3>
                      <p className="mt-2 text-gray-500">
                        팀과제, 피드백 세션을 통해 팀원과 서로 도움을 주고
                        받으며 함께 발전합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-slate-900 p-3">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">AI 협업 & 리뷰</h3>
                      <p className="mt-2 text-gray-500">
                        설계를 기반으로 AI 와 협업하며, 그 과정과 결과물(코드)에
                        대해 리뷰를 받습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="bg-white py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight">
                  정규 세션
                </h2>
                <p className="mb-6 text-gray-500">
                  라이브 세션에 참여하여 주차별 주제를 학습하고, 수행한 과제에
                  대해 피드백을 받습니다.
                </p>
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-slate-100 p-2">
                    <MessageCircle className="h-5 w-5 text-slate-900" />
                  </div>
                  <span className="font-medium">ZOOM 세션 강의</span>
                </div>

                <h2 className="mb-6 mt-12 text-3xl font-bold tracking-tight">
                  코드 리뷰
                </h2>
                <p className="mb-6 text-gray-500">
                  기획에 기반하여 설계한 후 구현합니다. 이 과정에서 AI와
                  협업하는 방법과 결과물(코드)에 대해 리뷰합니다.
                </p>
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-slate-100 p-2">
                    <Code className="h-5 w-5 text-slate-900" />
                  </div>
                  <span className="font-medium">멘토 코드리뷰</span>
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight">
                  개인 과제
                </h2>
                <p className="mb-6 text-gray-500">
                  주차별 주제에 대해 각자 개인 과제를 진행합니다. 개인 과제를
                  통해 주제를 실습하며 경험합니다.
                </p>
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-slate-100 p-2">
                    <BookOpen className="h-5 w-5 text-slate-900" />
                  </div>
                  <span className="font-medium">
                    UX framework 를 통해 F.E 설계 기반을 학습
                  </span>
                </div>

                <h2 className="mb-6 mt-12 text-3xl font-bold tracking-tight">
                  피드백 세션
                </h2>
                <p className="mb-6 text-gray-500">
                  완성한 과제에 대해, 심화 피드백 세션을 추가로 진행하며 과제
                  완성도를 높입니다.
                </p>
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-slate-100 p-2">
                    <MessageCircle className="h-5 w-5 text-slate-900" />
                  </div>
                  <span className="font-medium">
                    과제에 대한 심화 피드백을 제공
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="bg-slate-900 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                함께 다룰 기술들
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-300">
                최신 기술 스택을 활용하여 실무에서 바로 적용 가능한 역량을
                키웁니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-white p-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Next.js"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="font-medium">Next.js</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-white p-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Cursor"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="font-medium">Cursor(AI editor)</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-white p-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="FSD"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="font-medium">Feature Sliced Design</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-white p-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Supabase"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="font-medium">Supabase</span>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section id="curriculum" className="bg-white py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                P.E.C 주간 일정
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                (기수별로 요일 조정 가능)
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-slate-100 p-3">
                      <MessageCircle className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">정규 세션</h3>
                      <p className="mt-2 text-gray-500">
                        주 1회 120분 동안 진행하는 ZOOM 라이브 세션에
                        참여합니다. (팀 과제 피드백 + 주제 세션)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-slate-100 p-3">
                      <BookOpen className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">개인 과제</h3>
                      <p className="mt-2 text-gray-500">
                        금요일부터 주말을 활용해 개인 과제를 진행합니다.(discord
                        에서 질문하실 수 있습니다.)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-slate-100 p-3">
                      <MessageCircle className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">피드백 세션</h3>
                      <p className="mt-2 text-gray-500">
                        개인 과제를 완성하면, 월요일에 ZOOM 피드백 세션을 통해
                        멘토와 함께 과제를 개선합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-slate-100 p-3">
                      <Users className="h-6 w-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">팀 과제</h3>
                      <p className="mt-2 text-gray-500">
                        개선한 개인 과제를 토대로, 팀원과 함께 ZOOM 에서 의견을
                        나누며 팀 과제를 완성합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Weekly Topics */}
        <section className="bg-gray-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                P.E.C 주차별 주제
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                8주 동안 체계적인 커리큘럼을 통해 실질적인 역량을 키웁니다.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-slate-900">1주차</Badge>
                  <div className="mb-2 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-slate-900" />
                    <h3 className="text-lg font-semibold">문제 정의</h3>
                  </div>
                  <p className="text-gray-500">
                    사용자의 관점을 이해하고 문제를 명확히 정의합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-slate-900">2주차</Badge>
                  <div className="mb-2 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-slate-900" />
                    <h3 className="text-lg font-semibold">Information flow</h3>
                  </div>
                  <p className="text-gray-500">
                    서비스의 전반적인 흐름을 이해하고, 사용자의 패턴을
                    파악합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-slate-900">3주차</Badge>
                  <div className="mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-slate-900" />
                    <h3 className="text-lg font-semibold">서비스 구체화</h3>
                  </div>
                  <p className="text-gray-500">
                    실제 서비스를 개발하기 위해 필요한 정보들을 구체화합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-slate-900">4주차</Badge>
                  <div className="mb-2 flex items-center gap-2">
                    <Code className="h-5 w-5 text-slate-900" />
                    <h3 className="text-lg font-semibold">
                      컴포넌트 설계(F.S.D)
                    </h3>
                  </div>
                  <p className="text-gray-500">
                    구체화한 개념들을 활용하여 변화에 대응이 쉽도록 설계합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-slate-900">5-6주차</Badge>
                  <div className="mb-2 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-slate-900" />
                    <h3 className="text-lg font-semibold">
                      AI 와 협업(Cursor)
                    </h3>
                  </div>
                  <p className="text-gray-500">
                    좋은 설계를 기반으로, AI 와 효율적으로 협업하는 방법을
                    배웁니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-slate-900">7-8주차</Badge>
                  <div className="mb-2 flex items-center gap-2">
                    <Code className="h-5 w-5 text-slate-900" />
                    <h3 className="text-lg font-semibold">
                      상태 설계 및 전체 구현
                    </h3>
                  </div>
                  <p className="text-gray-500">
                    상태(데이터) 설계의 기준을 배웁니다. AI 와 함께 전체를
                    구현합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-white py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                P.E.C 참가자 인터뷰
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                실제 참가자들의 경험과 성장 스토리를 들어보세요.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">
                    리팩토링은 나를 위한 선물?!
                  </h3>
                  <p className="mb-4 text-gray-500">
                    &quot;FSD와 zustand를 결합해 복잡한 프로젝트를 체계적으로
                    관리하고, 사용자 중심의 철학을 실제 업무에 적용해 나가는
                    동희님의 경험은 많은 개발자들에게 실질적인 인사이트를 제공할
                    것입니다.&quot;
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="동희님"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <p className="font-medium">동희님</p>
                      <p className="text-sm text-gray-500">
                        신사업 팀 프론트엔드 개발자
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">
                    성장의 비결은? 사용자 중심 개발!
                  </h3>
                  <p className="mb-4 text-gray-500">
                    &quot;개발자라면 누구나 한 번쯤 고민해봤을 사용자 중심의
                    개발 철학과 실제 업무에서의 적용 방법, 그리고 스타트업에서의
                    도전과 성장을 권효진님의 경험을 통해 생생하게
                    들어보세요.&quot;
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="권효진님"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <p className="font-medium">권효진님</p>
                      <p className="text-sm text-gray-500">
                        스피타 프론트엔드 개발자
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Apply Section */}
        <section id="apply" className="bg-slate-900 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">모집 정보</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-300">
                Product Engineer Camp에 지원하고 함께 성장하세요.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-none bg-white/10">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">지원 자격</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>
                        실제 운영중인 서비스를 개발해 본 Frontend Engineer
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>
                        포트폴리오를 넘어, 실제 문제를 해결하는 Product 를
                        완성하고 싶은 분
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>아래 진행 방식에 맞추어 참여 가능한 분</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none bg-white/10">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">진행 방식</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>방식 : 팀 진행(피드백, 코드리뷰)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>
                        온라인 정규 세션, 실시간 Q&A 채널(디스코드) 제공
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>커리큘럼(주차별 주제)에 따른 주차별 과제 수행</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>비용 : 200만원</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none bg-white/10">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">9기 모집 일정</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <div>
                        <p className="font-medium">Camp 신청</p>
                        <p className="text-gray-300">6/7-15일</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <div>
                        <p className="font-medium">서류 합격자</p>
                        <p className="text-gray-300">6월 16일</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <div>
                        <p className="font-medium">인터뷰 진행</p>
                        <p className="text-gray-300">6/21-22일</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <div>
                        <p className="font-medium">최종 합격자</p>
                        <p className="text-gray-300">6월 23일</p>
                      </div>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm">
                    캠프 기간 : 2025년 7월 3일 - 8월 21일(8주)
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-gray-200"
              >
                지금 신청하기
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                자주 묻는 질문들
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                Product Engineer Camp에 대한 궁금증을 해결해 드립니다.
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">
                    한 기수에 몇 명이 함께 하나요?
                  </h3>
                  <p className="text-gray-500">
                    팀별로 3명 ~ 4명이 함께 합니다.(총 인원은 기수별 상이) UX 팀
                    과제 는 줌에서 함께 진행합니다. 이후 코드 구현도 하나의
                    GitHub repo 에서 진행합니다.(효율적인 협업 경험을 위해)
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">
                    해결할 실제 문제를 어떻게 정하나요?
                  </h3>
                  <p className="text-gray-500">
                    참가자 분들이 각자 생각한 아이디어를 모아서, 1주차 세션에서
                    투표로 결정합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">
                    원할한 캠프를 위해, 일주일에 얼마나 시간을 투자하면
                    좋을까요?
                  </h3>
                  <p className="text-gray-500">
                    개인차가 있지만, 약 10시간 정도면 커리큘럼을 따라가는데 큰
                    무리가 없습니다. 다만, 상시 피드백이 가능하므로 시간을 많이
                    투자 할수록 얻는게 많아집니다.(20시간 이상 투자도 가능)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
