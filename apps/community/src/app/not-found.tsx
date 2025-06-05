import { COMMUNITY_PRODUCTIVITY_PATHNAME } from "@packages/constants";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <Image
        src="/community/not-found.webp"
        alt="404"
        width={300}
        height={300}
        className="rounded-xl"
      />
      <h1 className="text-[96px] font-bold leading-none text-gray-900">404</h1>

      <p className="mt-4 text-2xl font-semibold text-gray-800">
        여긴… 아무것도 없어요.
      </p>
      <p className="mt-2 text-gray-500">
        당신에겐 <strong>‘아무것도 없다는 걸 발견하는 능력’</strong>이 있군요!
      </p>

      <div className="mt-8">
        <Link
          href={COMMUNITY_PRODUCTIVITY_PATHNAME}
          className="inline-block rounded-lg bg-primary px-5 py-3 text-sm text-white shadow transition hover:bg-gray-800"
        >
          Community 로 돌아가기
        </Link>
      </div>
    </main>
  );
}
