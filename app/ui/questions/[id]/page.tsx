import { fetchAnswers, fetchQuestion } from "@/lib/data";
import { AnswerContent } from "@/components/AnswerContent";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = await fetchQuestion(id);
  const answers = await fetchAnswers(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return <AnswerContent question={question} answers={answers} />;
}
