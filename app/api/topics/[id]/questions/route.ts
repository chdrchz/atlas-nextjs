import { NextRequest, NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/data";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id?: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Invalid topic ID" }, { status: 400 });
  }

  try {
    const questions = await fetchQuestions(id);
    const formattedQuestions = questions.map((question) => ({
      id: question.id,
      title: question.title,
      topic_id: question.topic_id,
      votes: question.votes,
    }));
    return NextResponse.json(formattedQuestions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
