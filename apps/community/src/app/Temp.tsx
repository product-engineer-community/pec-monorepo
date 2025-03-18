"use client";

import { Button, Text } from "@pec/shared";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* 🖥️ 1. Hero Section */}
      <section className="flex w-full flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-24 text-center">
        <Text size="3xl" className="mb-4 max-w-4xl">
          Product Engineer 들과 함께 기술을 학습하세요.
        </Text>
        <Text size="xl" className="mb-8 max-w-2xl text-slate-600">
          기술의 본질을 이해하고, 사용자의 문제를 해결하는 엔지니어들의 모임
        </Text>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg">지금 가입하기</Button>
        </div>
      </section>

      {/* 🔍 3. 누구를 위한 커뮤니티인가? */}
      <section className="w-full bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <Text size="2xl" className="mb-12 text-center">
            누구를 위한 커뮤니티인가?
          </Text>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center">
                <div className="mr-2 text-2xl text-green-500">✅</div>
                <Text size="xl">추천하는 고객</Text>
              </div>
              <ul className="space-y-4">
                {[
                  "프론트엔드 실무 경험 1~5년 이상의 개발자",
                  "시스템 설계, 인프라, CI/CD 등 복잡한 고민을 시작한 개발자",
                  "혼자 성장에 한계를 느끼며 코드 리뷰나 토론을 원하는 개발자",
                  "기술을 넘어 비즈니스 관점으로 사고하고 싶은 개발자",
                  '"이렇게 개발하는 게 맞을까?" 스스로 질문을 던지기 시작한 개발자',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    <Text>{item}</Text>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-6 flex items-center">
                <div className="mr-2 text-2xl text-red-500">🚫</div>
                <Text size="xl">추천하지 않는 고객</Text>
              </div>
              <ul className="space-y-4">
                {[
                  "완전 초보 및 입문자를 위한 강의를 찾는 개발자",
                  "혼자서만 공부하고 질문이나 토론에 참여하지 않는 개발자",
                  "튜토리얼 영상만 소비하고 싶은 개발자",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-red-500">•</span>
                    <Text>{item}</Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ 4. Product Engineer란? */}
      <section className="w-full bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Text size="2xl" className="mb-8">
            Product Engineer란?
          </Text>
          <Text className="mb-10 text-xl">
            {`"사용자의 문제를 기술로 해결하여, 비즈니스 가치를 전달하는
            엔지니어입니다."`}
          </Text>

          <Text size="xl" className="mb-6">
            Product Engineer가 갖춰야 할 4가지 핵심 역량
          </Text>

          <div className="mt-8 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            <div className="flex items-start">
              <div className="mr-4 font-bold text-green-500">✅</div>
              <div>
                <Text size="lg" className="mb-2">
                  공감 능력
                </Text>
                <Text>
                  사용자의 입장에서 문제를 깊게 이해하고 진짜 문제를 정의합니다.
                </Text>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 font-bold text-green-500">✅</div>
              <div>
                <Text size="lg" className="mb-2">
                  기술력
                </Text>
                <Text>
                  기술 자체에 대한 깊은 이해와, 적합한 해결책을 선택하고 구현할
                  수 있는 경험을 보유합니다.
                </Text>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 font-bold text-green-500">✅</div>
              <div>
                <Text size="lg" className="mb-2">
                  비즈니스 감각
                </Text>
                <Text>
                  문제와 해결책이 현실적으로 실현 가능하고, 지속 가능하며 확장
                  가능한지 점검합니다.
                </Text>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 font-bold text-green-500">✅</div>
              <div>
                <Text size="lg" className="mb-2">
                  진정성
                </Text>
                <Text>
                  진짜 문제 해결을 우선시하며, 생각하는 대로 실천하는 태도를
                  갖춥니다.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌊 5. AI 시대의 새로운 변화, 어떻게 준비할 것인가? */}
   

      {/* 🚴‍♀️ 6. Product Engineering 성장 로드맵 */}
     

      {/* 🎓 7. 제공하는 주요 서비스 */}
      <section className="w-full bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <Text size="2xl" className="mb-12 text-center">
            제공하는 주요 서비스
          </Text>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                icon: "🎓",
                title: "주 1회 프리미엄 영상 콘텐츠",
                description:
                  "실무에 필요한 핵심 역량을 체계적으로 학습할 수 있는 고품질 콘텐츠를 제공합니다.",
              },
              {
                icon: "💬",
                title: "강의 기반의 기술 토론 및 코드 리뷰 공간 제공",
                description:
                  "함께 배우고 성장할 수 있는 토론과 코드 리뷰 환경을 제공합니다.",
              },
              {
                icon: "🛠️",
                title: "실제 제품을 만들고 경험을 공유할 수 있는 환경 지원",
                description:
                  "이론을 넘어 실제 제품 개발 경험을 통해 성장할 수 있는 기회를 제공합니다.",
              },
              {
                icon: "👥",
                title: "함께 성장할 수 있는 동료들의 네트워킹 기회",
                description:
                  "같은 목표를 가진 동료들과 함께 성장하며 네트워크를 형성할 수 있습니다.",
              },
            ].map((service, index) => (
              <div key={index} className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 text-3xl">{service.icon}</div>
                <Text size="xl" className="mb-4">
                  {service.title}
                </Text>
                <Text>{service.description}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📢 8. 커뮤니티 참여 혜택 */}
      <section className="w-full bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <Text size="2xl" className="mb-12 text-center">
            커뮤니티 참여 혜택
          </Text>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "성장하는 동료들과 함께하는 학습 문화 형성",
                description:
                  "혼자서는 얻기 어려운 깊이 있는 토론과 피드백 환경을 경험하세요.",
              },
              {
                title: "AI 시대에 필수적인 자신만의 관점과 기준 확립",
                description:
                  "빠르게 변화하는 기술 환경에서 주도적으로 성장할 수 있는 관점을 키웁니다.",
              },
              {
                title:
                  "제품 관점을 통해 시장에서 가치 있는 엔지니어로 성장 가능",
                description:
                  "단순 개발자를 넘어 제품 전체를 바라볼 수 있는 역량을 갖추세요.",
              },
              {
                title: "커리어와 연봉 성장의 기반 마련",
                description:
                  "시장에서 인정받는 Product Engineer로 성장하여 더 나은 커리어 기회를 만드세요.",
              },
            ].map((benefit, index) => (
              <div key={index} className="rounded-lg bg-slate-50 p-6 shadow-sm">
                <Text size="lg" className="mb-3">
                  {benefit.title}
                </Text>
                <Text className="text-slate-600">{benefit.description}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🗣️ 9. 최종 CTA */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-24 text-center text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <Text size="2xl" className="mb-6 text-white">
            지금, AI 시대를 주도하는 Product Engineer로의 첫 발을 내딛으세요.
          </Text>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-gray-100"
          >
            지금 가입하기
          </Button>
        </div>
      </section>
    </div>
  );
}
