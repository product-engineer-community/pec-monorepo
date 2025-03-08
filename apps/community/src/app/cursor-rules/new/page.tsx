import { CursorRuleForm } from "@/src/features/cursor-rule/ui/CursorRuleForm";

export default function NewCursorRulePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <section className="bg-primary py-8 sm:py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Create New Cursor Rule
          </h1>
          <p className="mt-2 text-white/90">
            Add a new cursor rule to your collection
          </p>
        </div>
      </section>

      <section className="flex-1 py-6 sm:py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <CursorRuleForm />
          </div>
        </div>
      </section>
    </div>
  );
}
