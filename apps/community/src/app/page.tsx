import { Button, Card, CardContent, CardHeader } from "@/shared/ui";
import { CursorRuleViewer } from "@/features/cursor-rule/ui/CursorRuleViewer";
import Link from "next/link";

export default async function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-primary py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Cursor Rules
          </h1>
          <p className="mt-4 text-base text-white/90 sm:text-lg md:text-xl">
            Manage and view your Cursor editor rules
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-white shadow-lg">
            <CardHeader className="border-b p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Current Rules
                </h2>
                <Button variant="outline" asChild>
                  <Link href="/cursor-rules/new">Create New Rule</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <CursorRuleViewer />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 py-6 text-center text-white">
        <p>&copy; 2024 Cursor Rules. All rights reserved.</p>
      </footer>
    </div>
  );
}
