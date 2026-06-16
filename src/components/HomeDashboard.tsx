import { Screen } from '../types';
import { motion } from 'motion/react';
import { 
  Bell, 
  Footprints, 
  TrendingUp, 
  Moon, 
  Flame, 
  Dumbbell, 
  ChevronRight, 
  Plus 
} from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (screen: Screen, hasTransition?: boolean) => void;
  walks: number;
  maxWalks: number;
  sleepHours: string;
  calories: number;
  maxCalories: number;
  onOpenQuickAdd: () => void;
}

export default function HomeDashboard({
  onNavigate,
  walks,
  maxWalks,
  sleepHours,
  calories,
  maxCalories,
  onOpenQuickAdd
}: HomeDashboardProps) {

  // SVG Circular progress math
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(walks, maxWalks) / maxWalks) * circumference;

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Greeting Section */}
      <section className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#e5e2e1] tracking-tight">
          좋은 아침입니다, 용재님
        </h1>
        <p className="text-sm md:text-base text-zinc-400">
          오늘 목표의 82%를 달성했습니다.
        </p>
      </section>

      {/* Main Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Walk Steps Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
          <div className="w-full flex justify-between items-start">
            <span className="text-xs font-bold tracking-widest text-zinc-400 font-mono uppercase">걸음</span>
            <Footprints className="w-6 h-6 text-brand-lime" />
          </div>

          {/* SVG Circular Progress Chart */}
          <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
            <svg height={radius * 2} width={radius * 2} className="-rotate-90">
              {/* Background circle */}
              <circle
                stroke="#1f2937"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Active animated circle */}
              <motion.circle
                stroke="#abd600"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">{walks.toLocaleString()}</span>
              <span className="text-[11px] font-bold text-zinc-500 font-mono">/ {maxWalks.toLocaleString()}</span>
            </div>
          </div>

          <div className="w-full flex justify-center pt-2">
            <span className="text-xs font-semibold text-brand-lime flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> 어제보다 12% 증가
            </span>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          {/* Level 3: Sleep Card container clickable */}
          <div 
            onClick={() => onNavigate(Screen.SLEEP_DETAILS, true)}
            className="cursor-pointer bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-5 hover:border-brand-lime/30 transition-colors group relative flex flex-col justify-between min-h-[142px]"
          >
            {/* Level 2: Inner Content Wrapper */}
            <div className="space-y-3">
              {/* Level 1: Title Row Wrapper */}
              <div className="flex justify-between items-start">
                {/* Level 0: Title Span */}
                <span className="text-xs font-bold tracking-widest text-zinc-400 font-mono uppercase">수면 성과</span>
                <Moon className="w-5 h-5 text-zinc-400 group-hover:text-brand-lime transition-colors" />
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">{sleepHours}</span>
              </div>
            </div>

            {/* Sleep Mini Bar Chart */}
            <div className="h-6 w-full flex items-end gap-1.5 pt-2">
              <div className="bg-zinc-800 w-full h-[50%] rounded-sm"></div>
              <div className="bg-zinc-800 w-full h-[40%] rounded-sm"></div>
              <div className="bg-zinc-800 w-full h-[70%] rounded-sm"></div>
              <div className="bg-brand-lime w-full h-[90%] rounded-sm shadow-[0_0_8px_rgba(171,214,0,0.5)]"></div>
              <div className="bg-zinc-800 w-full h-[60%] rounded-sm"></div>
              <div className="bg-zinc-800 w-full h-[45%] rounded-sm"></div>
              <div className="bg-zinc-800 w-full h-[80%] rounded-sm"></div>
            </div>
          </div>

          {/* Calories Card */}
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between min-h-[142px]">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest text-zinc-400 font-mono uppercase">에너지 소모량</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{calories}</span>
                  <span className="text-xs font-bold text-zinc-500 font-mono">kcal</span>
                </div>
              </div>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>

            <div className="pt-2">
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-lime h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(171,214,0,0.4)]"
                  style={{ width: `${(calories / maxCalories) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Schedule Section */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-mono uppercase">다음 일정</h3>
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 hover:border-brand-lime/20 cursor-pointer transition-colors">
          <div className="w-12 h-12 rounded-xl bg-brand-lime/10 flex items-center justify-center border border-brand-lime/20 flex-shrink-0">
            <Dumbbell className="w-6 h-6 text-brand-lime" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#e5e2e1] truncate text-base">고강도 인터벌 트레이닝</p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">예정 시간: 오늘 오후 5:30</p>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500" />
        </div>
      </section>

      {/* FAB Quick Action */}
      <button 
        onClick={onOpenQuickAdd}
        className="fixed bottom-24 right-5 w-14 h-14 bg-brand-lime text-black rounded-2xl flex items-center justify-center shadow-xl z-40 hover:scale-105 active:scale-95 transition-all outline-none"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
