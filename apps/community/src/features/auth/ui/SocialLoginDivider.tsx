"use client";

export function SocialLoginDivider() {
  return (
    <div className="relative !mt-[32px]">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-muted-foreground">
          소셜 계정으로 로그인
        </span>
      </div>
    </div>
  );
}
