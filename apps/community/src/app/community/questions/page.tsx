import { QuestionsHeader, QuestionsList } from "@/entities/question";

export default function QuestionsPage() {
  return (
    <div className="container py-6">
      <QuestionsHeader />
      <QuestionsList />
    </div>
  );
}
