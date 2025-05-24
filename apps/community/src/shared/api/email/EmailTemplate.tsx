import * as React from "react";

export default function EmailTemplate({
  name,
  type,
  postId,
}: {
  name: string;
  type: string;
  postId: string;
}) {
  return (
    <div>
      <h2>{name}님, 아래 버튼을 클릭해서 댓글을 확인해보세요.</h2>
      <a
        className="rounded-md border border-primary p-4 text-lg text-primary"
        href={`https://www.productengineer.info/community/${type}s/${postId}`}
      >
        댓글 확인하기
      </a>
    </div>
  );
}
