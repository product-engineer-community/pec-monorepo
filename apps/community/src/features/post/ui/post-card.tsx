export function PostCard() {
  return (
    <article className="bg-card rounded-lg shadow border">
      {/* 카드 헤더 */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted" />
          <div>
            <p className="font-medium text-foreground">사용자 이름</p>
            <p className="text-sm text-muted-foreground">2시간 전</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">···</button>
      </div>

      {/* 카드 이미지 */}
      <div className="aspect-[4/3] md:aspect-[16/9] bg-muted" />

      {/* 카드 컨텐츠 */}
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-foreground">게시글 제목</h2>
        <p className="text-muted-foreground line-clamp-3 md:line-clamp-2">
          게시글 내용이 여기에 들어갑니다. 모바일에서는 3줄, PC에서는 2줄까지 표시됩니다.
          나머지 내용은 말줄임표로 처리됩니다.
        </p>
      </div>

      {/* 카드 푸터 */}
      <div className="px-4 py-3 border-t flex items-center gap-4 text-sm">
        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
          <span>👍</span>
          <span>100</span>
        </button>
        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
          <span>💬</span>
          <span>23</span>
        </button>
      </div>
    </article>
  );
}
