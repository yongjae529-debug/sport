import React, { useState } from 'react';
import { Screen, Workout } from './types';
import HomeDashboard from './components/HomeDashboard';
import SleepAnalysis from './components/SleepAnalysis';
import ActivityAnalysis from './components/ActivityAnalysis';
import UserProfile from './components/UserProfile';
import RecordsInsights from './components/RecordsInsights';
import SleepAnalysisDetails from './components/SleepAnalysisDetails';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Moon, 
  Dumbbell, 
  User, 
  Home, 
  Plus, 
  X, 
  Check,
  Zap,
  Flame,
  Footprints,
  Info
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const [hasAnimation, setHasAnimation] = useState(false);

  // Health and activity counts state
  const [walks, setWalks] = useState<number>(8432);
  const [calories, setCalories] = useState<number>(1200);
  const [sleepHoursNum, setSleepHoursNum] = useState<number>(7.7); // 7h 42m is 7.7
  const [restingHeartRate, setRestingHeartRate] = useState<number>(52);
  const [sleepScore, setSleepScore] = useState<number>(85);
  const [sleepEfficiency, setSleepEfficiency] = useState<number>(94);
  const [monthlyWorkouts, setMonthlyWorkouts] = useState<number>(24);
  const [currentGoal, setCurrentGoal] = useState<string>('마라톤 준비');

  // Workouts states
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 'w1',
      type: 'run',
      name: '저녁 러닝',
      timeString: '오늘, 5:30 PM',
      durationMinutes: 32,
      caloriesBurned: 240,
      intensity: '고강도',
      icon: 'cut'
    },
    {
      id: 'w2',
      type: 'body',
      name: '근력 운동',
      timeString: '어제, 8:15 AM',
      durationMinutes: 45,
      caloriesBurned: 185,
      intensity: '일정함',
      icon: 'fitness_center'
    }
  ]);

  // Modals & Panels open close states
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Quick Add Form Input states
  const [addSteps, setAddSteps] = useState('');
  const [addCalories, setAddCalories] = useState('');
  const [sleepInput, setSleepInput] = useState('');

  // Notifications active status
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: '오늘 심박수 트렌드가 아주 안정적입니다.', time: ' 방금 전', read: false },
    { id: 'n2', text: '수면 효율 리포트가 발행되었습니다.', time: ' 2시간 전', read: false },
    { id: 'n3', text: '매일 걷기 목표인 10,000보 달성까지 1,568보 남았습니다.', time: ' 4시간 전', read: true }
  ]);

  // Navigate handler supporting none/push transitions specifications
  const handleNavigate = (target: Screen, hasTransition = false) => {
    setHasAnimation(hasTransition);
    // Push transition implies animating on page slide-ins, simple navigation switches immediately
    setTransitionDirection(target === Screen.HOME ? 'backward' : 'forward');
    setCurrentScreen(target);
  };

  // Log Workout or metrics
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (addSteps && !isNaN(Number(addSteps))) {
      setWalks(prev => Math.min(prev + Number(addSteps), 25000));
    }
    if (addCalories && !isNaN(Number(addCalories))) {
      setCalories(prev => Math.min(prev + Number(addCalories), 5000));
    }
    if (sleepInput && !isNaN(Number(sleepInput))) {
      // Calculate new sleeping times
      const additionalSleep = Number(sleepInput);
      setSleepHoursNum(prev => Math.min(Number((prev + additionalSleep).toFixed(1)), 24));
    }

    // Reset input fields
    setAddSteps('');
    setAddCalories('');
    setSleepInput('');
    setIsQuickAddOpen(false);

    // Increase monthly counts slightly to show reaction
    setMonthlyWorkouts(prev => prev + 1);
  };

  // Convert hours numeric back to string format
  const getSleepHoursString = (num: number) => {
    const hours = Math.floor(num);
    const minutes = Math.round((num - hours) * 60);
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col font-sans selection:bg-brand-lime selection:text-black">
      
      {/* Universal Sticky TopAppBar / Header layout */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-5 py-4 w-full bg-[#131313]/80 backdrop-blur-xl border-b border-zinc-800/30">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => handleNavigate(Screen.PROFILE, false)}
            className="w-10 h-10 rounded-full overflow-hidden border border-zinc-800 cursor-pointer active:scale-95 transition-transform"
          >
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKGoCevnk82m_mspH8lQDnJwlfJsf5lWl7B1mvfEIyG3CztyKbO4mN3u-8CC8gK9VOSwefWbp2hiK8qJLKqSLjkkwSOHqPel9aq2OTzBAL2qjjX8aWHsPh2ycBpexEybKDQSkpaOxuWXScAvQql4H7Nfo2f_ad51j0obVcU-9g8JUrFCKWPglU2hnlXly-0Qq8qHDRqiEnlm6jIqJ7Lv-8KC-BekD-86K1-mwABkUXfbb8xyEK-E6YzJiqdwe1zjmRnyF5XlzVTq8" 
            />
          </div>
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-brand-lime uppercase select-none">
            VITALITY
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative p-1 text-zinc-400 hover:text-white transition-colors active:scale-95 duration-100 outline-none"
          >
            <Bell className="w-5 h-5" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-lime rounded-full shadow-[0_0_8px_rgba(171,214,0,0.8)]"></span>
            )}
          </button>
        </div>
      </header>

      {/* Notifications dropdown list overlay */}
      {showNotifications && (
        <div className="fixed top-16 right-5 left-5 md:left-auto md:w-80 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-2xl z-50 animate-fade-in space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold tracking-wider text-zinc-400 font-mono uppercase">알림 리스트</span>
            <button 
              onClick={() => setShowNotifications(false)}
              className="p-1 text-zinc-400 hover:text-white outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map(n => (
              <div 
                key={n.id} 
                onClick={() => {
                  setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                }}
                className={`p-2.5 rounded-lg text-xs leading-relaxed transition-colors cursor-pointer ${
                  n.read ? 'bg-transparent text-zinc-500' : 'bg-brand-lime/5 text-zinc-200 border-l border-brand-lime'
                }`}
              >
                <p>{n.text}</p>
                <span className="text-[10px] text-zinc-500 font-mono mt-1 block">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main View Container */}
      <main className="flex-1 px-5 pt-4 max-w-lg mx-auto w-full">
        {hasAnimation ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: transitionDirection === 'forward' ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: transitionDirection === 'forward' ? -30 : 30 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {renderActiveScreen()}
            </motion.div>
          </AnimatePresence>
        ) : (
          renderActiveScreen()
        )}
      </main>

      {/* Universal Navigation bar for major Screens list: HOME, SLEEP, ACTIVITY, PROFILE */}
      {isMajorScreen(currentScreen) && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#201f1f]/95 backdrop-blur-2xl border-t border-zinc-800/30 rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          {/* Home Nav */}
          <button 
            onClick={() => handleNavigate(Screen.HOME, false)}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 outline-none ${
              currentScreen === Screen.HOME 
                ? 'bg-[#c3f400] text-black px-4 py-1.5 font-bold scale-100' 
                : 'text-zinc-500 hover:text-[#e5e2e1]'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">홈</span>
          </button>

          {/* Activity Nav */}
          <button 
            onClick={() => handleNavigate(Screen.ACTIVITY, false)}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 outline-none ${
              currentScreen === Screen.ACTIVITY 
                ? 'bg-[#c3f400] text-black px-4 py-1.5 font-bold scale-100' 
                : 'text-zinc-500 hover:text-[#e5e2e1]'
            }`}
          >
            <Dumbbell className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">활동</span>
          </button>

          {/* Sleep Nav */}
          <button 
            onClick={() => handleNavigate(Screen.SLEEP, false)}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 outline-none ${
              currentScreen === Screen.SLEEP 
                ? 'bg-[#c3f400] text-black px-4 py-1.5 font-bold scale-100' 
                : 'text-zinc-500 hover:text-[#e5e2e1]'
            }`}
          >
            <Moon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">수면</span>
          </button>

          {/* Profile Nav */}
          <button 
            onClick={() => handleNavigate(Screen.PROFILE, false)}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 outline-none ${
              currentScreen === Screen.PROFILE 
                ? 'bg-[#c3f400] text-black px-4 py-1.5 font-bold scale-100' 
                : 'text-zinc-500 hover:text-[#e5e2e1]'
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">프로필</span>
          </button>
        </nav>
      )}

      {/* Quick Add Bottom Dialog Modal */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-950 border-t border-zinc-900 rounded-t-3xl p-6 space-y-6 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-lime" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">기록 간편 등록</h3>
              </div>
              <button 
                onClick={() => setIsQuickAddOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAdd} className="space-y-4">
              {/* Steps input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider text-zinc-400 font-mono uppercase pl-1">
                  걸음 수 추가 (+ 보)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    placeholder="예: 2500"
                    value={addSteps}
                    onChange={(e) => setAddSteps(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-brand-lime outline-none transition-colors"
                  />
                  <Footprints className="absolute right-4 top-3 w-4 h-4 text-zinc-600" />
                </div>
              </div>

              {/* Calories input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider text-zinc-400 font-mono uppercase pl-1">
                  칼로리 추가 (+ kcal)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    placeholder="예: 300"
                    value={addCalories}
                    onChange={(e) => setAddCalories(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-brand-lime outline-none transition-colors"
                  />
                  <Flame className="absolute right-4 top-3 w-4 h-4 text-zinc-600" />
                </div>
              </div>

              {/* Sleep input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider text-zinc-400 font-mono uppercase pl-1">
                  수면 시간 추가 (+ 시간)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.1"
                    placeholder="예: 1.5"
                    value={sleepInput}
                    onChange={(e) => setSleepInput(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-brand-lime outline-none transition-colors"
                  />
                  <Moon className="absolute right-4 top-3 w-4 h-4 text-zinc-600" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-brand-lime text-black font-extrabold rounded-xl transition-all hover:bg-brand-lime-bright select-none outline-none"
              >
                기록 추가하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Selector for Major navigation bar screens
  function isMajorScreen(screen: Screen): boolean {
    return [Screen.HOME, Screen.SLEEP, Screen.ACTIVITY, Screen.PROFILE].includes(screen);
  }

  // Active Screen Renderer
  function renderActiveScreen() {
    switch (currentScreen) {
      case Screen.HOME:
        return (
          <HomeDashboard 
            onNavigate={handleNavigate}
            walks={walks}
            maxWalks={10000}
            sleepHours={getSleepHoursString(sleepHoursNum)}
            calories={calories}
            maxCalories={2000}
            onOpenQuickAdd={() => setIsQuickAddOpen(true)}
          />
        );
      case Screen.SLEEP:
        return (
          <SleepAnalysis 
            onNavigate={handleNavigate}
            sleepHours={getSleepHoursString(sleepHoursNum)}
            sleepScore={sleepScore}
            sleepEfficiency={sleepEfficiency}
            restingHeartRate={restingHeartRate}
          />
        );
      case Screen.ACTIVITY:
        return (
          <ActivityAnalysis 
            onNavigate={handleNavigate}
            walks={walks}
            activityMinutes={42}
            calories={calories}
            workouts={workouts}
          />
        );
      case Screen.PROFILE:
        return (
          <UserProfile 
            onNavigate={handleNavigate}
            monthlyWorkouts={monthlyWorkouts}
            currentGoal={currentGoal}
            onLogout={() => {
              // Simple reset values as simulation
              setWalks(5210);
              setCalories(450);
              setMonthlyWorkouts(24);
              alert('계정 로그아웃 되었습니다.');
            }}
          />
        );
      case Screen.RECORDS_INSIGHTS:
        return (
          <RecordsInsights 
            onNavigate={handleNavigate}
            walks={walks}
            calories={calories}
            sleepHours={getSleepHoursString(sleepHoursNum)}
          />
        );
      case Screen.SLEEP_DETAILS:
        return (
          <SleepAnalysisDetails 
            onNavigate={handleNavigate}
            sleepHours={getSleepHoursString(sleepHoursNum)}
            sleepScore={sleepScore}
            sleepEfficiency={sleepEfficiency}
            restingHeartRate={restingHeartRate}
          />
        );
      default:
        return <div>Screen not found</div>;
    }
  }
}
