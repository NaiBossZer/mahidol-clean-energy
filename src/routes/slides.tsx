import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Sun, BatteryCharging, Zap, Home, Info, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/slides')({
  component: KnowledgeFlowPage,
});

type SystemType = 'off-grid' | 'on-grid' | 'hybrid';

function KnowledgeFlowPage() {
  const [activeTab, setActiveTab] = useState<SystemType>('hybrid');

  // ข้อมูลจำลองพลังงานของแต่ละระบบ
  const systemData = {
    'off-grid': {
      title: '1. ระบบ Off-Grid (ระบบอิสระ)',
      desc: 'ผลิตไฟฟ้าจากโซลาร์เซลล์เก็บลงแบตเตอรี่ และจ่ายให้โหลดโดยตรง ไม่มีการเชื่อมต่อกับสายส่งการไฟฟ้า เหมาะกับพื้นที่ห่างไกล',
      pv: '2.500',
      battery: '1.200',
      grid: null, // ไม่มี Grid
      load: '3.700',
      hasGrid: false,
      hasBattery: true,
    },
    'on-grid': {
      title: '2. ระบบ On-Grid (ระบบเชื่อมต่อสายส่ง)',
      desc: 'ผลิตไฟฟ้าทำงานร่วมกับสายส่งการไฟฟ้าโดยตรง ไม่มีแบตเตอรี่ หากผลิตเกินสามารถขายคืนได้ และหากไม่พอจะดึงไฟจาก Grid มาช่วย',
      pv: '3.200',
      battery: null, // ไม่มี Battery
      grid: '0.500',
      load: '3.700',
      hasGrid: true,
      hasBattery: false,
    },
    'hybrid': {
      title: '3. ระบบ Hybrid (ระบบผสมผสาน)',
      desc: 'รวมข้อดีของ On-Grid และ Off-Grid เข้าด้วยกัน มีทั้งการเชื่อมต่อ Grid และสำรองไฟในแบตเตอรี่ ป้องกันไฟตกไฟดับได้ 100%',
      pv: '2.800',
      battery: '0.600',
      grid: '0.300',
      load: '3.700',
      hasGrid: true,
      hasBattery: true,
    },
  };

  const current = systemData[activeTab];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-medium">
            Knowledge Base
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            แผนผังแสดงการไหลของพลังงาน (Solar Flow Diagram)
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            เปรียบเทียบการทำงานของระบบโซลาร์เซลล์ทั้ง 3 รูปแบบ
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('off-grid')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'off-grid'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            OFF-GRID
          </button>
          <button
            onClick={() => setActiveTab('on-grid')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'on-grid'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ON-GRID
          </button>
          <button
            onClick={() => setActiveTab('hybrid')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'hybrid'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            HYBRID
          </button>
        </div>

        {/* Flow Diagram Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          {/* Diagram Display */}
          <div className="relative w-full max-w-lg mx-auto h-[380px] flex items-center justify-center">
            
            {/* Top Node: PV (Solar) */}
            <div className="absolute top-0 flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-amber-400/80 bg-slate-950 flex flex-col items-center justify-center shadow-lg shadow-amber-500/10">
                <Sun className="w-7 h-7 text-amber-400 animate-spin-slow" />
                <span className="text-xs md:text-sm font-bold text-white mt-1">{current.pv}</span>
                <span className="text-[10px] text-slate-400">kW</span>
              </div>
              <span className="text-xs font-semibold text-slate-300 mt-1">PV</span>
            </div>

            {/* Left Node: Battery */}
            <div className={`absolute left-0 flex flex-col items-center transition-opacity duration-300 ${!current.hasBattery ? 'opacity-20 grayscale' : 'opacity-100'}`}>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-emerald-400/80 bg-slate-950 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/10">
                <BatteryCharging className="w-7 h-7 text-emerald-400" />
                <span className="text-xs md:text-sm font-bold text-white mt-1">{current.battery || '0.000'}</span>
                <span className="text-[10px] text-slate-400">kW</span>
              </div>
              <span className="text-xs font-semibold text-slate-300 mt-1">Battery</span>
            </div>

            {/* Right Node: Grid */}
            <div className={`absolute right-0 flex flex-col items-center transition-opacity duration-300 ${!current.hasGrid ? 'opacity-20 grayscale' : 'opacity-100'}`}>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-purple-400/80 bg-slate-950 flex flex-col items-center justify-center shadow-lg shadow-purple-500/10">
                <Zap className="w-7 h-7 text-purple-400" />
                <span className="text-xs md:text-sm font-bold text-white mt-1">{current.grid || '0.000'}</span>
                <span className="text-[10px] text-slate-400">kW</span>
              </div>
              <span className="text-xs font-semibold text-slate-300 mt-1">Grid</span>
            </div>

            {/* Bottom Node: Load (House) */}
            <div className="absolute bottom-0 flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-sky-400/80 bg-slate-950 flex flex-col items-center justify-center shadow-lg shadow-sky-500/10">
                <Home className="w-7 h-7 text-sky-400" />
                <span className="text-xs md:text-sm font-bold text-white mt-1">{current.load}</span>
                <span className="text-[10px] text-slate-400">kW</span>
              </div>
              <span className="text-xs font-semibold text-slate-300 mt-1">Load</span>
            </div>

            {/* SVG Connecting Lines with Animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 380">
              {/* PV to Load (Vertical Line) */}
              <line x1="200" y1="90" x2="200" y2="290" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />

              {/* Battery to Center (Left Line) */}
              {current.hasBattery && (
                <path d="M 90 190 Q 150 190 200 210" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
              )}

              {/* Grid to Center (Right Line) */}
              {current.hasGrid && (
                <path d="M 310 190 Q 250 190 200 210" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
              )}
            </svg>

          </div>

          {/* Description Section */}
          <div className="mt-8 bg-slate-950/60 border border-slate-800 rounded-2xl p-4 md:p-5 flex gap-3 items-start">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-400">{current.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}