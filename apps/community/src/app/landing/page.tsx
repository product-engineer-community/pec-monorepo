import {
  Button,
  ContentItem,
  GradientText,
  RotatingText,
  ShinyText,
  Text,
} from "@packages/ui";
import {
  CheckCircle,
  Github,
  Lightbulb,
  Linkedin,
  MessageSquare,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import RenderGuideModal from "@/entities/guide/ui/RenderGuideModal";
import { StartCTAButton } from "@/src/entities/landing/ui/StartCTAButton";

export const metadata: Metadata = {
  title: "PEC 커뮤니티에 오신 것을 환영합니다 - 연결하고, 배우고, 성장하세요",
  description:
    "PEC 커뮤니티를 만나보세요! 동료들과 교류하고, 유용한 게시글을 탐색하며, 토론에 참여하고, 지식을 넓힐 수 있는 공간입니다.",
  openGraph: {
    title: "PEC 커뮤니티에 오신 것을 환영합니다 - 연결하고, 배우고, 성장하세요",
    description:
      "PEC 커뮤니티를 만나보세요! 동료들과 교류하고, 유용한 게시글을 탐색하며, 토론에 참여하고, 지식을 넓힐 수 있는 공간입니다.",
    images: ["/logo.webp"],
    type: "website",
  },
};

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <RenderGuideModal />
      <main className="flex-1">
        <section className="flex w-full flex-col items-center justify-center px-2 py-24 text-center">
          {/* Because of hydration issue, Use div instead of <Text /> */}
          <div className="mb-4 flex max-w-6xl flex-col items-center text-4xl font-bold sm:flex-row sm:items-center">
            <div className="mb-2 sm:mb-0">P.E.C 와 함께</div>
            <div className="flex items-center">
              <RotatingText
                texts={["기술을 학습", "경험을 공유", "문제를 해결"]}
                mainClassName="mx-2 px-2 sm:px-2 md:px-3 bg-primary text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
              하세요
            </div>
          </div>
          <div className="mb-8 gap-2 text-base text-slate-600 sm:text-left sm:text-lg md:text-xl">
            기술의 본질을 이해하고, 사용자의 문제를 해결하는
            <div className="inline-flex items-center">
              <GradientText
                className="sm:pl-2"
                colors={["#0d4c86", "#6cb8ff", "#0d4c86", "#6cb8ff", "#0d4c86"]}
              >
                Product Engineer
              </GradientText>
            </div>
            들의 커뮤니티
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <StartCTAButton />
          </div>
        </section>

        <section className="flex w-full flex-col gap-8 bg-muted p-8 md:flex-row md:py-24">
          <div className="mx-auto">
            <Text size="2xl" className="mb-4 font-bold md:text-3xl">
              왜 Product Engineer Community 에 가입해야 할까요?
            </Text>
            <Text
              size="lg"
              className="mx-auto mb-4 flex max-w-3xl justify-center text-slate-600"
            >
              프론트엔드 개발자로 몇 년간 실무를 경험하다 보면, 단순히 기술을
              익히는 것만으로는 성장에 한계를 느끼게 됩니다. 기술이 중요하지만,
              진짜 차이를 만드는 것은 사용자의 문제를 이해하고 해결하는
              능력입니다.
            </Text>
            <Text size="lg" className="text-slate-600">
              <span className="inline-block text-primary">
                Product Engineer Community
              </span>
              는 기술을 넘어 제품과 비즈니스를 이해하는 엔지니어로 성장할 수
              있도록 돕는 커뮤니티입니다.
            </Text>
          </div>
          <div className="flex justify-center">
            <Image
              src="/community/webinar.webp"
              alt="Product Engineer"
              width={800}
              height={800}
            />
          </div>
        </section>

        <section className="py-12 text-center md:py-24 lg:py-32">
          <h3 className="mb-6 text-2xl font-bold">이런 분들에게 추천합니다</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex rounded-lg bg-white p-4 shadow">
              <CheckCircle className="mr-2 text-green-500" /> 실무 경험을
              쌓았지만, 혼자 성장 하기에 한계를 느끼는 분
            </div>
            <div className="flex rounded-lg bg-white p-4 shadow">
              <CheckCircle className="mr-2 text-green-500" /> 제품 관점에서 더
              나은 구현 방법을 찾고 싶은 분
            </div>
            <div className="flex rounded-lg bg-white p-4 shadow">
              <CheckCircle className="mr-2 text-green-500" /> 코드 리뷰, 기술
              토론을 통해 함께 성장하고 싶은 분
            </div>
            <div className="flex rounded-lg bg-white p-4 shadow">
              <CheckCircle className="mr-2 text-green-500" /> AI 시대, 자신만의
              개발 기준을 찾고 싶은 분
            </div>
          </div>
        </section>

        <section className="w-full bg-primary py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter text-white md:text-3xl">
                  P.E 로 성장하기 위해 필요한 모든 것
                </h2>
                <div className="inline-block max-w-[900px] text-gray-300 md:text-xl">
                  P.E.C 에서는 더 나은 <ShinyText>Product Engineer</ShinyText>{" "}
                  로 성장하기 위한 네트워킹, 지식, 경험을 제공합니다.
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">네트워킹</h3>
                <p className="text-center text-muted-foreground">
                  사용자의 문제 해결에 진심인 현업 개발자들과 깊이 있는
                  네트워킹을 제공합니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">지식 공유</h3>
                <p className="text-center text-muted-foreground">
                  기술 컨텐츠를 제공하여 실무에서 개발할 때 자신만의 기준을
                  세우는 것을 돕습니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">커뮤니티 포럼</h3>
                <p className="text-center text-muted-foreground">
                  직접 문제를 해결한 경험을 공유하며 서로 피드백을 통해 더 나은
                  방법을 찾아봅니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="grid gap-10 px-6 md:gap-16 lg:grid-cols-2 lg:px-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                70명+ 의 Product Engineer 와 함께하세요
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                P.E Community 에는 70명 이상의 열정 있는 Product Engineer 들이
                함께하고 있어요. 모두들 최고의 제품을 향해 나아가는
                개발자들이며, 함께 성장하여 더 나은 개발자가 되고 싶은
                사람들입니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">70+ 활동 멤버</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm">20+ 회사</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="text-sm">15+ 새로운 포스팅</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-6">
                <div className="text-4xl font-bold">4+</div>
                <p className="text-muted-foreground">월별 이벤트</p>
              </div>
              <div className="rounded-lg bg-muted p-6">
                <div className="text-4xl font-bold">12+</div>
                <p className="text-muted-foreground">새로운 답변 댓글</p>
              </div>
              <div className="rounded-lg bg-muted p-6">
                <div className="text-4xl font-bold">20+</div>
                <p className="text-muted-foreground">공유된 경험</p>
              </div>
              <div className="rounded-lg bg-muted p-6">
                <div className="text-4xl font-bold">98%</div>
                <p className="text-muted-foreground">구성원 만족도</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  최근 기술 컨텐츠(6월 오픈 예정)
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  기술의 등장 배경과 동작 원리에 대한 깊이 있는 컨텐츠를
                  제공합니다.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <ContentItem
                time="15"
                category="튜토리얼"
                title="F.S.D 를 활용하여 Next.js 폴더구조 설계하기"
                description="프론트엔드 개발자가 프로젝트를 진행하면서 중요한 것 중 하나는 폴더 구조를 잘 설계하는 것입니다. 폴더 구조는 프로젝트의 규모가 커질수록 더 중요해집니다."
                image="/community/FSD.webp"
                link="/"
              />

              <ContentItem
                time="17"
                category="튜토리얼"
                title="OAuth 2.0 을 활용한 인증 시스템 구현하기"
                description="OAuth 2.0 을 활용한 인증 시스템을 구현하는 방법을 알아보세요. 이 시스템은 사용자의 인증 정보를 안전하게 저장하고, 검증하는 데 사용합니다."
                image="/community/OAuth.webp"
                link="/"
              />

              <ContentItem
                time="13"
                category="튜토리얼"
                title="Github actions 를 활용한 CI/CD 구현하기"
                description="Github actions 를 활용하여 CI/CD 를 구현하는 방법을 알아보세요. 이를 통해 코드를 자동으로 빌드하고, 테스트하고, 배포하는 것이 가능해집니다."
                image="/community/GithubActions.webp"
                link="/"
              />
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" disabled>
                컨텐츠 더보기
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full border-t py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                오늘부터 함께 성장하세요
              </h2>

              <div className="mb-8 text-slate-600 sm:text-left sm:text-lg md:text-xl">
                사용자의 문제를 기술로 해결하여, 비즈니스 가치를 전달하는
                <div className="inline-flex items-center">
                  <GradientText
                    className="pl-2"
                    colors={[
                      "#0d4c86",
                      "#6cb8ff",
                      "#0d4c86",
                      "#6cb8ff",
                      "#0d4c86",
                    ]}
                  >
                    Product Engineer
                  </GradientText>
                </div>
                들의 모임에 초대합니다.
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <StartCTAButton />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Image
              src="/community/logo.webp"
              className="rounded-full"
              alt="logo"
              width={32}
              height={32}
            />
            <span>P.E.C</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/product-engineer-community"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/groups/14622639"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Product Engineer Community. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
