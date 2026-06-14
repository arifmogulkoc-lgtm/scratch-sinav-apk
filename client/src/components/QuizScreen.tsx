import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MultipleChoiceQuestion from "@/components/questions/MultipleChoiceQuestion";
import DragDropQuestion from "@/components/questions/DragDropQuestion";

interface Question {
  id: string;
  text: string;
  type: "multiple_choice" | "drag_and_drop";
  difficulty: "easy" | "medium" | "hard";
  options: string[];
  answer: string | string[];
  image: string;
}

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  onAnswer: (answer: string | string[]) => void;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

const difficultyLabels: Record<string, string> = {
  easy: "Kolay",
  medium: "Orta",
  hard: "Zor",
};

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  score,
  onAnswer,
}: QuizScreenProps) {
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (answer: string | string[]) => {
    setAnswered(true);
    setTimeout(() => {
      onAnswer(answer);
      setAnswered(false);
    }, 500);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Soru {questionNumber} / {totalQuestions}
          </span>
          <span className="text-sm font-semibold text-gray-700">
            Puan: {score}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-8 shadow-lg">
        <div className="space-y-6">
          {/* Difficulty Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                difficultyColors[question.difficulty]
              }`}
            >
              {difficultyLabels[question.difficulty]} Seviye
            </span>
          </div>

          {/* Question Text */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {question.text}
            </h2>

            {/* Question Image */}
            {question.image && (
              <div className="mb-6">
                <img
                  src={question.image}
                  alt="Soru görseli"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Question Type Specific Component */}
          <div className="space-y-4">
            {question.type === "multiple_choice" && (
              <MultipleChoiceQuestion
                options={question.options}
                onAnswer={handleAnswer}
                disabled={answered}
              />
            )}

            {question.type === "drag_and_drop" && (
              <DragDropQuestion
                options={question.options}
                onAnswer={handleAnswer}
                disabled={answered}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
