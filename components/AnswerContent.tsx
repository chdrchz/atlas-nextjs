"use client";

import { useState, useEffect } from 'react';
import { HashtagIcon } from "@heroicons/react/24/outline";
import { AnswerQuestion } from "@/components/AnswerQuestion";
import { Answer as AnswerComponent } from "@/components/Answer";
import { Question, Answer } from "@/lib/definitions";

export function AnswerContent({
  question,
  answers,
}: {
  question: Question;
  answers: Answer[];
}) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  useEffect(() => {
    const storedAnswer = localStorage.getItem(`selected_answer_${question.id}`);
    if (storedAnswer) {
      setSelectedAnswerId(storedAnswer);
    } else if (question.correct_answer_id) {
      setSelectedAnswerId(question.correct_answer_id);
    }
  }, [question.id, question.correct_answer_id]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswerId(answerId);
    localStorage.setItem(`selected_answer_${question.id}`, answerId);
  };

  return (
    <div>
      <h1 className="text-3xl font-black flex items-center">
        <HashtagIcon className="h-6 w-6 mr-2" /> {question.title}
      </h1>
      <AnswerQuestion questionId={question.id} />
      <div className="space-y-4">
        {answers.map((answer) => (
          <div 
            key={answer.id}
            onClick={() => handleAnswerSelect(answer.id)}
            className={`cursor-pointer transition-all duration-200 ${
              selectedAnswerId === answer.id
            }`}
          >
            <AnswerComponent
              id={answer.id}
              text={answer.answer}
              votes={answer.votes}
              question_id={question.id}
              is_correct={answer.id === question.correct_answer_id || answer.id === selectedAnswerId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
