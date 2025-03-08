import { CursorRuleContent } from "@/features/cursor-rule/ui/CursorRuleContent";
import { getCursorRulePaths } from "@/entities/cursor-rule/api";
import { getCursorRuleContent } from "@/entities/cursor-rule/api/getCursorRuleContent";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const result = await getCursorRulePaths();

  if ("error" in result || !result.paths) {
    return [];
  }

  return result.paths.map((path: string) => ({
    path: encodeURIComponent(path),
  }));
}

interface PageProps {
  params: Promise<{ path: string }>;
}

export default async function Page({ params }: PageProps) {
  const { path: encodedPath } = await params;
  const path = decodeURIComponent(encodedPath);

  const result = await getCursorRuleContent(path);

  if ("error" in result) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <section className="bg-primary py-8 sm:py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Cursor Rule Details
          </h1>
          <p className="mt-2 text-white/90">{path}</p>
        </div>
      </section>

      <section className="flex-1 py-6 sm:py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <CursorRuleContent path={path} content={result.content} />
        </div>
      </section>
    </div>
  );
}
