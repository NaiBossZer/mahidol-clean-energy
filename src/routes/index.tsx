import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BookOpen, LineChart, LayoutDashboard, ArrowLeft, X, 
  Zap, Sun, BatteryCharging, Home, Check, AlertTriangle, Cpu
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Route = createFileRoute('/')({
  component: CleanEnergyPortal,
});

// ข้อมูลจำลองสถิติการผลิต
const productionData = [
  { month: 'ม.ค.', solar: 2400, grid: 1200 },
  { month: 'ก.พ.', solar: 2800, grid: 1100 },
  { month: 'มี.ค.', solar: 3200, grid: 900 },
  { month: 'เม.ย.', solar: 3500, grid: 800 },
  { month: 'พ.ค.', solar: 3100, grid: 1000 },
  { month: 'มิ.ย.', solar: 2700, grid: 1300 },
];

// คอมโพเนนต์วาด Diagram Flow พลังงาน (SVG Flow)
function SolarFlowDiagram({ type }: { type: 'OFFGRID' | 'ONGRID' | 'HYBRID' }) {
  const isOffGrid = type === 'OFFGRID';
  const isOnGrid = type === 'ONGRID';
  const isHybrid = type === 'HYBRID';

  return (
    <div className="relative w-full aspect-[16/9] max-w-md mx-auto my-2 bg-slate-950/80 rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
      <style>{`
        @keyframes dashFlow {
          to { stroke-dashoffset: -20; }
        }
        .flow-line-active {
          stroke-dasharray: 6 4;
          animation: dashFlow 0.8s linear infinite;
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 300 180">
        <line x1="150" y1="45" x2="150" y2="135" stroke="#f59e0b" strokeWidth="2.5" className="flow-line-active" />
        
        <line 
          x1="65" y1="90" x2="150" y2="135" 
          stroke={isOffGrid || isHybrid ? "#10b981" : "#334155"} 
          strokeWidth={isOffGrid || isHybrid ? "2.5" : "1.5"} 
          className={isOffGrid || isHybrid ? "flow-line-active" : ""} 
        />
        
        <line 
          x1="235" y1="90" x2="150" y2="135" 
          stroke={isOnGrid || isHybrid ? "#a855f7" : "#334155"} 
          strokeWidth={isOnGrid || isHybrid ? "2.5" : "1.5"} 
          className={isOnGrid || isHybrid ? "flow-line-active" : ""} 
        />
      </svg>

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-1">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 bg-slate-900 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sun className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] font-semibold text-amber-400 mt-0.5">PV (แผงโซลาร์)</span>
        </div>

        <div className="w-full flex justify-between px-4 my-auto">
          <div className={`flex flex-col items-center transition-opacity ${isOnGrid ? 'opacity-30' : 'opacity-100'}`}>
            <div className={`w-10 h-10 rounded-full border-2 bg-slate-900 flex items-center justify-center shadow-lg ${
              isOffGrid || isHybrid ? 'border-emerald-400 shadow-emerald-500/20' : 'border-slate-700'
            }`}>
              <BatteryCharging className={`w-5 h-5 ${isOffGrid || isHybrid ? 'text-emerald-400' : 'text-slate-600'}`} />
            </div>
            <span className={`text-[10px] font-semibold mt-0.5 ${isOffGrid || isHybrid ? 'text-emerald-400' : 'text-slate-500'}`}>
              Battery
            </span>
          </div>

          <div className={`flex flex-col items-center transition-opacity ${isOffGrid ? 'opacity-30' : 'opacity-100'}`}>
            <div className={`w-10 h-10 rounded-full border-2 bg-slate-900 flex items-center justify-center shadow-lg ${
              isOnGrid || isHybrid ? 'border-purple-400 shadow-purple-500/20' : 'border-slate-700'
            }`}>
              <Zap className={`w-5 h-5 ${isOnGrid || isHybrid ? 'text-purple-400' : 'text-slate-600'}`} />
            </div>
            <span className={`text-[10px] font-semibold mt-0.5 ${isOnGrid || isHybrid ? 'text-purple-400' : 'text-slate-500'}`}>
              Grid (การไฟฟ้า)
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-sky-400 bg-slate-900 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Home className="w-5 h-5 text-sky-400" />
          </div>
          <span className="text-[10px] font-semibold text-sky-400 mt-0.5">Load (เครื่องใช้ไฟฟ้า)</span>
        </div>
      </div>
    </div>
  );
}

// 📚 ข้อมูลรายละเอียดเจาะลึกเฉพาะแต่ละระบบ
type SystemType = 'OFFGRID' | 'ONGRID' | 'HYBRID';

const KNOWLEDGE_DETAILS: Record<SystemType, { title: string; subtitle: string; content: React.ReactNode }> = {
  OFFGRID: {
    title: "Off-Grid System (ระบบอิสระ)",
    subtitle: "เจาะลึกระบบสแตนด์อโลน ไม่พึ่งสายส่งการไฟฟ้า",
    content: (
      <div className="space-y-4 text-xs font-normal">
        <SolarFlowDiagram type="OFFGRID" />
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
          <h4 className="font-semibold text-emerald-400 text-sm flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> หลักการทำงาน & อุปกรณ์หลัก
          </h4>
          <p className="text-slate-300 leading-relaxed font-normal">
            ผลิตไฟฟ้าจากแผง PV ผ่าน Charge Controller ชาร์จเข้าแบตเตอรี่ และแปลงเป็นไฟบ้านด้วย Off-Grid Inverter เหมาะกับพื้นที่ห่างไกลที่ไฟฟ้าเข้าไม่ถึง
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/50">
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mb-1"><Check className="w-3.5 h-3.5" /> ข้อดี</span>
            <p className="text-slate-300 font-normal leading-relaxed">เป็นอิสระ 100% ไฟไม่ดับตามการไฟฟ้า เหมาะกับพื้นที่ห่างไกล</p>
          </div>
          <div className="bg-rose-950/40 p-3.5 rounded-2xl border border-rose-800/50">
            <span className="font-semibold text-rose-400 flex items-center gap-1 mb-1"><AlertTriangle className="w-3.5 h-3.5" /> ข้อจำกัด</span>
            <p className="text-slate-300 font-normal leading-relaxed">ต้นทุนแบตเตอรี่สูง ต้องเปลี่ยนตามอายุงาน และเสี่ยงไฟหมดช่วงฝนตกชื้น</p>
          </div>
        </div>
      </div>
    )
  },
  ONGRID: {
    title: "On-Grid System (ระบบเชื่อมต่อสายส่ง)",
    subtitle: "เจาะลึกระบบเน้นประหยัดค่าไฟ คืนทุนไวที่สุด",
    content: (
      <div className="space-y-4 text-xs font-normal">
        <SolarFlowDiagram type="ONGRID" />
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
          <h4 className="font-semibold text-purple-400 text-sm flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> หลักการทำงาน & อุปกรณ์หลัก
          </h4>
          <p className="text-slate-300 leading-relaxed font-normal">
            ผลิตไฟฟ้าใช้ร่วมกับการไฟฟ้าโดยตรงผ่าน On-Grid Inverter หากผลิตเกินสามารถขายคืนการไฟฟ้าได้ (ตามโครงการ) หากผลิตไม่พอระบบจะดึงไฟหลวงมาช่วยทันที
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/50">
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mb-1"><Check className="w-3.5 h-3.5" /> ข้อดี</span>
            <p className="text-slate-300 font-normal leading-relaxed">ลงทุนต่ำสุด คืนทุนไวสุด ไม่มีค่าแบตเตอรี่ ดูแลรักษาง่าย</p>
          </div>
          <div className="bg-rose-950/40 p-3.5 rounded-2xl border border-rose-800/50">
            <span className="font-semibold text-rose-400 flex items-center gap-1 mb-1"><AlertTriangle className="w-3.5 h-3.5" /> ข้อจำกัด</span>
            <p className="text-slate-300 font-normal leading-relaxed">หากการไฟฟ้าตัดไฟ ระบบจะดับทันทีเพื่อความปลอดภัยของช่างไฟ</p>
          </div>
        </div>
      </div>
    )
  },
  HYBRID: {
    title: "Hybrid System (ระบบผสมผสาน)",
    subtitle: "เจาะลึกระบบอัจฉริยะ เสถียรภาพสูงสุด",
    content: (
      <div className="space-y-4 text-xs font-normal">
        <SolarFlowDiagram type="HYBRID" />
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
          <h4 className="font-semibold text-blue-400 text-sm flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> หลักการทำงาน & อุปกรณ์หลัก
          </h4>
          <p className="text-slate-300 leading-relaxed font-normal">
            ดึงข้อดีของ On-Grid และ Off-Grid มารวมกัน มีแบตเตอรี่สำรองไฟเมื่อไฟตก/ดับ และดึงไฟหลวงมาเสริมเมื่อแบตเตอรี่หมด ควบคุมด้วย Hybrid Inverter
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/50">
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mb-1"><Check className="w-3.5 h-3.5" /> ข้อดี</span>
            <p className="text-slate-300 font-normal leading-relaxed">เสถียรภาพสูงสุด มีไฟสำรองใช้ตลอด 24 ชม. แม้ไฟฟ้าดับ</p>
          </div>
          <div className="bg-rose-950/40 p-3.5 rounded-2xl border border-rose-800/50">
            <span className="font-semibold text-rose-400 flex items-center gap-1 mb-1"><AlertTriangle className="w-3.5 h-3.5" /> ข้อจำกัด</span>
            <p className="text-slate-300 font-normal leading-relaxed">ราคาสูงที่สุด และต้องการการตั้งค่าระบบที่ซับซ้อนกว่า</p>
          </div>
        </div>
      </div>
    )
  }
};

function CleanEnergyPortal() {
  const [activeSystem, setActiveSystem] = useState<SystemType | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // กำหนด Font 'Prompt' สไตล์ Vercel / LINE Seed สบายตา ลุคโมเดิร์น
    <div className="font-['Prompt'] bg-slate-950 min-h-screen text-slate-100 space-y-10 pb-16 selection:bg-emerald-500 selection:text-slate-950 antialiased">
      
      {/* Sticky Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg text-emerald-400">
            <Zap className="w-5 h-5 fill-emerald-400" />
            <span className="tracking-tight">Mahidol Clean Energy</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-xs font-semibold">
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition cursor-pointer shadow-md shadow-emerald-500/10 active:scale-95"
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection('knowledge')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition cursor-pointer active:scale-95"
            >
              คลังความรู้
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition cursor-pointer active:scale-95"
            >
              สถิติการผลิต
            </button>

            <Link 
              to="/ev" 
              className="px-4 py-2 bg-[#002D62] hover:bg-blue-900 text-white font-semibold rounded-xl border border-blue-800 transition cursor-pointer shadow-sm active:scale-95 inline-block"
            >
              จอง EV
            </Link>
            <Link 
              to="/survey" 
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition cursor-pointer active:scale-95 inline-block"
            >
              แบบประเมิน
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">

        {/* SECTION 1: DASHBOARD SUMMARY */}
        <section id="dashboard" className="pt-4 scroll-mt-20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 text-teal-400 tracking-tight">
                <LayoutDashboard className="w-7 h-7" /> ภาพรวมระบบจัดการพลังงาน
              </h1>
              <p className="text-xs md:text-sm text-slate-400 mt-1 font-normal">โครงการพลังงานสะอาด มหาวิทยาลัยมหิดล (สบปราบ-ผาลาด)</p>
            </div>
            <a href="https://mahidol-lampang.vercel.app" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition">
              <ArrowLeft className="w-3.5 h-3.5" /> หน้า Map หลัก
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">กำลังการผลิตรวม</p>
              <p className="text-3xl md:text-4xl font-extrabold text-emerald-400">18.00 <span className="text-sm font-normal text-slate-400">kWp</span></p>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">ผลิตไฟวันนี้</p>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-400">21.04 <span className="text-sm font-normal text-slate-400">kWh</span></p>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">ลดปล่อย CO₂ สะสม</p>
              <p className="text-3xl md:text-4xl font-extrabold text-purple-400">19.05 <span className="text-sm font-normal text-slate-400">Tons</span></p>
            </div>
          </div>
        </section>

        {/* SECTION 2: KNOWLEDGE BASE */}
        <section id="knowledge" className="bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 scroll-mt-20">
          <div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-emerald-400 tracking-tight">
              <BookOpen className="w-6 h-6" /> คลังความรู้ระบบโซลาร์เซลล์
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-normal">คลิกที่การ์ดเพื่อเปิดดูรายละเอียดความรู้เจาะลึกเฉพาะระบบ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: Off-Grid System */}
            <div 
              onClick={() => setActiveSystem('OFFGRID')}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-sm hover:shadow-xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2.5 py-1 rounded-md">ระบบที่ 1</span>
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition">Off-Grid System (ระบบอิสระ)</h3>
                <p className="text-slate-400 text-xs font-normal leading-relaxed">ไม่เชื่อมต่อการไฟฟ้า ชาร์จลงแบตเตอรี่ และจ่ายให้เครื่องใช้ไฟฟ้าโดยตรง</p>
              </div>
              <SolarFlowDiagram type="OFFGRID" />
            </div>

            {/* CARD 2: On-Grid System */}
            <div 
              onClick={() => setActiveSystem('ONGRID')}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-sm hover:shadow-xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-purple-400 bg-purple-950/80 border border-purple-800/50 px-2.5 py-1 rounded-md">ระบบที่ 2</span>
                <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition">On-Grid System (ระบบเชื่อมต่อสายส่ง)</h3>
                <p className="text-slate-400 text-xs font-normal leading-relaxed">เชื่อมต่อสายส่งการไฟฟ้า ดึงไฟหลวงมาเสริมเมื่อผลิตไม่พอ ไม่มีแบตเตอรี่</p>
              </div>
              <SolarFlowDiagram type="ONGRID" />
            </div>

            {/* CARD 3: Hybrid System */}
            <div 
              onClick={() => setActiveSystem('HYBRID')}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-sm hover:shadow-xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 border border-blue-800/50 px-2.5 py-1 rounded-md">ระบบที่ 3</span>
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition">Hybrid System (ระบบผสมผสาน)</h3>
                <p className="text-slate-400 text-xs font-normal leading-relaxed">รวมข้อดีของทั้ง 2 ระบบ มีแบตเตอรี่สำรองไฟและต่อกับสายส่ง สำรองไฟได้ 100%</p>
              </div>
              <SolarFlowDiagram type="HYBRID" />
            </div>

          </div>
        </section>

        {/* SECTION 3: PRODUCTION STATS */}
        <section id="stats" className="bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 scroll-mt-20">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-blue-400 tracking-tight">
            <LineChart className="w-6 h-6" /> สถิติการผลิตพลังงานไฟฟ้า (kWh)
          </h2>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px', fontFamily: 'Prompt' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px', fontFamily: 'Prompt' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontFamily: 'Prompt', fontSize: '12px' }} />
                <Area type="monotone" dataKey="solar" name="Solar Cell (kWh)" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Area type="monotone" dataKey="grid" name="กฟภ. (kWh)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>

      {/* --- MODAL DETAIL POPUP --- */}
      {activeSystem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {KNOWLEDGE_DETAILS[activeSystem].title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-normal">
                  {KNOWLEDGE_DETAILS[activeSystem].subtitle}
                </p>
              </div>
              <button 
                onClick={() => setActiveSystem(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="py-4 overflow-y-auto max-h-[60vh]">
              {KNOWLEDGE_DETAILS[activeSystem].content}
            </div>

            {/* Footer Modal */}
            <div className="border-t border-slate-800 pt-3 flex justify-end">
              <button
                onClick={() => setActiveSystem(null)}
                className="px-5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default CleanEnergyPortal;
