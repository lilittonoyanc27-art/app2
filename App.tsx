/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Volume2, 
  Trophy,
  Home,
  Dog,
  Book,
  Hand,
  Cat,
  GlassWater,
  Users,
  MapPin,
  User,
  FileText,
  Clock,
  Calendar,
  ScrollText,
  MessageSquare,
  Utensils,
  Building2,
  ShieldCheck,
  Palette
} from 'lucide-react';

// --- Types ---

interface QuizItem {
  id: number;
  spanish: string;
  armenian: string;
  icon: React.ReactNode;
  stressRule: string;
}

// --- Data ---

const QUIZ_DATA: QuizItem[] = [
  { id: 1, spanish: 'Casa', armenian: 'Տուն', icon: <Home className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Ca-sa), քանի որ վերջանում է ձայնավորով:' },
  { id: 2, spanish: 'Perro', armenian: 'Շուն', icon: <Dog className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Pe-rro), քանի որ վերջանում է ձայնավորով:' },
  { id: 3, spanish: 'Libro', armenian: 'Գիրք', icon: <Book className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Li-bro), քանի որ վերջանում է ձայնավորով:' },
  { id: 4, spanish: 'Mano', armenian: 'Ձեռք', icon: <Hand className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Ma-no), քանի որ վերջանում է ձայնավորով:' },
  { id: 5, spanish: 'Gato', armenian: 'Կատու', icon: <Cat className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Ga-to), քանի որ վերջանում է ձայնավորով:' },
  { id: 6, spanish: 'Vino', armenian: 'Գինի', icon: <GlassWater className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Vi-no), քանի որ վերջանում է ձայնավորով:' },
  { id: 7, spanish: 'Hijo', armenian: 'Որդի', icon: <User className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Hi-jo), քանի որ վերջանում է ձայնավորով:' },
  { id: 8, spanish: 'Calle', armenian: 'Փողոց', icon: <MapPin className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Ca-lle), քանի որ վերջանում է ձայնավորով:' },
  { id: 9, spanish: 'Amigo', armenian: 'Ընկեր', icon: <Users className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (A-mi-go), քանի որ վերջանում է ձայնավորով:' },
  { id: 10, spanish: 'Examen', armenian: 'Քննություն', icon: <FileText className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (E-xa-men), քանի որ վերջանում է "n"-ով:' },
  { id: 11, spanish: 'Joven', armenian: 'Երիտասարդ', icon: <User className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Jo-ven), քանի որ վերջանում է "n"-ով:' },
  { id: 12, spanish: 'Crisis', armenian: 'Ճգնաժամ', icon: <Clock className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Cri-sis), քանի որ վերջանում է "s"-ով:' },
  { id: 13, spanish: 'Lunes', armenian: 'Երկուշաբթի', icon: <Calendar className="w-20 h-20" />, stressRule: 'Շեշտը նախավերջին վանկի վրա է (Lu-nes), քանի որ վերջանում է "s"-ով:' },
  { id: 14, spanish: 'Papel', armenian: 'Թուղթ', icon: <ScrollText className="w-20 h-20" />, stressRule: 'Շեշտը վերջին վանկի վրա է (Pa-pel), քանի որ վերջանում է բաղաձայնով (բացի n, s):' },
  { id: 15, spanish: 'Hablar', armenian: 'Խոսել', icon: <MessageSquare className="w-20 h-20" />, stressRule: 'Շեշտը վերջին վանկի վրա է (Ha-blar), քանի որ վերջանում է բաղաձայնով (բացի n, s):' },
  { id: 16, spanish: 'Comer', armenian: 'Ուտել', icon: <Utensils className="w-20 h-20" />, stressRule: 'Շեշտը վերջին վանկի վրա է (Co-mer), քանի որ վերջանում է բաղաձայնով (բացի n, s):' },
  { id: 17, spanish: 'Vivir', armenian: 'Ապրել', icon: <Home className="w-20 h-20" />, stressRule: 'Շեշտը վերջին վանկի վրա է (Vi-vir), քանի որ վերջանում է բաղաձայնով (բացի n, s):' },
  { id: 18, spanish: 'Ciudad', armenian: 'Քաղաք', icon: <Building2 className="w-20 h-20" />, stressRule: 'Շեշտը վերջին վանկի վրա է (Ciu-dad), քանի որ վերջանում է բաղաձայնով (բացի n, s):' },
  { id: 19, spanish: 'Verdad', armenian: 'Ճշմարտություն', icon: <ShieldCheck className="w-20 h-20" />, stressRule: 'Շեշտը վերջին վանկի վրա է (Ver-dad), քանի որ վերջանում է բաղաձայնով (բացի n, s):' },
  { id: 20, spanish: 'Azul', armenian: 'Կապույտ', icon: <Palette className="w-20 h-20" />, stressRule: 'Շեշտը վերջին վանկի վրա է (A-zul), քանի որ վերջանում է բաղաձայնով (բացի n, s):' },
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const currentItem = QUIZ_DATA[currentIdx];

  useEffect(() => {
    if (currentItem) {
      const others = QUIZ_DATA
        .filter(item => item.id !== currentItem.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map(item => item.spanish);
      
      const options = [...others, currentItem.spanish].sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
      setSelectedOption(null);
      setFeedback(null);
    }
  }, [currentIdx]);

  const handleOptionSelect = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption || feedback) return;
    if (selectedOption === currentItem.spanish) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_DATA.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const progress = ((currentIdx + 1) / QUIZ_DATA.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex items-center justify-center p-6 font-sans text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center max-w-md w-full shadow-2xl"
        >
          <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl font-bold mb-4">Գերազանց է!</h1>
          <p className="text-xl opacity-90 mb-8">Դուք սովորեցիք իսպաներենի շեշտադրման հիմնական կանոնները:</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-[#1e40af] rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Սկսել նորից
          </button>
        </motion.div>
      </div>
    );
  }

  if (lives === 0) {
    return (
      <div className="min-h-screen bg-[#38bdf8] flex items-center justify-center p-6 font-sans text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center max-w-md w-full"
        >
          <XCircle className="w-24 h-24 mx-auto mb-6 text-red-400" />
          <h1 className="text-4xl font-bold mb-4">Խաղն ավարտվեց</h1>
          <p className="text-xl opacity-90 mb-8">Փորձեք ևս մեկ անգամ սովորել բառերը:</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-[#1e40af] rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all"
          >
            Կրկնել
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center gap-4 max-w-2xl mx-auto w-full">
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>

        <div className="relative">
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full border border-white/30">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-bold text-lg text-white">{lives}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-4 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold text-center mb-6 text-white drop-shadow-sm">
          Ընտրեք ճիշտ թարգմանությունը
        </h2>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Card matching screenshot */}
            <div className="w-full aspect-square max-w-[280px] bg-[#fff1f2] rounded-[32px] flex flex-col items-center justify-center shadow-2xl mb-6 relative overflow-hidden border-4 border-white/50">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="grid grid-cols-4 gap-6 p-6">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-red-900" />
                  ))}
                </div>
              </div>
              
              <div className="text-red-800/80 z-10">
                {currentItem.icon}
              </div>

              {/* Speaker icon */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-[#38bdf8] p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Source Word */}
            <div className="text-3xl font-bold mb-8 text-center text-white drop-shadow-md">
              {currentItem.armenian}
            </div>

            {/* Options */}
            <div className="w-full space-y-4 max-w-[340px]">
              {shuffledOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-lg transition-all border-b-4
                    ${selectedOption === option 
                      ? 'bg-white text-[#1e40af] border-white scale-[1.02]' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {option.toLowerCase()}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 max-w-2xl mx-auto w-full">
        <button 
          onClick={feedback ? handleNext : handleCheck}
          disabled={!selectedOption}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl uppercase tracking-wider border-b-4
            ${!selectedOption 
              ? 'bg-white/20 text-white/50 border-transparent cursor-not-allowed' 
              : 'bg-[#1e40af] text-white border-[#1e3a8a] hover:bg-[#1e3a8a] active:scale-[0.98]'
            }`}
        >
          {feedback ? 'Շարունակել' : 'Ստուգել'}
        </button>
      </footer>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className={`fixed bottom-0 left-0 right-0 p-8 pb-10 z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]
              ${feedback === 'correct' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`}
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl">
                  {feedback === 'correct' ? (
                    <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                  ) : (
                    <XCircle className="w-8 h-8 text-[#ef4444]" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է'}
                  </h3>
                  <p className="text-white/90 font-medium">
                    {feedback === 'correct' 
                      ? 'Գերազանց աշխատանք:' 
                      : `Ճիշտ տարբերակը՝ ${currentItem.spanish}`}
                  </p>
                  <p className="text-xs text-white/70 mt-1 max-w-[200px]">
                    {currentItem.stressRule}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleNext}
                className="bg-white text-black px-6 py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg"
              >
                Շարունակել
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
