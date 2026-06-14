import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StartScreenProps {
  onStart: (difficulty: "easy" | "medium" | "hard") => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Scratch Sınavına Hoşgeldiniz!
          </h2>
          
          <p className="text-lg text-gray-600">
            5. sınıf seviyesinde Scratch programlama bilgini test et. 
            Her turda 10 soru cevapla ve başarılı ol!
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left space-y-2">
            <h3 className="font-semibold text-gray-900">Sınav Kuralları:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Her turda 10 soru (4 kolay, 3 orta, 3 zor)</li>
              <li>✓ 6 veya daha fazla doğru cevap = Zorluk artar</li>
              <li>✓ 6'dan az doğru cevap = Baştan başla</li>
              <li>✓ Bazı sorular sürükle-bırak şeklindedir</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-sm font-semibold text-gray-700">
              Başlamak için zorluk seviyesini seç:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => onStart("easy")}
                className="bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold"
              >
                🟢 Kolay
              </Button>
              <Button
                onClick={() => onStart("medium")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-6 text-lg font-semibold"
              >
                🟡 Orta
              </Button>
              <Button
                onClick={() => onStart("hard")}
                className="bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
              >
                🔴 Zor
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
