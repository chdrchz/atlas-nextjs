"use client"

import { addVote } from "@/lib/actions";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CorrectButtonProps {
  id: string;
  voted?: boolean;
}

const CorrectButton = ({ id, voted = false }: CorrectButtonProps) => {
  const [isCorrect, setIsCorrect] = useState(voted);

  const handleVote = async (formData: FormData) => {
    try {
      await addVote(formData);
      setIsCorrect(!isCorrect);
    } catch (error) {
      console.error("Error adding vote:", error);
    }
  }

  return (
    <form action={handleVote}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={`h-8 w-8 min-w-[2rem] rounded-full transition-colors
          ${isCorrect 
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