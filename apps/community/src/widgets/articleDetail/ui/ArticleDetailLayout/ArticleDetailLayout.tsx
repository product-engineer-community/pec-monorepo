import React from "react";

import type { Article } from "@/entities/articles";
import { ArticleContent } from "@/entities/articles";

interface ArticleDetailLayoutProps {
  article: Article;
}

export const ArticleDetailLayout: React.FC<ArticleDetailLayoutProps> = ({
  article,
}) => {
  return (
    <div className="container mx-auto py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <ArticleContent article={article} />
      </div>
    </div>
  );
};
