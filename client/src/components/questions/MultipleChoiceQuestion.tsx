import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MultipleChoiceQuestionProps {
  options: string[];
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

export default function MultipleChoiceQuestion({
  options,
  onAnswer,
  disabled,
}: MultipleChoiceQuestionProps) {
  const [shuffledOptions] = useState(() => {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {shuffledOptions.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswer(option)}
          disabled={disabled}
          className="h-auto py-4 px-6 text-left justify-start bg-blue-50 hover:bg-blue-100 text-gray-900 border-2 border-blue-200 hover:border-blue-400 transition-all"
        >
          <span className="text-lg font-semibold">{option}</span>
        </Button>
      ))}
    </div>
  );
}
