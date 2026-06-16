import { Screen, DailyLog } from '../types';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Moon, 
  Activity, 
  Home, 
  User, 
  Dumbbell, 
  Plus, 
  CloudLightning, 
  Lightbulb, 
  DollarSign, 
  UtensilsCrossed, 
  Waves, 
  CloudUpload, 
  Check 
} from 'lucide-react';
import { useState } from 'react';

interface RecordsInsightsProps {
  onNavigate: (screen: Screen, hasTransition?: boolean) => void;
  walks: number;
  calories: number;
  sleepHours: string;
}

export default function RecordsInsights({
  onNavigate,
  walks,
  calories,
  sleepHours
}: RecordsInsightsProps) {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('day');

  // Daily log lists
  const dailyLogs: DailyLog[] = [
    {
      id: 'log1',
      title: '아침 유산소',
      category: 'exercise',
      timeString: '오전 7:30 • 45분',
      valueString: '420 kcal',
      statusString: '완료',
      icon: 'fitness_center'
    },
    {
      id: 'log2',
      title: '고단백 점심',
      category: 'food',
      timeString: '오후 1:15 • 기록됨',
      valueString: '650 kcal',
      statusString: '자동 동기화',
      icon: 'restaurant'
    },
    {
      id: 'log3',
      title: '수면 세션',
      category: 'sleep',
      timeString: '어제 • 30분',
      valueString: '310 kcal',
      statusString: '완료',
      icon: 'pool'
    }
  ];

  return (
    <div className="space-y-6 pb-28 animate-fade-in">
      {/* Period Selector row */}
      <section className="flex bg-[#1c1b1b] p-1 rounded-xl border border-zinc-900">
        {(['day', 'week', 'month', 'year'] as const).map((curr) => {
          const labels = { day: '일', week: '주', month: '월', year: '년' };
          const isActive = curr === period;
          return (
            <button
              key={curr}
              onClick={() => setPeriod(curr)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isActive 
                  ? 'bg-brand-lime text-black font-semibold shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {labels[curr]}
            </button>
          );
        })}
      </section>

      {/* Horizontal calendar day cards */}
      <section className="relative overflow-x-auto scrollbar-none py-1">
        <div className="flex gap-4">
          {[
            { label: '월', num: 12, active: false },
            { label: '화', num: 13, active: false },
            { label: '수', num: 14, active: true },
            { label: '목', num: 15, active: false },
            { label: '금', num: 16, active: false },
            { label: '토', num: 17, active: false },
            { label: '일', num: 18, active: false }
          ].map((day, idx) => (
            <div 
              key={idx}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                day.active 
                  ? 'bg-brand-lime text-black border-brand-lime w-12 h-16 shadow-[0_0_12px_rgba(171,214,0,0.3)]' 
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 w-11 h-15'
              }`}
            >
              <span className="text-[10px] font-bold font-mono tracking-tight">{day.label}</span>
              <span className="text-base font-extrabold mt-1 font-mono leading-none">{day.num}</span>
              {day.active && <div className="w-1 h-1 bg-black rounded-full mt-1"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Cumulative Stats list */}
      <section className="grid grid-cols-2 gap-4">
        {/* Cumulative Walks */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-5 rounded-2xl col-span-2">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold tracking-widest text-zinc-500 font-mono uppercase">총 걸음 수</span>
            <span className="text-[10px] font-extrabold font-mono text-brand-lime">TARGET REACHED</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white tracking-tight">{walks.toLocaleString()}</span>
            <span className="text-xs font-bold text-zinc-500 font-mono">/ 10,000</span>
          </div>
          <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-lime rounded-full shadow-[0_0_8px_rgba(171,214,0,0.5)]" 
              style={{ width: `${(walks / 10000) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Calories Burned */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl">
          <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase block mb-1">총 소모 칼로리</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-white font-mono">{calories.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-zinc-400 font-mono">KCAL</span>
          </div>
        </div>

        {/* Average sleeping time */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl">
          <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase block mb-1">평균 수면 시간</span>
          <div className="flex items-baseline gap-1.5 text-brand-lime">
            <span className="text-sm font-extrabold text-[#e5e2e1]">{sleepHours}</span>
            <Moon className="w-3.5 h-3.5 text-brand-lime" />
          </div>
        </div>
      </section>

      {/* Activities bar chart */}
      <section className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-white">활동 프로필</h3>
          <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase">최근 7일</span>
        </div>

        <div className="flex items-end justify-between h-32 pt-2 gap-2">
          {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => {
            const h = [60, 45, 85, 30, 55, 90, 40][i];
            const isWed = i === 2; // Wed is active day
            return (
              <div key={day} className="flex-1 flex flex-col items-center group cursor-pointer">
                <div className="w-full bg-zinc-800 h-20 rounded-t-sm relative">
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-sm transition-all ${
                      isWed 
                        ? 'bg-brand-lime shadow-[0_0_10px_rgba(171,214,0,0.5)]' 
                        : 'bg-brand-lime/20 group-hover:bg-brand-lime/40'
                    }`}
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
                <span className={`text-[9px] font-semibold font-mono uppercase mt-2 ${isWed ? 'text-brand-lime font-extrabold' : 'text-zinc-500'}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Records Feed log */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">최근 기록</h3>
          <button className="flex items-center gap-1.5 text-brand-lime hover:opacity-8 w-fit text-xs font-bold outline-none cursor-pointer">
            <CloudUpload className="w-4 h-4" />
            <span>리포트</span>
          </button>
        </div>

        <div className="space-y-3">
          {dailyLogs.map((log) => (
            <div 
              key={log.id}
              className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/40 p-4 rounded-xl flex items-center justify-between hover:border-brand-lime/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-brand-lime">
                  {log.icon === 'fitness_center' && <Dumbbell className="w-5 h-5 text-brand-lime" />}
                  {log.icon === 'restaurant' && <UtensilsCrossed className="w-5 h-5 text-brand-lime" />}
                  {log.icon === 'pool' && <Waves className="w-5 h-5 text-brand-lime" />}
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">{log.title}</p>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">{log.timeString}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-white font-mono text-sm md:text-base">{log.valueString}</p>
                <p className="text-[10px] font-bold text-brand-lime font-mono">{log.statusString}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Insights banner */}
      <section className="relative overflow-hidden p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-lime/10 border border-brand-lime/20 rounded-full">
            <Lightbulb className="w-3.5 h-3.5 text-brand-lime" />
            <span className="text-[9px] font-bold text-brand-lime font-mono tracking-wider uppercase">스마트 인사이트</span>
          </div>
          <h2 className="text-xl font-bold text-white leading-snug">지난 7일 평균보다 12% 더 활동적입니다!</h2>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-sm">
            주로 오전 7시에서 9시 사이에 최고의 성과를 보입니다. 더 나은 결과를 위해 이 꾸준함을 유지하세요.
          </p>
          <button 
            onClick={() => onNavigate(Screen.ACTIVITY, true)}
            className="bg-brand-lime hover:bg-brand-lime-bright text-black font-bold text-xs py-2.5 px-5 rounded-full transition-all outline-none"
          >
            전체 분석 보기
          </button>
        </div>
      </section>

      {/* Nav button section specifications:
          //nav//button//span[text()='home']/.. -> 홈 대시보드
          //nav//button//span[text()='bedtime']/.. -> 수면 분석
          //nav//button//span[text()='person']/.. -> 사용자 프로필
      */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#201f1f]/90 backdrop-blur-xl border-t border-zinc-800/60 rounded-t-2xl">
        <button 
          onClick={() => onNavigate(Screen.HOME, false)} 
          className="flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-transform"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="sr-only">home</span>
          <span className="text-[10px] font-bold">홈</span>
        </button>
        
        <button 
          onClick={() => onNavigate(Screen.ACTIVITY, false)} 
          className="flex flex-col items-center justify-center px-4 py-1.5 bg-brand-lime text-black rounded-full transition-transform scale-95"
        >
          <Dumbbell className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono font-bold">활동</span>
        </button>
        
        <button 
          onClick={() => onNavigate(Screen.SLEEP, false)} 
          className="flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-transform"
        >
          <Moon className="w-5 h-5 mb-0.5" />
          <span className="sr-only">bedtime</span>
          <span className="text-[10px] font-bold">수면</span>
        </button>
        
        <button 
          onClick={() => onNavigate(Screen.PROFILE, false)} 
          className="flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-transform"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="sr-only">person</span>
          <span className="text-[10px] font-bold">프로필</span>
        </button>
      </nav>
    </div>
  );
}
