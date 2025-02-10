import { AnswerQuestion } from "@/components/AnswerQuestion";
import { Answer } from "@/components/Answer";
import { fetchAnswers, fetchQuestion } from "@/lib/data";
import { HashtagIcon } from "@heroicons/react/24/outline";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const question = await fetchQuestion(id);
  const answers = await fetchAnswers(id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-black flex items-center">
        <HashtagIcon className="h-6 w-6 mr-2" /> {question.title}
      </h1>
      <AnswerQuestion questionId={question.id} />
      {answers.map((answer) => (
        <Answer
          id={answer.id}
          text={answer.answer}
          votes={answer.votes}
          question_id={question.id}
        />
      ))}
    </div>
  );
}
