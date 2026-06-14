import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DragDropQuestionProps {
  options: string[];
  onAnswer: (answer: string[]) => void;
  disabled: boolean;
}

export default function DragDropQuestion({
  options,
  onAnswer,
  disabled,
}: DragDropQuestionProps) {
  const [shuffledOptions] = useState(() => {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>(
    shuffledOptions
  );

  const handleSelectOption = (option: string) => {
    if (disabled) return;
    setSelectedOrder([...selectedOrder, option]);
    setAvailableOptions(availableOptions.filter((o) => o !== option));
  };

  const handleRemoveOption = (index: number) => {
    if (disabled) return;
    const removed = selectedOrder[index];
    setSelectedOrder(selectedOrder.filter((_, i) => i !== index));
    setAvailableOptions([...availableOptions, removed]);
  };

  const handleSubmit = () => {
    if (selectedOrder.length === options.length) {
      onAnswer(selectedOrder);
    }
  };

  const isComplete = selectedOrder.length === options.length;

  return (
    <div className="space-y-6">
      {/* Available Options */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Seçenekler:
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableOptions.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleSelectOption(option)}
              disabled={disabled}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Selected Order */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Sıralı Cevap:
        </h3>
        <div className="space-y-2">
          {selectedOrder.length === 0 ? (
            <Card className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 text-center text-gray-500">
              Seçenekleri sürükle veya tıkla
            </Card>
          ) : (
            <div className="space-y-2">
              {selectedOrder.map((option, index) => (
                <Card
                  key={index}
                  className="p-4 bg-blue-50 border-2 border-blue-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-blue-600 text-lg">
                      {index + 1}.
                    </span>
                    <span className="text-gray-900 font-medium">{option}</span>
                  </div>
                  <Button
                    onClick={() => handleRemoveOption(index)}
                    disabled={disabled}
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isComplete || disabled}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold"
      >
        {isComplete ? "Cevabı Gönder" : `${options.length - selectedOrder.length} seçenek kaldı`}
      </Button>
    </div>
  );
}
