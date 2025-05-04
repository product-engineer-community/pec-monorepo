import {
  Button,
  GradientText,
  RotatingText,
  ShinyText,
  Text,
} from "@pec/shared";
import {
  BrainCircuit,
  CheckCircle,
  Github,
  Linkedin,
  Search,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getIsAuthenticated } from "../features/auth/lib/check-auth";
import {
  COMMUNITY_QUESTIONS_PATHNAME,
  SIGN_UP_PATHNAME,
} from "../shared/config/pathname";

export default async function LandingPage() {
  const isAuthenticated = await getIsAuthenticated();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="flex w-full flex-col items-center justify-center px-2 py-8 text-center lg:py-24">
          {/* Because of hydration issue, Use div instead of <Text /> */}
          <div className="mb-4 flex max-w-6xl flex-col items-center text-4xl font-bold lg:flex-row lg:items-center">
            <div className="mb-2 lg:mb-0">AI 시대,</div>
            <div className="flex items-center">
              <RotatingText
                texts={["좋은 질문", "비판적 사고력", "자신만의 관점"]}
                mainClassName="mx-2 px-3 py-2 bg-primary text-white overflow-hidden justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />{" "}
              이
            </div>
            <div className="mt-2 lg:mt-0"> 필요합니다</div>
          </div>
          <div className="mb-8 gap-2 text-base text-slate-600 sm:text-left sm:text-lg md:text-xl">
            기술을 넘어, 본질적인 문제를 파악하고 좋은 질문을 던지는
            <div className="inline-flex items-center">
              <GradientText
                className="cursor-auto sm:pl-2"
                colors={["#0d4c86", "#6cb8ff", "#0d4c86", "#6cb8ff", "#0d4c86"]}
              >
                Product Engineer
              </GradientText>
            </div>
            들의 커뮤니티
          </div>
          {!isAuthenticated && (
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href={SIGN_UP_PATHNAME}>함께 질문하고 성장하기</Link>
              </Button>
            </div>
          )}
        </section>

        <section className="flex w-full flex-col gap-8 bg-muted p-8 md:flex-row md:py-24">
          <div className="mx-auto">
            <Text size="2xl" className="mb-4 font-bold md:text-3xl">
              왜 좋은 질문을 하는 능력이 중요할까요?
            </Text>
            <Text
              size="lg"
              className="mx-auto mb-4 flex max-w-3xl justify-center text-slate-600"
            >
              AI가 발전할수록, 기술을 단순히 사용하는 것보다 &apos;질문의
              품질&apos;이 더 중요해집니다. 정확하고 핵심을 찌르는 질문을 할수록
              AI는 더 깊이 있고 유용한 답변을 줍니다. 결국 AI 답변은 여러분의
              질문 수준에 따라 그 퀄리티가 결정됩니다.
            </Text>
            <Text size="lg" className="text-slate-600">
              <span className="inline-block text-primary">
                Product Engineer Community
              </span>
              는 좋은 질문을 통해 문제의 본질을 파악하고 자신만의 관점을
              만들어갈 수 있도록 돕는 커뮤니티입니다.
            </Text>
          </div>
          <div className="flex justify-center">
            <Image
              src="/webinar.webp"
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
              <CheckCircle className="mr-2 text-green-500" /> AI 시대에 자신만의
              관점과 질문 능력을 키우고 싶은 분
            </div>
            <div className="flex rounded-lg bg-white p-4 shadow">
              <CheckCircle className="mr-2 text-green-500" /> 표면적 현상이 아닌
              문제의 본질을 파악하고 싶은 분
            </div>
            <div className="flex rounded-lg bg-white p-4 shadow">
              <CheckCircle className="mr-2 text-green-500" /> 함께 고민하고
              질문하며 더 나은 해결책을 찾고 싶은 분
            </div>
            <div className="flex rounded-lg bg-white p-4 shadow">
              <CheckCircle className="mr-2 text-green-500" /> AI 기술을 단순히
              사용하는 것에서 벗어나 주도적으로 활용하고 싶은 분
            </div>
          </div>
        </section>

        <section className="w-full bg-primary py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter text-white md:text-3xl">
                  좋은 질문을 위한 모든 것
                </h2>
                <div className="inline-block max-w-[900px] text-gray-300 md:text-xl">
                  P.E.C 에서는 <ShinyText>Product Engineer</ShinyText>로
                  성장하기 위한 네트워킹, 지식, 경험을 제공합니다.
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">함께 질문하기</h3>
                <p className="text-center text-muted-foreground">
                  혼자서는 발견하기 어려운 관점과 질문을 다양한 배경을 가진
                  엔지니어들과 함께 나눕니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">비판적 사고력</h3>
                <p className="text-center text-muted-foreground">
                  AI가 제공하는 답을 무조건 받아들이지 않고, 나만의 기준과
                  관점으로 해석하는 능력을 키웁니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">문제의 본질 찾기</h3>
                <p className="text-center text-muted-foreground">
                  표면적 현상을 넘어 진짜 중요한 문제의 본질을 밝혀내는 질문
                  기법을 서로 공유하며 학습합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-t py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                AI 시대, 함께 질문하며 성장하세요
              </h2>

              <div className="mb-8 text-slate-600 sm:text-left sm:text-lg md:text-xl">
                혼자서 좋은 질문을 하는 것은 어렵습니다. 함께 고민하고 질문하는
                공간에서
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
                    진정한 경쟁력
                  </GradientText>
                </div>
                을 키워보세요.
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button type="submit" asChild>
                <Link href={COMMUNITY_QUESTIONS_PATHNAME}>질문 둘러보기</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Image
              src="/logo.webp"
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
