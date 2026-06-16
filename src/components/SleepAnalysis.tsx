import { Screen } from '../types';
import { motion } from 'motion/react';
import { 
  Info, 
  Lightbulb, 
  Moon, 
  Heart, 
  Settings, 
  Activity 
} from 'lucide-react';

interface SleepAnalysisProps {
  onNavigate: (screen: Screen, hasTransition?: boolean) => void;
  sleepHours: string;
  sleepScore: number;
  sleepEfficiency: number;
  restingHeartRate: number;
}

export default function SleepAnalysis({
  onNavigate,
  sleepHours,
  sleepScore,
  sleepEfficiency,
  restingHeartRate
}: SleepAnalysisProps) {

  const radius = 96;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Offset to show gauge based on the sleepScore out of 100
  const strokeDashoffset = circumference - (sleepScore / 100) * circumference;

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Hero Sleep Score Section */}
      <section className="relative flex flex-col items-center py-4 rounded-3xl overflow-hidden bg-gradient-to-b from-brand-lime/5 to-transparent">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Circular progress back / front */}
          <svg height={radius * 2} width={radius * 2} className="-rotate-90">
            <circle
              stroke="#1f2937"
              fill="none"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#abd600"
              fill="none"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center flex flex-col items-center">
            <span className="text-[10px] font-bold tracking-wider text-zinc-500 font-mono uppercase">수면 점수</span>
            <h1 className="text-5xl font-extrabold text-brand-lime mt-1 font-mono tracking-tight">{sleepScore}</h1>
            <span className="text-sm font-semibold text-zinc-400 mt-2">우수함</span>
          </div>
        </div>

        {/* Triple quick stats line */}
        <div className="mt-8 flex justify-around w-full max-w-md border-t border-zinc-800/60 pt-4 px-4 gap-2">
          <div className="text-center flex-1">
            <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase block mb-1">수면 시간</span>
            <p className="text-sm font-bold text-[#e5e2e1]">{sleepHours}</p>
          </div>
          <div className="text-center flex-1 border-x border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase block mb-1">효율</span>
            <p className="text-sm font-bold text-[#e5e2e1]">{sleepEfficiency}%</p>
          </div>
          <div className="text-center flex-1">
            <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase block mb-1">안정 시 심박수</span>
            <p className="text-sm font-bold text-[#e5e2e1]">{restingHeartRate} <span className="text-[10px] font-bold text-zinc-500 font-mono">bpm</span></p>
          </div>
        </div>
      </section>

      {/* Sleep Stages + Detailed Time Bento */}
      <section className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold tracking-wider text-zinc-400 font-mono uppercase">수면 단계</span>
            <Info className="w-4 h-4 text-brand-lime cursor-pointer" />
          </div>

          {/* Bar Chart representing cycles */}
          <div className="h-28 flex items-end gap-1.5 mb-3">
            <div className="flex-1 bg-zinc-800 h-[40%] rounded-t-sm" title="깊은 잠"></div>
            <div className="flex-1 bg-zinc-600 h-[60%] rounded-t-sm" title="가벼운 잠"></div>
            <div className="flex-1 bg-brand-lime h-[85%] rounded-t-sm" title="렘 수면"></div>
            <div className="flex-1 bg-zinc-600 h-[55%] rounded-t-sm" title="가벼운 잠"></div>
            <div className="flex-1 bg-zinc-700 h-[20%] rounded-t-sm" title="깸"></div>
            <div className="flex-1 bg-zinc-800 h-[35%] rounded-t-sm" title="깊은 잠"></div>
            <div className="flex-1 bg-brand-lime h-[75%] rounded-t-sm" title="렘 수면"></div>
            <div className="flex-1 bg-zinc-600 h-[50%] rounded-t-sm" title="가벼운 잠"></div>
          </div>

          <div className="flex justify-between text-[9px] font-semibold text-zinc-500 font-mono uppercase">
            <span>오후 11:00</span>
            <span>오전 2:00</span>
            <span>오전 4:00</span>
            <span>오전 7:00</span>
          </div>
        </div>

        {/* Deep Sleep Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl flex flex-col justify-between h-28">
          <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase">깊은 잠</span>
          <div>
            <h3 className="text-lg font-bold font-mono text-white">1시간 12분</h3>
            <div className="w-full h-1 bg-zinc-800 rounded-full mt-2">
              <div className="w-[30%] h-full bg-zinc-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* REM Sleep Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl flex flex-col justify-between h-28">
          <span className="text-[11px] font-bold text-zinc-400 font-mono uppercase">렘 수면</span>
          <div>
            <h3 className="text-lg font-bold font-mono text-brand-lime">2시간 05분</h3>
            <div className="w-full h-1 bg-zinc-800 rounded-full mt-2">
              <div className="w-[45%] h-full bg-brand-lime rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Day Trend Section */}
      <section className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-5 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-base font-bold text-white">수면 품질 트렌드</h2>
            <p className="text-xs text-zinc-500 font-mono">최근 7일</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-extrabold text-brand-lime font-mono">+4%</span>
            <p className="text-[9px] font-semibold text-zinc-500 font-mono uppercase">지난주 대비</p>
          </div>
        </div>

        {/* Mini Mon -> Sun bars */}
        <div className="flex items-end justify-between h-24 pt-2 gap-2">
          {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => {
            const h = [70, 85, 65, 90, 75, 80, 95][i];
            const isActive = i === 6; // Sunday active for this view
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="w-full bg-zinc-800 h-16 rounded-t-sm relative">
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-sm transition-all ${
                      isActive ? 'bg-brand-lime' : 'bg-zinc-700 group-hover:bg-brand-lime/40'
                    }`}
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
                <span className={`text-[9px] font-bold font-mono uppercase ${isActive ? 'text-brand-lime font-extrabold' : 'text-zinc-500'}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sleep Insights tip */}
      <section className="bg-zinc-950/60 border border-zinc-800 rounded-2xl overflow-hidden flex items-stretch">
        <div className="w-1.5 bg-brand-lime flex-shrink-0 animate-pulse"></div>
        <div className="p-4 flex gap-3">
          <Lightbulb className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-brand-lime font-mono uppercase">수면 인사이트</span>
            <p className="text-xs md:text-sm text-[#e5e2e1] leading-relaxed">
              일관된 기상 시간 덕분에 이번 주 렘 수면이 12% 향상되었습니다. 주말에도 이 리듬을 유지해 보세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
