import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResultScreenProps {
  message: string;
  onRestart: () => void;
}

export default function ResultScreen({
  message,
  onRestart,
}: ResultScreenProps) {
  const isSuccess = message.includes("Tebrikler");

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl p-8 shadow-lg text-center space-y-6">
        {/* Result Icon */}
        <div className="flex justify-center">
          <img
            src={isSuccess ? "/success_icon.png" : "/try_again_icon.png"}
            alt={isSuccess ? "Başarı" : "Tekrar Dene"}
            className="w-32 h-32"
          />
        </div>

        {/* Result Message */}
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}>
            {isSuccess ? "Harika!" : "Üzgünüz!"}
          </h2>
          <p className="text-lg text-gray-700">{message}</p>
        </div>

        {/* Restart Button */}
        <Button
          onClick={onRestart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg font-semibold"
        >
          Ana Sayfaya Dön
        </Button>
      </Card>
    </div>
  );
}
