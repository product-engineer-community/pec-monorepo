"use client";
import { CAMP_LANDING_PATHNAME } from "@packages/constants";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <Image
        src="/not-found.webp"
        alt="404"
        width={300}
        height={300}
        className="rounded-xl"
      />
      <h1 className="text-[96px] font-bold leading-none text-gray-900">500</h1>

      <p className="mt-4 text-2xl font-semibold text-gray-800">
        오류가 발생했어요.
      </p>
      <p className="mt-2 text-gray-500">
        오류가 발생했어요. 다시 시도해주세요.
      </p>

      <div className="mt-8">
        <Link
          href={CAMP_LANDING_PATHNAME}
          className="inline-block rounded-lg bg-primary px-5 py-3 text-sm text-white shadow transition hover:bg-gray-800"
        >
          Camp 홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
