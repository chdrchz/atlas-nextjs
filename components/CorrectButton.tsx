"use client"

import { setCorrectAnswer } from "@/lib/actions";
import { CheckIcon } from "@heroicons/react/24/outline";

interface CorrectButtonProps {
  questionId: string;
  answerId: string;
  isCorrectAnswer?: boolean;
}

const CorrectButton = ({ questionId, answerId, isCorrectAnswer = false }: CorrectButtonProps) => {
  return (
    <form action={setCorrectAnswer}>
      <input type="hidden" name="question_id" value={questionId} />
      <input type="hidden" name="answer_id" value={answerId} />
      <button
        type="submit"
        className={`h-8 w-8 min-w-[2rem] rounded-full transition-colors
          ${isCorrectAnswer 
            ? "bg-emerald-500 text-white ring-2 ring-emerald-500" 
            : "text-gray-500 hover:text-emerald-500 active:bg-emerald-500 active:text-white active:ring-2 active:ring-emerald-500"
          }`}
      >
        <CheckIcon className="h-5 w-5 mx-auto" />
      </button>
    </form>
  );
};

export default CorrectButton;