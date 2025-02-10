import { Question } from "@/components/Question";
import { fetchQuestion } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const question = await fetchQuestion(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <Question id={question.id} text={question.title} votes={question.votes} />
    </div>
  );
}
