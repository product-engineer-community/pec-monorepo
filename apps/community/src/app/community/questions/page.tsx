import { QuestionsHeader, QuestionsList } from "@/features/question";

export default function QuestionsPage() {
  return (
    <div className="container py-6">
      <QuestionsHeader />
      <QuestionsList />
    </div>
  );
}
