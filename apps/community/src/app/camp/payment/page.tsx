import { SubTitle } from "@/features/camp/ui";
import PayButton from "@/features/payment/ui/PayButton";
import Image from "next/image";

export default async function Payment() {
  return (
    <main className="flex w-full max-w-5xl flex-1 flex-col items-center px-36">
      <section className="mt-24 flex gap-8">
        <section className="w-[360px] overflow-hidden rounded-xl">
          <Image src="/logo.webp" width={360} height={360} alt="logo" />
        </section>
        <section className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-8">
            <div>
              <SubTitle>Product Engineer Camp</SubTitle>
              <div>
                Product Engineer Camp 에서는 내 주변에 실제 문제를 기술로
                해결하는 과정을 통해, ​좋은 설계에 대한 기준을 세우며 진짜
                성장을 경험합니다.
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">진행 방식</div>

              <div>👉 기간: 5월 8일 - 6월 26일 (8주)</div>
              <div>
                👉 방식: 팀 진행, 온라인(줌) 정규 세션 (주차별 강의, 피드백,
                코드리뷰)
              </div>
              <div>👉 비용 : 200만원</div>
            </div>
          </div>
        </section>
      </section>
      <section className="my-8 h-[700px] w-full">
        <PayButton />
      </section>
    </main>
  );
}
