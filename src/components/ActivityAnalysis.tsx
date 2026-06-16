import { Screen, Workout } from '../types';
import { motion } from 'motion/react';
import { 
  Footprints, 
  Timer, 
  Flame, 
  TrendingUp, 
  Map, 
  Compass, 
  Dumbbell, 
  Layers 
} from 'lucide-react';

interface ActivityAnalysisProps {
  onNavigate: (screen: Screen, hasTransition?: boolean) => void;
  walks: number;
  activityMinutes: number;
  calories: number;
  workouts: Workout[];
}

export default function ActivityAnalysis({
  onNavigate,
  walks,
  activityMinutes,
  calories,
  workouts
}: ActivityAnalysisProps) {

  // Radial progress
  const radius = 96;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (0.82) * circumference; // Fixed 82% as mockup

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Daily Goal Hero Block */}
      <section className="flex flex-col items-center py-2">
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
              stroke="#c3f400"
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
            <span className="text-[10px] font-bold tracking-wider text-zinc-500 font-mono uppercase">일일 목표</span>
            <span className="text-4xl font-extrabold text-white mt-1">82%</span>
            <span className="text-xs font-medium text-zinc-400 mt-2">거의 다 왔어요</span>
          </div>
        </div>
      </section>

      {/* Primary Metrics Row */}
      <section className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <Footprints className="w-5 h-5 text-brand-lime mb-1" />
          <span className="text-lg font-bold text-[#e5e2e1] font-mono tracking-tight">{walks.toLocaleString()}</span>
          <span className="text-[10px] font-bold text-zinc-500 font-mono">걸음</span>
        </div>
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-brand-lime/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <Timer className="w-5 h-5 text-brand-lime mb-1" />
          <span className="text-lg font-bold text-brand-lime font-mono tracking-tight">{activityMinutes}m</span>
          <span className="text-[10px] font-bold text-zinc-500 font-mono">활동</span>
        </div>
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <Flame className="w-5 h-5 text-brand-lime mb-1" />
          <span className="text-lg font-bold text-[#e5e2e1] font-mono tracking-tight">{calories}</span>
          <span className="text-[10px] font-bold text-zinc-500 font-mono">칼로리</span>
        </div>
      </section>

      {/* Weekly Activity Bar Chart */}
      <section className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-5 rounded-2xl">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-lg font-bold text-[#e5e2e1]">주간 활동</h2>
            <p className="text-xs text-zinc-400 font-mono">일일 움직임 트렌드</p>
          </div>
          <div className="flex items-center gap-1 text-brand-lime">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold font-mono">+12%</span>
          </div>
        </div>

        {/* 7 Days Bar charts */}
        <div className="flex justify-between items-end h-28 gap-2">
          {/* Mon */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-800 rounded-full h-20 overflow-hidden relative">
              <div className="absolute bottom-0 w-full bg-brand-lime/40 h-[75%] rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 font-mono">월</span>
          </div>
          {/* Tue */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-800 rounded-full h-20 overflow-hidden relative">
              <div className="absolute bottom-0 w-full bg-brand-lime/40 h-[50%] rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 font-mono">화</span>
          </div>
          {/* Wed - ACTIVE bar */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-800 rounded-full h-20 overflow-hidden relative">
              <div className="absolute bottom-0 src-active w-full bg-brand-lime h-full rounded-full shadow-[0_0_8px_rgba(171,214,0,0.6)]"></div>
            </div>
            <span className="text-[10px] font-extrabold text-[#e5e2e1] font-mono">수</span>
          </div>
          {/* Thu */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-800 rounded-full h-20 overflow-hidden relative">
              <div className="absolute bottom-0 w-full bg-brand-lime/40 h-[90%] rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 font-mono">목</span>
          </div>
          {/* Fri */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-800 rounded-full h-20 overflow-hidden relative">
              <div className="absolute bottom-0 w-full bg-brand-lime/40 h-[65%] rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 font-mono">금</span>
          </div>
          {/* Sat */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-800 rounded-full h-20 overflow-hidden relative">
              <div className="absolute bottom-0 w-full bg-brand-lime/40 h-[40%] rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 font-mono">토</span>
          </div>
          {/* Sun */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-zinc-800 rounded-full h-20 overflow-hidden relative">
              <div className="absolute bottom-0 w-full bg-brand-lime/40 h-[15%] rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 font-mono">일</span>
          </div>
        </div>
      </section>

      {/* Secondary Detailed Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <Map className="w-5 h-5 text-brand-lime" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-zinc-400 font-mono uppercase block">거리</span>
            <span className="text-base font-bold text-white font-mono">6.4 km</span>
          </div>
        </div>
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <Compass className="w-5 h-5 text-brand-lime" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-zinc-400 font-mono uppercase block">평균 페이스</span>
            <span className="text-base font-bold text-white font-mono">5&apos;42&quot;/km</span>
          </div>
        </div>
      </section>

      {/* Recent Workouts */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white tracking-tight">최근 운동</h3>
          <button 
            onClick={() => onNavigate(Screen.RECORDS_INSIGHTS, true)}
            className="text-xs font-bold text-brand-lime hover:underline cursor-pointer"
          >
            전체 보기
          </button>
        </div>

        <div className="space-y-3">
          {workouts.map((workout) => (
            <div 
              key={workout.id}
              className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl flex items-center justify-between group hover:border-brand-lime/20 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-lime/10 flex items-center justify-center border border-brand-lime/20 group-hover:bg-brand-lime/20 transition-colors">
                  <Dumbbell className="w-5 h-5 text-brand-lime" />
                </div>
                <div>
                  <span className="font-bold text-white text-base block">{workout.name}</span>
                  <span className="text-xs text-zinc-400 font-mono mt-0.5">{workout.timeString} • {workout.durationMinutes}분</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-white font-mono block">{workout.caloriesBurned} kcal</span>
                <span className="text-[10px] font-bold text-zinc-500 font-mono">{workout.intensity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
