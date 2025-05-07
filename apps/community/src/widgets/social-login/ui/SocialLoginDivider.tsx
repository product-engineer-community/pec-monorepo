export function SocialLoginDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-muted-foreground">
          가입 없이 바로 시작하기
        </span>
      </div>
    </div>
  );
}
