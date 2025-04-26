import React from "react";

import { MarkdownViewer } from "@/src/shared/components/editor";

import type { Article } from "../../model";

interface ArticleContentProps {
  article: Article;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const { content, title, publishedDate, author } = article;

  return (
    <article className="mx-auto w-full max-w-4xl p-4">
      {title && <h1 className="mb-4 text-3xl font-bold">{title}</h1>}

      {(author || publishedDate) && (
        <div className="mb-6 text-gray-600">
          {author && <span className="mr-4">{author}</span>}
          {publishedDate && <time>{publishedDate}</time>}
        </div>
      )}

      <div className="mt-8">
        <MarkdownViewer content={content} />
      </div>
    </article>
  );
};
