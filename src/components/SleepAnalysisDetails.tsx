import { Screen } from '../types';
import { motion } from 'motion/react';
import { 
  Info, 
  Lightbulb, 
  Moon, 
  Heart, 
  Settings, 
  Activity, 
  Clock, 
  Zap, 
  TrendingUp, 
  ChevronRight,
  Home,
  Dumbbell,
  User
} from 'lucide-react';

interface SleepAnalysisDetailsProps {
  onNavigate: (screen: Screen, hasTransition?: boolean) => void;
  sleepHours: string;
  sleepScore: number;
  sleepEfficiency: number;
  restingHeartRate: number;
}

export default function SleepAnalysisDetails({
  onNavigate,
  sleepHours,
  sleepScore,
  sleepEfficiency,
  restingHeartRate
}: SleepAnalysisDetailsProps) {

  const radius = 96;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (sleepScore / 100) * circumference;

  return (
    <div className="space-y-6 pb-28 animate-fade-in">
      {/* Sleep Score Gauge Section */}
      <section className="relative flex flex-col items-center py-4 bg-gradient-to-b from-brand-lime/10 to-transparent rounded-2xl">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg height={radius * 2} width={radius * 2} className="-rotate-90">
            <circle
              stroke="#1f2937"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#abd600"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-brand-lime tracking-tight font-mono">{sleepScore}</span>
            <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase mt-1">우수함</span>
          </div>
        </div>
        <p className="text-base font-bold text-white mt-4 font-mono">최적의 회복 달성</p>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <Clock className="w-5 h-5 text-brand-lime mb-1" />
          <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase">수면 시간</span>
          <span className="text-[#e5e2e1] font-bold text-sm mt-0.5">{sleepHours}</span>
        </div>
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-0.5">
          <Zap className="w-5 h-5 text-brand-lime mb-1" />
          <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase">효율</span>
          <span className="text-[#e5e2e1] font-bold text-sm mt-0.5">{sleepEfficiency}%</span>
        </div>
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-3 rounded-xl flex flex-col items-center justify-center text-center space-y-0.5">
          <Heart className="w-5 h-5 text-brand-lime mb-1" />
          <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase">안정 시 심박수</span>
          <span className="text-[#e5e2e1] font-bold text-sm mt-0.5">{restingHeartRate} bpm</span>
        </div>
      </div>

      {/* Sleep Stages Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <h3 className="text-base font-bold text-white">수면 단계</h3>
          <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase">어젯밤</span>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-5 rounded-2xl">
          {/* Dense chart representation of cycles */}
          <div className="h-36 flex items-end justify-between gap-[3px] mb-4">
            <div className="w-[8%] bg-brand-lime h-[20%] rounded-t-sm" title="Awake"></div>
            <div className="w-[12%] bg-zinc-600 h-[60%] rounded-t-sm" title="Light"></div>
            <div className="w-[15%] bg-zinc-800 h-[85%] rounded-t-sm" title="Deep"></div>
            <div className="w-[10%] bg-brand-lime/75 h-[45%] rounded-t-sm" title="REM"></div>
            <div className="w-[14%] bg-zinc-600 h-[65%] rounded-t-sm" title="Light"></div>
            <div className="w-[15%] bg-zinc-800 h-[90%] rounded-t-sm" title="Deep"></div>
            <div className="w-[10%] bg-brand-lime/75 h-[50%] rounded-t-sm" title="REM"></div>
            <div className="w-[12%] bg-zinc-600 h-[70%] rounded-t-sm" title="Light"></div>
            <div className="w-[8%] bg-brand-lime/75 h-[40%] rounded-t-sm" title="REM"></div>
            <div className="w-[11%] bg-zinc-600 h-[55%] rounded-t-sm" title="Light"></div>
            <div className="w-[16%] bg-zinc-800 h-[80%] rounded-t-sm" title="Deep"></div>
            <div className="w-[10%] bg-brand-lime/75 h-[45%] rounded-t-sm" title="REM"></div>
            <div className="w-[12%] bg-zinc-600 h-[60%] rounded-t-sm" title="Light"></div>
            <div className="w-[6%] bg-brand-lime h-[15%] rounded-t-sm" title="Awake"></div>
          </div>

          <div className="flex justify-between text-zinc-500 font-semibold font-mono text-[9px] uppercase">
            <span>11:00 PM</span>
            <span>2:00 AM</span>
            <span>5:00 AM</span>
            <span>7:42 AM</span>
          </div>
        </div>
      </section>

      {/* Detailed breakdowns */}
      <section className="space-y-3">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-5 rounded-2xl space-y-4">
          {/* Deep sleep */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
                <span className="font-bold text-white text-sm">깊은 수면</span>
              </div>
              <span className="font-mono text-white text-sm font-bold">1h 12m</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-500 w-[80%] rounded-full"></div>
            </div>
            <div className="flex justify-between text-zinc-500 font-mono text-[9px] font-bold">
              <span>목표: 1h 30m</span>
              <span>80% 달성</span>
            </div>
          </div>

          {/* REM sleep */}
          <div className="space-y-2 pt-2 border-t border-zinc-800/60">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-lime"></div>
                <span className="font-bold text-white text-sm">렘 수면</span>
              </div>
              <span className="font-mono text-white text-sm font-bold">2h 05m</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-lime w-[100%] rounded-full shadow-[0_0_8px_rgba(171,214,0,0.4)]"></div>
            </div>
            <div className="flex justify-between text-zinc-500 font-mono text-[9px] font-bold">
              <span>목표: 2h 00m</span>
              <span>104% 달성</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sleep Insight Card */}
      <section className="relative overflow-hidden rounded-xl border border-brand-lime/20 bg-brand-lime/5 p-5">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-lime text-black flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-brand-lime text-sm">수면 인사이트</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              수면 패턴이 일관되게 개선되고 있습니다. &apos;최상&apos; 점수에 도달하려면 오늘 밤 실내 온도를 2°C 낮춰 보세요. 시원한 환경은 깊은 수면 단계로 더 빠르게 진입하도록 도와줍니다.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation spec:
          //nav//button//span[text()='home']/.. -> 홈 대시보드
          //nav//button//span[text()='fitness_center']/.. -> 활동 분석
          //nav//button//span[text()='person']/.. -> 사용자 프로필
      */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#201f1f]/90 backdrop-blur-xl border-t border-zinc-800/60 rounded-t-2xl">
        <button 
          onClick={() => onNavigate(Screen.HOME, false)} 
          className="flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-transform"
        >
          <Home className="w-5 h-5" />
          <span className="sr-only">home</span>
          <span className="text-[10px] font-medium mt-1">홈</span>
        </button>
        
        <button 
          onClick={() => onNavigate(Screen.ACTIVITY, false)} 
          className="flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-transform"
        >
          <Dumbbell className="w-5 h-5" />
          <span className="sr-only">fitness_center</span>
          <span className="text-[10px] font-medium mt-1">활동</span>
        </button>
        
        <button 
          onClick={() => onNavigate(Screen.SLEEP, false)} 
          className="flex flex-col items-center justify-center px-4 py-1.5 bg-brand-lime text-black rounded-full transition-transform scale-95 font-semibold"
        >
          <Moon className="w-5 h-5" />
          <span className="text-[10px] font-mono font-bold">수면</span>
        </button>
        
        <button 
          onClick={() => onNavigate(Screen.PROFILE, false)} 
          className="flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-transform"
        >
          <User className="w-5 h-5" />
          <span className="sr-only">person</span>
          <span className="text-[10px] font-medium mt-1">프로필</span>
        </button>
      </nav>
    </div>
  );
}
