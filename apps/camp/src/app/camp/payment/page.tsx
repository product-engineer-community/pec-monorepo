import { Button } from "@packages/ui";
import Image from "next/image";

import { SubTitle } from "@/features/camp/ui";

export default async function Payment() {
  return (
    <main className="mx-auto flex w-full max-w-full flex-1 flex-col items-center px-4 sm:max-w-5xl sm:px-6 md:px-8 lg:px-12 xl:px-36">
      <section className="mt-12 flex w-full flex-col gap-6 md:mt-16 md:flex-row md:gap-8 lg:mt-24">
        <section className="mx-auto w-full overflow-hidden rounded-xl md:mx-0 md:w-[360px]">
          <Image
            src="/camp/logo.webp"
            width={360}
            height={360}
            alt="logo"
            className="h-auto w-full"
          />
        </section>
        <section className="mt-6 flex flex-1 flex-col justify-between md:mt-0">
          <div className="flex flex-col gap-4 md:gap-8">
            <div>
              <SubTitle>Product Engineer Camp</SubTitle>
              <div className="mt-2">
                Product Engineer Camp 에서는 내 주변에 실제 문제를 기술로
                해결하는 과정을 통해, 좋은 설계에 대한 기준을 세우며 진짜 성장을
                경험합니다.
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">진행 방식</div>

              <div className="mt-2">👉 기간: 5월 8일 - 6월 26일 (8주)</div>
              <div>
                👉 방식: 팀 진행, 온라인(줌) 정규 세션 (주차별 강의, 피드백,
                코드리뷰)
              </div>
              <div>👉 비용 : 200만원</div>
            </div>
          </div>
        </section>
      </section>
      <section className="my-6 h-auto w-full md:my-8 md:h-[700px]">
        <Button className="w-full sm:w-auto">결제하기</Button>
      </section>
    </main>
  );
}
