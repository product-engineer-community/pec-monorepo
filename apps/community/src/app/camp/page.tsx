import Image from "next/image";

import {
  ApplyButton,
  CurriculumItem,
  Intro,
  ProcessItem,
  SubTitle,
  Title,
} from "@/features/camp/ui";
import feedbackSessionSrc from "@/public/camp/feedback-session.webp";
import questionSrc from "@/public/camp/question.webp";
import sessionSrc from "@/public/camp/session.webp";
import sessionGuideSrc from "@/public/camp/session-guide.webp";
import subjectSrc from "@/public/camp/subject.webp";
import teamSubjectSrc from "@/public/camp/team-subject.webp";
import { ExternalLink } from "@/shared/components/ExternalLink";

export default async function Index() {
  return (
    <div className="flex w-full max-w-5xl flex-1 flex-col items-center px-36">
      <h1 className="mt-24 flex flex-col gap-4 text-center text-5xl font-semibold">
        <div>Real Problems, Tech Solutions,</div>
        <div>Your Growth</div>
      </h1>

      <div className="mt-16 flex flex-col items-center text-2xl font-semibold">
        <div>8주 동안 Product Engineer Camp 를 통해</div>
        <div>내 주변의 실제 문제를 기술로 해결하며</div>
        <div>진짜 성장을 경험하세요</div>
      </div>

      <div className="mt-16">
        <Intro />
      </div>

      <div className="mt-24 flex flex-col gap-24">
        <section className="mt-16">
          <Title>이런 분들에게 추천해요</Title>

          <div className="mt-8 flex gap-10">
            <div className="flex flex-1 gap-2 rounded-lg bg-stone-200 p-4">
              <div>🤔</div>
              <div>
                &quot;좋은 컴포넌트 설계란 무엇인가?&quot; 에 대해 고민하는 분
              </div>
            </div>

            <div className="flex flex-1 gap-2 rounded-lg bg-stone-200 p-4">
              <div>🤐</div>
              <div>
                작업 결과물에 대해 피드백을 주고 받을 사수, 동료가 없는 분
              </div>
            </div>

            <div className="flex flex-1 gap-2 rounded-lg bg-stone-200 p-4">
              <div>🤩</div>
              <div>
                공장처럼 찍어낸 포트폴리오가 아닌, 실제 문제를 해결하고 싶은 분
              </div>
            </div>
          </div>
        </section>

        <section>
          <Title>어떤 것들을 경험할 수 있나요?</Title>
          <div className="mt-8 flex flex-col gap-4">
            <div className="rounded-lg bg-stone-200 p-4">
              👥 User UX 에 대한 깊이 있는 이해를 토대로, 좋은 설계를 하는
              방법을 배웁니다.
            </div>
            <div className="rounded-lg bg-stone-200 p-4">
              💻 Technology 동료와 함께 결과물에 대한 피드백을 나누며,
              유지보수와 확장성을 고려하여 구현합니다.
            </div>
            <div className="rounded-lg bg-stone-200 p-4">
              🚀 Business 실제 문제를 Product 로 해결하며, 현업에서 겪는 고민의
              해답을 발견합니다.
            </div>
          </div>

          <SubTitle className="mt-8 text-center">함께 다룰 기술들</SubTitle>
          <div className="mt-8 flex gap-4">
            <Image
              width={180}
              height={180}
              src={"/camp/tech/reactlogo.png"}
              alt="react"
            />
            <Image
              width={180}
              height={180}
              src={"/camp/tech/nextjs.png"}
              alt="nextjs"
            />
            <Image
              width={180}
              height={180}
              src={"/camp/tech/zustand.png"}
              alt="zustand"
            />
            <Image
              width={180}
              height={180}
              src={"/camp/tech/fsd.png"}
              alt="fsd"
            />
          </div>
        </section>

        <section>
          <Title>어떻게 진행하나요?</Title>
          <SubTitle className="mb-6 mt-8 text-center">P.E.C 주간 일정</SubTitle>
          <Image
            width={1000}
            height={300}
            src={"/camp/schedule.webp"}
            alt="schedule"
          />

          <div className="mt-8 flex flex-col gap-8">
            <div className="flex gap-12">
              <ProcessItem
                title="정규 세션"
                titleBgColor="#feeab3"
                description="주 1회 / 1시간 30분 ZOOM 세션에 참여하여 주차별 커리큘럼 주제를
        학습하고, 수행한 과제에 대해 피드백을 받습니다."
                imageSrc={sessionSrc}
                imageDescription="ZOOM 세션 강의"
              />
              <ProcessItem
                title="세션 가이드 제공"
                titleBgColor="#feeab3"
                description="주차별 주제 상세 설명, 과제 진행 방법에 대해 설명하는 세션
                  가이드 파일(pdf)을 제공합니다. (과제는 주차별 주제에 대한
                  실습입니다.)"
                imageSrc={sessionGuideSrc}
                imageDescription="2주차 세션 가이드 파일"
              />
            </div>
            <div className="flex gap-12">
              <ProcessItem
                title="개인 과제"
                titleBgColor="#fed3dd"
                description="같은 주제로, 각자가 개인 과제를 진행합니다. 개인 과제를 기반으로 하나의 팀 과제를 완성합니다."
                imageSrc={subjectSrc}
                imageDescription="다양한 UX framework 활용 연습"
              />
              <ProcessItem
                title="피드백 세션"
                titleBgColor="#fee0c9"
                description="완성한 과제에 대해, 정규 세션 전 추가로 피드백 세션을 진행하며 과제 완성도를 높입니다."
                imageSrc={feedbackSessionSrc}
                imageDescription="과제에 대해 피드백을 제공하는 모습"
              />
            </div>
            <div className="flex gap-12">
              <ProcessItem
                title="실시간 질문"
                titleBgColor="#cdf5ce"
                description="Discord 로 세션과 과제에 대해 실시간으로 질문하며, 이를 토대로 깊이 있게 학습합니다."
                imageSrc={questionSrc}
                imageDescription="Dicord 로 피드백 및 실시간 Q&A"
              />
              <ProcessItem
                title="팀 과제"
                titleBgColor="#cfe2fd"
                description="앞서 진행한 개인 과제를 바탕으로, 팀원과 함께 ZOOM 을 통해 의견을 나누며 과제를 완성합니다."
                imageSrc={teamSubjectSrc}
                imageDescription="함께 완성하는 팀 과제"
              />
            </div>
          </div>
        </section>

        <section>
          <Title>P.E.C 커리큘럼</Title>
          <div className="mt-8 flex gap-8">
            <CurriculumItem
              emoji="💬"
              week={"1"}
              title="문제 정의"
              description="사용자의 관점을 이해하고 문제를 명확히 정의합니다."
            />
            <CurriculumItem
              emoji="🗃️"
              week={"2"}
              title="Information flow"
              description="서비스의 전반적인 흐름을 이해하고, 사용자의 패턴을 파악합니다."
            />
            <CurriculumItem
              emoji="💡"
              week={"3"}
              title="서비스 구체화"
              description="실제 서비스를 개발하기 위해 필요한 정보들을 구체화합니다."
            />
          </div>

          <div className="mt-12 flex gap-8">
            <CurriculumItem
              emoji="✍️"
              week={"4"}
              title="4주차 컴포넌트 및 상태 관리 설계"
              description="구체화한 개념들을 활용하여 리액트 컴포넌트와 상태를 설계합니다."
            />
            <CurriculumItem
              emoji="📔"
              week={"5-6"}
              title="5-6주차 컴포넌트 및 상태 구현"
              description="컴포넌트와 상태 관리를 구현합니다. 사용자 친화적인 인터랙션을 구현하는 방법을 배웁니다."
            />
            <CurriculumItem
              emoji="🚢"
              week={"7-8"}
              title="클라우드 서비스, 배포"
              description="배포 자동화를 경험합니다. 자동화 내부에서 돌아가는 동작 원리를 이해합니다."
            />
          </div>

          <SubTitle className="mt-16">주차별 과제</SubTitle>
          <div className="relative -mx-36 mt-8">
            <Image
              className="h-auto w-full"
              width={1000}
              height={300}
              src={"/camp/weekly-subject.webp"}
              alt="weekly subject"
            />
          </div>
        </section>

        <section>
          <Title>P.E.C 멘토 소개</Title>
          <div className="mt-8 flex">
            <div className="flex-1">
              <Image
                width={200}
                height={200}
                src={"/camp/mento.webp"}
                alt="mento"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="leading-8">
                안녕하세요. <br />
                <b>Product Engineer Camp</b> 멘토 <b>Boaz</b> 입니다.
                <br />
                창업을 경험하면서, 개발이 궁금해져
                <br />
                <b>Software engineer</b> 가 되었습니다.
                <br />
                다양한 조직(스타트업, 대기업)을 경험했습니다.
                <br />
                인터넷에서 도움 받은 은혜를 갚기 위해,
                <br /> <b>유튜브</b>와 <b>블로그</b>를 운영하고 있습니다.
              </div>
              <div>
                <div>
                  <ExternalLink href="https://www.youtube.com/@withBoaz">
                    🎥YOUTUBE
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>

          <ApplyButton />
        </section>
      </div>
    </div>
  );
}
