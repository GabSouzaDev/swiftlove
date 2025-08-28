import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Award, ArrowRight, Star, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface FullTaylorQuizProps {
  onClose: () => void;
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
  },
  {
    question: "Qual é o número da sorte da Taylor Swift?",
    options: ["7", "13", "22", "11"],
    correct: 1
  },
  {
    question: "Em que cidade Taylor Swift nasceu?",
    options: [
      "Nashville",
      "Los Angeles",
      "West Reading", 
      "New York"
    ],
    correct: 2
  },
  {
    question: "Qual foi o primeiro álbum country da Taylor Swift?",
    options: [
      "Taylor Swift",
      "Fearless",
      "Speak Now",
      "Red"
    ],
    correct: 0
  },
  {
    question: "Quantos Grammy Awards Taylor Swift já ganhou?",
    options: ["8", "10", "12", "Mais de 12"],
    correct: 3
  },
  {
    question: "Qual música da Taylor Swift tem a letra 'We never go out of style'?",
    options: [
      "Style",
      "22",
      "ME!",
      "Paper Rings"
    ],
    correct: 0
  },
  {
    question: "Qual álbum marcou a transição completa da Taylor do country para o pop?",
    options: [
      "Red",
      "1989",
      "Reputation",
      "Lover"
    ],
    correct: 1
  },
  {
    question: "Taylor Swift tem quantos gatos?",
    options: ["1", "2", "3", "4"],
    correct: 2
  },
  {
    question: "Qual dessas NÃO é uma era da Taylor Swift?",
    options: [
      "Reputation Era",
      "Folklore Era",
      "Midnight Era",
      "Golden Era"
    ],
    correct: 3
  },
  {
    question: "Qual música da Taylor Swift foi inspirada em Shakespeare?",
    options: [
      "Love Story",
      "You Belong With Me",
      "Enchanted",
      "Begin Again"
    ],
    correct: 0
  },
  {
    question: "Em 'All Too Well', Taylor Swift canta sobre que item de roupa?",
    options: [
      "Um vestido vermelho",
      "Um cachecol",
      "Uma jaqueta",
      "Sapatos vermelhos"
    ],
    correct: 1
  },
  {
    question: "Qual foi o primeiro single do álbum 'Midnights'?",
    options: [
      "Anti-Hero",
      "Lavender Haze",
      "Mastermind",
      "Karma"
    ],
    correct: 1
  },
  {
    question: "Taylor Swift re-gravou seus álbuns antigos por quê?",
    options: [
      "Para melhorar a qualidade",
      "Para recuperar os direitos autorais",
      "Por diversão",
      "A pedido dos fãs"
    ],
    correct: 1
  },
  {
    question: "Qual dessas colaborações realmente aconteceu?",
    options: [
      "Taylor Swift ft. Ed Sheeran",
      "Taylor Swift ft. Ariana Grande",
      "Taylor Swift ft. Billie Eilish",
      "Taylor Swift ft. Dua Lipa"
    ],
    correct: 0
  }
];

const getSwiftieLevel = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  
  if (percentage >= 90) {
    return {
      level: "Swiftie Suprema 👑",
      description: "Você é basicamente a melhor amiga da Taylor! Conhece todos os detalhes e easter eggs!",
      color: "text-yellow-600",
      icon: Crown,
      emoji: "👑✨"
    };
  } else if (percentage >= 80) {
    return {
      level: "Swiftie de Carteirinha 🌟",
      description: "Impressionante! Você conhece muito bem a carreira da Taylor Swift!",
      color: "text-purple-600",
      icon: Star,
      emoji: "🌟💜"
    };
  } else if (percentage >= 70) {
    return {
      level: "Swiftie Dedicada 💖",
      description: "Muito bem! Você é uma fã verdadeira com bom conhecimento!",
      color: "text-pink-600",
      icon: Heart,
      emoji: "💖🎵"
    };
  } else if (percentage >= 60) {
    return {
      level: "Swiftie Casual 🎶",
      description: "Você conhece o básico e curte as músicas dela!",
      color: "text-blue-600",
      icon: Music,
      emoji: "🎶💙"
    };
  } else {
    return {
      level: "Swiftie Iniciante 🌱",
      description: "Está começando a descobrir o universo da Taylor! Continue explorando!",
      color: "text-green-600",
      icon: Sparkles,
      emoji: "🌱🎤"
    };
  }
};

export default function FullTaylorQuiz({ onClose }: FullTaylorQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

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

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  const swiftieLevel = getSwiftieLevel(correctAnswers, questions.length);

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-cream via-soft-lavender to-rose-gold p-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="love-card rounded-2xl p-8 shadow-lg text-center space-y-6"
          >
            <div className="text-6xl mb-4">{swiftieLevel.emoji}</div>
            
            <h2 className="font-playfair text-4xl font-bold text-gradient mb-4">
              Resultado Final!
            </h2>
            
            <div className="space-y-4">
              <p className="text-2xl font-dancing text-deep-rose">
                Sua pontuação: {correctAnswers}/{questions.length}
              </p>
              
              <div className="bg-gradient-to-r from-rose-gold/20 to-romantic-gold/20 rounded-lg p-6">
                <div className="flex items-center justify-center mb-3">
                  <swiftieLevel.icon className={`w-8 h-8 ${swiftieLevel.color} mr-2`} />
                  <h3 className={`text-2xl font-bold ${swiftieLevel.color}`}>
                    {swiftieLevel.level}
                  </h3>
                </div>
                <p className="text-lg font-dancing text-gray-700">
                  {swiftieLevel.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-green-600 font-bold text-lg">✅ Acertos</div>
                  <div>{correctAnswers} perguntas</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-red-600 font-bold text-lg">❌ Erros</div>
                  <div>{questions.length - correctAnswers} perguntas</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-2 border-romantic-gold text-romantic-gold hover:bg-romantic-gold hover:text-white px-6 py-3 font-dancing"
                >
                  Jogar Novamente 🔄
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-rose-gold to-romantic-gold text-white px-6 py-3 font-dancing"
                >
                  Fechar Quiz 💕
                </Button>
              </div>
            </div>

            {/* Animação de estrelas */}
            <div className="flex justify-center space-x-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-cream via-soft-lavender to-rose-gold p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-gradient">
            Quiz Completo da Taylor Swift 🎤
          </h1>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-2 border-deep-rose text-deep-rose hover:bg-deep-rose hover:text-white"
          >
            ← Voltar
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="love-card rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <p className="font-dancing text-xl text-deep-rose mb-4">
              Teste seu conhecimento completo sobre a Taylor Swift!
            </p>
            <div className="flex justify-center items-center space-x-2">
              <Music className="w-5 h-5 text-romantic-gold" />
              <span className="text-sm text-gray-600">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <Music className="w-5 h-5 text-romantic-gold" />
            </div>
          </div>

          <div className="space-y-6">
            <motion.h2 
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-gray-800 text-center"
            >
              {questions[currentQuestion].question}
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
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
              </motion.div>
            </AnimatePresence>

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
                  "Ver Resultado Final 🎯"
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-6">
            <motion.div
              className="bg-gradient-to-r from-rose-gold to-romantic-gold h-3 rounded-full transition-all duration-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentQuestion + 1) / questions.length) * 100}%` 
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}