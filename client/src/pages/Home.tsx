import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import QuizScreen from "@/components/QuizScreen";
import ResultScreen from "@/components/ResultScreen";
import StartScreen from "@/components/StartScreen";
import questionsData from "../../../questions.json";

type GameState = "start" | "quiz" | "result";

interface Question {
  id: string;
  text: string;
  type: "multiple_choice" | "drag_and_drop";
  difficulty: "easy" | "medium" | "hard";
  options: string[];
  answer: string | string[];
  image: string;
}

interface GameSession {
  currentQuestions: Question[];
  currentQuestionIndex: number;
  score: number;
  difficulty: "easy" | "medium" | "hard";
  answers: Record<string, string | string[]>;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [session, setSession] = useState<GameSession | null>(null);
  const [resultMessage, setResultMessage] = useState("");

  // Soruları zorluk seviyesine göre filtrele ve rastgele seç
  const selectRandomQuestions = (difficulty: "easy" | "medium" | "hard") => {
    const allQuestions = questionsData as Question[];
    
    // Kolay: 4, Orta: 3, Zor: 3
    const easyQuestions = allQuestions.filter(q => q.difficulty === "easy");
    const mediumQuestions = allQuestions.filter(q => q.difficulty === "medium");
    const hardQuestions = allQuestions.filter(q => q.difficulty === "hard");

    // Rastgele seçim
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const selected = [
      ...shuffleArray(easyQuestions).slice(0, 4),
      ...shuffleArray(mediumQuestions).slice(0, 3),
      ...shuffleArray(hardQuestions).slice(0, 3),
    ];

    // Soruların sırasını karıştır
    return shuffleArray(selected);
  };

  const startQuiz = (difficulty: "easy" | "medium" | "hard" = "easy") => {
    const questions = selectRandomQuestions(difficulty);
    setSession({
      currentQuestions: questions,
      currentQuestionIndex: 0,
      score: 0,
      difficulty,
      answers: {},
    });
    setGameState("quiz");
  };

  const handleAnswer = (answer: string | string[]) => {
    if (!session) return;

    const currentQuestion = session.currentQuestions[session.currentQuestionIndex];
    const isCorrect = Array.isArray(currentQuestion.answer)
      ? JSON.stringify(answer) === JSON.stringify(currentQuestion.answer)
      : answer === currentQuestion.answer;

    const newAnswers = {
      ...session.answers,
      [currentQuestion.id]: answer,
    };

    const newScore = isCorrect ? session.score + 1 : session.score;

    if (session.currentQuestionIndex < session.currentQuestions.length - 1) {
      setSession({
        ...session,
        currentQuestionIndex: session.currentQuestionIndex + 1,
        score: newScore,
        answers: newAnswers,
      });
    } else {
      // Quiz bitti
      const finalScore = newScore;
      if (finalScore >= 6) {
        // Zorluk artsın
        const nextDifficulty =
          session.difficulty === "easy"
            ? "medium"
            : session.difficulty === "medium"
              ? "hard"
              : "hard";
        setResultMessage(
          `Tebrikler! ${finalScore}/10 doğru cevap! Zorluk seviyesi arttı.`
        );
        setTimeout(() => {
          startQuiz(nextDifficulty);
        }, 2000);
      } else {
        setResultMessage(
          `Üzgünüz! ${finalScore}/10 doğru cevap. Lütfen tekrar deneyin.`
        );
        setGameState("result");
      }
    }
  };

  const handleRestart = () => {
    setGameState("start");
    setSession(null);
    setResultMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/scratch_cat.png"
              alt="Scratch Kedi"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Scratch Sınav
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            5. Sınıf Programlama Sınavı
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {gameState === "start" && (
          <StartScreen onStart={startQuiz} />
        )}

        {gameState === "quiz" && session && (
          <QuizScreen
            question={session.currentQuestions[session.currentQuestionIndex]}
            questionNumber={session.currentQuestionIndex + 1}
            totalQuestions={session.currentQuestions.length}
            score={session.score}
            onAnswer={handleAnswer}
          />
        )}

        {gameState === "result" && (
          <ResultScreen
            message={resultMessage}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}
