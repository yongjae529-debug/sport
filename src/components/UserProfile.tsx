import { Screen } from '../types';
import { motion } from 'motion/react';
import { 
  Pencil, 
  TrendingUp, 
  Award, 
  Flame, 
  Zap, 
  Target, 
  User, 
  BellRing, 
  Lock, 
  ChevronRight, 
  Sparkles, 
  ShieldAlert 
} from 'lucide-react';

interface UserProfileProps {
  onNavigate: (screen: Screen, hasTransition?: boolean) => void;
  monthlyWorkouts: number;
  currentGoal: string;
  onLogout: () => void;
}

export default function UserProfile({
  onNavigate,
  monthlyWorkouts,
  currentGoal,
  onLogout
}: UserProfileProps) {

  // Achievements data
  const achievements = [
    { title: '얼리버드', active: true, icon: Award },
    { title: '30일 연속', active: true, icon: Flame },
    { title: '번개 페이스', active: false, icon: Zap },
    { title: '백인대장', active: false, icon: Sparkles },
  ];

  return (
    <div className="space-y-6 pb-24 animate-fade-inEdge">
      {/* User Header Section */}
      <section className="flex flex-col items-center py-4">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full border-4 border-brand-lime p-1 select-none">
            <img 
              alt="사용자 프로필 크게" 
              className="w-full h-full object-cover rounded-full" 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfo46qpopmhTqF_quQFjeYi0m3vBLPFJp4F_hkE07Pcb95Nbqb6Oom7woEGGKgcZy6eJce57VuGVaNQ6pob0D8hvToWYCXGQ8coyYdAS2iLY6hA9mcb0UHQLY34Wk8JiF_NuYWZkMp9aKZE-yFocIqhBqGFPFQ38c15yS08HPerqzeYdDvNKae0wM75Fhg9K4RQtGTufjvKTBI2xcqG0W4C2dm-2HzjAtFh_DAiUGvx_AjaoPm4O3mSa7BGl2RPF4r5HVbo6bmGC4"
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-brand-lime text-black p-1.5 rounded-full flex items-center justify-center border-2 border-[#131313] hover:scale-105 active:scale-95 transition-all outline-none">
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-white text-center">용재님</h2>
        <div className="flex items-center gap-2 text-zinc-400 font-semibold text-xs uppercase tracking-wider font-mono mt-1">
          <span>연령 28</span>
          <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
          <span>엘리트 레벨</span>
        </div>
      </section>

      {/* Profile Bento Cards */}
      <section className="grid grid-cols-2 gap-4">
        {/* Current Goal */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between h-32 border-l-4 border-l-brand-lime">
          <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase">현재 목표</span>
          <div className="mt-auto space-y-1">
            <p className="font-bold text-white text-base leading-snug">{currentGoal}</p>
            <p className="text-xs text-zinc-400 font-mono font-medium">85% 완료</p>
          </div>
        </div>

        {/* Workout Count */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-zinc-500 font-mono uppercase">운동 횟수</span>
            <TrendingUp className="w-4 h-4 text-brand-lime" />
          </div>
          <div className="mt-auto space-y-1">
            <span className="text-3xl font-extrabold text-white font-mono leading-none">{monthlyWorkouts}</span>
            <p className="text-xs text-zinc-400 font-mono">이번 달</p>
          </div>
        </div>
      </section>

      {/* Achievements Horizontal Grid */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">성취</h3>
          <button className="text-xs font-bold text-brand-lime hover:underline">전체 보기</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {achievements.map((achievement, idx) => {
            const IconComp = achievement.icon;
            return (
              <div key={idx} className={`flex-shrink-0 w-24 flex flex-col items-center gap-2 ${achievement.active ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${
                  achievement.active 
                    ? 'bg-zinc-800/80 border-brand-lime text-brand-lime shadow-lg shadow-brand-lime/10' 
                    : 'bg-zinc-900/50 border-zinc-800 border-dashed text-zinc-500'
                }`}>
                  <IconComp className="w-7 h-7" />
                </div>
                <span className="text-center text-xs font-medium text-zinc-300 tracking-tight leading-tight whitespace-nowrap">
                  {achievement.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Settings links */}
      <section className="space-y-2">
        <h3 className="text-[11px] font-bold tracking-widest text-zinc-500 font-mono uppercase mb-3 pl-1">설정</h3>
        
        {/* Account setting item */}
        <div className="flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800/60 rounded-xl hover:bg-zinc-800/40 cursor-pointer transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-brand-lime" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">계정</p>
              <p className="text-xs text-zinc-400 font-medium">개인 정보 및 구독 관리</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </div>

        {/* Notifications setting item */}
        <div className="flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800/60 rounded-xl hover:bg-zinc-800/40 cursor-pointer transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <BellRing className="w-5 h-5 text-brand-lime" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">알림</p>
              <p className="text-xs text-zinc-400 font-medium">리마인더, 경고 및 목표</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </div>

        {/* Privacy setting item */}
        <div className="flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800/60 rounded-xl hover:bg-zinc-800/40 cursor-pointer transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-brand-lime" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">개인정보 보호</p>
              <p className="text-xs text-zinc-400 font-medium">데이터 공유 및 연결된 앱</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-6 py-3.5 text-rose-500 font-bold hover:bg-rose-500/5 hover:border-rose-500/30 border border-zinc-800 rounded-xl transition-all outline-none"
        >
          로그아웃
        </button>
      </section>
    </div>
  );
}
