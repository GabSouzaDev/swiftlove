import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Music, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface TaylorSwiftQuizProps {
  onQuizCompleted: () => void;
}

const questions: Question[] = [
  {
    question: "Qual é o nome completo da Taylor Swift?",
    options: [
      "Taylor Alison Swift",
      "Taylor Anne Swift", 
      "Taylor Alice Swift",
      "Taylor Amanda Swift"
    ],
    correct: 0
  },
  {
    question: "Em que ano Taylor Swift lançou seu primeiro álbum?",
    options: ["2005", "2006", "2007", "2008"],
    correct: 1
  },
  {
    question: "Qual dessas músicas NÃO é da Taylor Swift?",
    options: [
      "Anti-Hero",
      "Watermelon Sugar", 
      "Shake It Off",
      "Love Story"
    ],
    correct: 1
  },
  {
    question: "Qual é o nome do gato mais famoso da Taylor Swift?",
    options: [
      "Meredith Grey",
      "Olivia Benson",
      "Benjamin Button", 
      "Todos os anteriores"
    ],
    correct: 3
  },
  {
    question: "Qual álbum da Taylor Swift tem mais músicas sobre relacionamentos passados?",
    options: [
      "1989",
      "Red",
      "Folklore", 
      "Reputation"
    ],
    correct: 1
  }
];

export default function TaylorSwiftQuiz({ onQuizCompleted }: TaylorSwiftQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correct) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleQuizComplete = () => {
    if (correctAnswers >= 3) { // Precisa acertar pelo menos 3 de 5
      setQuizCompleted(true);
      onQuizCompleted();
    } else {
      // Reiniciar quiz se não passou
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setCorrectAnswers(0);
      setShowResult(false);
    }
  };

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="text-6xl">🎉</div>
        <h3 className="font-playfair text-3xl font-bold text-gradient">
          Parabéns, Swiftie!
        </h3>
        <p className="text-lg text-gray-700 font-dancing">
          Você provou que é uma verdadeira fã da Taylor! 
          Agora você pode acessar o modo extra.
        </p>
        <Award className="w-16 h-16 text-romantic-gold mx-auto" />
      </motion.div>
    );
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <h3 className="font-playfair text-3xl font-bold text-gradient">
          Resultado do Quiz
        </h3>
        <div className="text-5xl">
          {correctAnswers >= 3 ? "🎊" : "😅"}
        </div>
        <p className="text-xl font-dancing text-gray-700">
          Você acertou {correctAnswers} de {questions.length} perguntas!
        </p>
        
        {correctAnswers >= 3 ? (
          <div className="space-y-4">
            <p className="text-lg text-romantic-gold font-dancing">
              Você é uma verdadeira Swiftie! ✨
            </p>
            <Button
              onClick={handleQuizComplete}
              className="bg-gradient-to-r from-rose-gold to-romantic-gold text-white px-8 py-3 font-dancing text-lg"
            >
              Acessar Extra 💕
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-600 font-dancing">
              Você precisa acertar pelo menos 3 perguntas para acessar o modo extra.
            </p>
            <Button
              onClick={handleQuizComplete}
              variant="outline"
              className="border-2 border-deep-rose text-deep-rose hover:bg-deep-rose hover:text-white px-6 py-3 font-dancing"
            >
              Tentar Novamente 🔄
            </Button>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="font-playfair text-3xl font-bold text-gradient mb-4">
          Quiz da Taylor Swift 🎤
        </h3>
        <p className="font-dancing text-xl text-deep-rose">
          Prove que você é uma verdadeira Swiftie para desbloquear o modo extra!
        </p>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Music className="w-5 h-5 text-romantic-gold" />
          <span className="text-sm text-gray-600">
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          <Music className="w-5 h-5 text-romantic-gold" />
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-gray-800 text-center">
          {questions[currentQuestion].question}
        </h4>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? "border-romantic-gold bg-gradient-to-r from-cream to-soft-lavender text-deep-rose font-semibold"
                  : "border-gray-300 bg-white hover:border-rose-gold hover:bg-cream"
              }`}
            >
              <span className="flex items-center justify-between">
                {option}
                {selectedAnswer === index && (
                  <Heart className="w-5 h-5 text-romantic-gold fill-current" />
                )}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-rose-gold to-romantic-gold text-white px-8 py-3 font-dancing text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Próxima Pergunta
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              "Ver Resultado 🎯"
            )}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
        <div
          className="bg-gradient-to-r from-rose-gold to-romantic-gold h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        />
      </div>
    </motion.div>
  );
}