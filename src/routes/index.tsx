import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BookOpen, LineChart, LayoutDashboard, ArrowLeft, X, 
  Zap, Sun, BatteryCharging, Home, Check, AlertTriangle, Cpu, Activity, Leaf, GraduationCap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Route = createFileRoute('/')({
  component: CleanEnergyPortal,
});

const productionData = [
  { month: 'ม.ค.', solar: 2400, grid: 1200 },
  { month: 'ก.พ.', solar: 2800, grid: 1100 },
  { month: 'มี.ค.', solar: 3200, grid: 900 },
  { month: 'เม.ย.', solar: 3500, grid: 800 },
  { month: 'พ.ค.', solar: 3100, grid: 1000 },
  { month: 'มิ.ย.', solar: 2700, grid: 1300 },
];

function SolarFlowDiagram({ type }: { type: 'OFFGRID' | 'ONGRID' | 'HYBRID' }) {
  const isOffGrid = type === 'OFFGRID';
  const isOnGrid = type === 'ONGRID';
  const isHybrid = type === 'HYBRID';

  return (
    <div className="relative w-full aspect-[16/9] max-w-md mx-auto my-2 bg-[#001738]/90 rounded-2xl border border-slate-800/80 p-2 overflow-hidden shadow-inner">
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
        <line x1="150" y1="45" x2="150" y2="135" stroke="#F2A900" strokeWidth="2.5" className="flow-line-active" />
        <line 
          x1="65" y1="90" x2="150" y2="135" 
          stroke={isOffGrid || isHybrid ? "#10b981" : "#1e293b"} 
          strokeWidth={isOffGrid || isHybrid ? "2.5" : "1.5"} 
          className={isOffGrid || isHybrid ? "flow-line-active" : ""} 
        />
        <line 
          x1="235" y1="90" x2="150" y2="135" 
          stroke={isOnGrid || isHybrid ? "#3b82f6" : "#1e293b"} 
          strokeWidth={isOnGrid || isHybrid ? "2.5" : "1.5"} 
          className={isOnGrid || isHybrid ? "flow-line-active" : ""} 
        />
      </svg>

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-1">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full border border-[#F2A900]/60 bg-[#002D62] flex items-center justify-center shadow-lg shadow-[#F2A900]/10">
            <Sun className="w-4 h-4 text-[#F2A900]" />
          </div>
          <span className="text-[10px] font-medium text-[#F2A900] mt-0.5">PV (แผงโซลาร์)</span>
        </div>

        <div className="w-full flex justify-between px-4 my-auto">
          <div className={`flex flex-col items-center transition-opacity duration-300 ${isOnGrid ? 'opacity-30' : 'opacity-100'}`}>
            <div className={`w-9 h-9 rounded-full border bg-[#002D62] flex items-center justify-center shadow-lg ${
              isOffGrid || isHybrid ? 'border-emerald-500/60 shadow-emerald-500/10' : 'border-slate-800'
            }`}>
              <BatteryCharging className={`w-4 h-4 ${isOffGrid || isHybrid ? 'text-emerald-400' : 'text-slate-600'}`} />
            </div>
            <span className={`text-[10px] font-medium mt-0.5 ${isOffGrid || isHybrid ? 'text-emerald-400' : 'text-slate-500'}`}>
              Battery
            </span>
          </div>

          <div className={`flex flex-col items-center transition-opacity duration-300 ${isOffGrid ? 'opacity-30' : 'opacity-100'}`}>
            <div className={`w-9 h-9 rounded-full border bg-[#002D62] flex items-center justify-center shadow-lg ${
              isOnGrid || isHybrid ? 'border-blue-500/60 shadow-blue-500/10' : 'border-slate-800'
            }`}>
              <Zap className={`w-4 h-4 ${isOnGrid || isHybrid ? 'text-blue-400' : 'text-slate-600'}`} />
            </div>
            <span className={`text-[10px] font-medium mt-0.5 ${isOnGrid || isHybrid ? 'text-blue-400' : 'text-slate-500'}`}>
              Grid (การไฟฟ้า)
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full border border-sky-500/60 bg-[#002D62] flex items-center justify-center shadow-lg shadow-sky-500/10">
            <Home className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-[10px] font-medium text-sky-400 mt-0.5">Load (เครื่องใช้ไฟฟ้า)</span>
        </div>
      </div>
    </div>
  );
}

type SystemType = 'OFFGRID' | 'ONGRID' | 'HYBRID';

const KNOWLEDGE_DETAILS: Record<SystemType, { title: string; subtitle: string; content: React.ReactNode }> = {
  OFFGRID: {
    title: "Off-Grid System (ระบบอิสระ)",
    subtitle: "เจาะลึกระบบสแตนด์อโลน ไม่พึ่งสายส่งการไฟฟ้า",
    content: (
      <div className="space-y-4 text-xs font-normal">
        <SolarFlowDiagram type="OFFGRID" />
        <div className="bg-[#001c40] p-4 rounded-2xl border border-[#002D62] space-y-2">
          <h4 className="font-semibold text-[#F2A900] text-sm flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> หลักการทำงาน & อุปกรณ์หลัก
          </h4>
          <p className="text-slate-300 leading-relaxed">
            ผลิตไฟฟ้าจากแผง PV ผ่าน Charge Controller ชาร์จเข้าแบตเตอรี่ และแปลงเป็นไฟบ้านด้วย Off-Grid Inverter เหมาะกับพื้นที่ห่างไกลที่ไฟฟ้าเข้าไม่ถึง
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-800/40">
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mb-1"><Check className="w-3.5 h-3.5" /> ข้อดี</span>
            <p className="text-slate-300 leading-relaxed">เป็นอิสระ 100% ไฟไม่ดับตามการไฟฟ้า เหมาะกับพื้นที่ห่างไกล</p>
          </div>
          <div className="bg-rose-950/30 p-3.5 rounded-2xl border border-rose-800/40">
            <span className="font-semibold text-rose-400 flex items-center gap-1 mb-1"><AlertTriangle className="w-3.5 h-3.5" /> ข้อจำกัด</span>
            <p className="text-slate-300 leading-relaxed">ต้นทุนแบตเตอรี่สูง ต้องเปลี่ยนตามอายุงาน และเสี่ยงไฟหมดช่วงฝนตกชื้น</p>
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
        <div className="bg-[#001c40] p-4 rounded-2xl border border-[#002D62] space-y-2">
          <h4 className="font-semibold text-[#F2A900] text-sm flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> หลักการทำงาน & อุปกรณ์หลัก
          </h4>
          <p className="text-slate-300 leading-relaxed">
            ผลิตไฟฟ้าใช้ร่วมกับการไฟฟ้าโดยตรงผ่าน On-Grid Inverter หากผลิตเกินสามารถขายคืนการไฟฟ้าได้ (ตามโครงการ) หากผลิตไม่พอระบบจะดึงไฟหลวงมาช่วยทันที
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-800/40">
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mb-1"><Check className="w-3.5 h-3.5" /> ข้อดี</span>
            <p className="text-slate-300 leading-relaxed">ลงทุนต่ำสุด คืนทุนไวสุด ไม่มีค่าแบตเตอรี่ ดูแลรักษาง่าย</p>
          </div>
          <div className="bg-rose-950/30 p-3.5 rounded-2xl border border-rose-800/40">
            <span className="font-semibold text-rose-400 flex items-center gap-1 mb-1"><AlertTriangle className="w-3.5 h-3.5" /> ข้อจำกัด</span>
            <p className="text-slate-300 leading-relaxed">หากการไฟฟ้าตัดไฟ ระบบจะดับทันทีเพื่อความปลอดภัยของช่างไฟ</p>
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
        <div className="bg-[#001c40] p-4 rounded-2xl border border-[#002D62] space-y-2">
          <h4 className="font-semibold text-[#F2A900] text-sm flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> หลักการทำงาน & อุปกรณ์หลัก
          </h4>
          <p className="text-slate-300 leading-relaxed">
            ดึงข้อดีของ On-Grid และ Off-Grid มารวมกัน มีแบตเตอรี่สำรองไฟเมื่อไฟตก/ดับ และดึงไฟหลวงมาเสริมเมื่อแบตเตอรี่หมด ควบคุมด้วย Hybrid Inverter
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-800/40">
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mb-1"><Check className="w-3.5 h-3.5" /> ข้อดี</span>
            <p className="text-slate-300 leading-relaxed">เสถียรภาพสูงสุด มีไฟสำรองใช้ตลอด 24 ชม. แม้ไฟฟ้าดับ</p>
          </div>
          <div className="bg-rose-950/30 p-3.5 rounded-2xl border border-rose-800/40">
            <span className="font-semibold text-rose-400 flex items-center gap-1 mb-1"><AlertTriangle className="w-3.5 h-3.5" /> ข้อจำกัด</span>
            <p className="text-slate-300 leading-relaxed">ราคาสูงที่สุด และต้องการการตั้งค่าระบบที่ซับซ้อนกว่า</p>
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
    <div className="font-['Prompt'] bg-[#000d21] min-h-screen text-slate-100 antialiased selection:bg-[#F2A900] selection:text-[#002D62] pb-20">
      
      {/* MU Header Bar (Stripe/Vercel Hybrid) */}
      <header className="sticky top-0 z-40 bg-[#001738]/80 backdrop-blur-xl border-b border-[#002D62]/60 px-4 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#002D62] border border-[#F2A900]/40 flex items-center justify-center shadow-lg shadow-[#002D62]/50">
              <GraduationCap className="w-4 h-4 text-[#F2A900]" />
            </div>
            <span className="font-bold text-sm md:text-base text-white tracking-tight">
              Mahidol <span className="text-[#F2A900]">Clean Energy</span>
            </span>
          </div>
          
          <nav className="flex items-center gap-1.5 md:gap-2">
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-[#F2A900] rounded-lg hover:bg-[#002D62]/40 transition"
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection('knowledge')}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-[#F2A900] rounded-lg hover:bg-[#002D62]/40 transition"
            >
              คลังความรู้
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-[#F2A900] rounded-lg hover:bg-[#002D62]/40 transition hidden sm:inline-block"
            >
              สถิติ
            </button>

            <div className="h-4 w-[1px] bg-slate-800 mx-1" />

            <Link 
              to="/ev" 
              className="px-3.5 py-1.5 bg-[#002D62] hover:bg-[#003B80] border border-[#F2A900]/50 text-[#F2A900] font-semibold text-xs rounded-xl transition shadow-md shadow-[#002D62]/30 active:scale-95"
            >
              จอง EV
            </Link>
            <Link 
              to="/survey" 
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs rounded-xl transition active:scale-95"
            >
              แบบประเมิน
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-10">

        {/* SECTION 1: HERO & BENTO GRID DASHBOARD */}
        <section id="dashboard" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#002D62]/50 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D62]/80 border border-[#F2A900]/30 text-[#F2A900] text-xs font-medium mb-3 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2A900] animate-pulse" />
                MU Clean Energy Portal
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                ภาพรวมระบบจัดการพลังงาน
              </h1>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                โครงการพลังงานสะอาด มหาวิทยาลัยมหิดล (สบปราบ-ผาลาด)
              </p>
            </div>
            
            <a 
              href="https://mahidol-lampang.vercel.app" 
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#F2A900] bg-[#001738] hover:bg-[#002D62] border border-[#002D62] px-3.5 py-2 rounded-xl transition-all w-fit shadow-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> หน้า Map หลัก
            </a>
          </div>

          {/* Vercel Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Bento 1: Primary Hero Metric */}
            <div className="bg-gradient-to-br from-[#001f4d] to-[#00112c] p-6 rounded-3xl border border-[#002D62] hover:border-[#F2A900]/40 transition-all duration-300 group relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Zap className="w-20 h-20 text-[#F2A900]" />
              </div>
              <div className="flex items-center gap-2 text-[#F2A900] text-xs font-medium">
                <Activity className="w-4 h-4 text-[#F2A900]" />
                <span>กำลังการผลิตรวม</span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">18.00</span>
                <span className="text-sm text-slate-400 font-medium">kWp</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">ติดตั้งครอบคลุมพื้นที่ศูนย์การเรียนรู้ สบปราบ-ผาลาด</p>
            </div>

            {/* Bento 2 */}
            <div className="bg-gradient-to-br from-[#001738] to-[#000d21] p-6 rounded-3xl border border-[#002D62] hover:border-blue-500/40 transition-all duration-300 group relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Sun className="w-20 h-20 text-blue-400" />
              </div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-medium">
                <Sun className="w-4 h-4 text-blue-400" />
                <span>ผลิตไฟวันนี้</span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">21.04</span>
                <span className="text-sm text-slate-400 font-medium">kWh</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">ระบบอัปเดตข้อมูลการผลิตพลังงานแบบ Real-time</p>
            </div>

            {/* Bento 3 */}
            <div className="bg-gradient-to-br from-[#001738] to-[#000d21] p-6 rounded-3xl border border-[#002D62] hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <Leaf className="w-20 h-20 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>ลดปล่อย CO₂ สะสม</span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">19.05</span>
                <span className="text-sm text-slate-400 font-medium">Tons</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">สนับสนุนการเป็นมหาวิทยาลัยสีเขียวและความยั่งยืน (SDGs)</p>
            </div>

          </div>
        </section>

        {/* SECTION 2: BENTO KNOWLEDGE BASE */}
        <section id="knowledge" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F2A900]" /> คลังความรู้ระบบโซลาร์เซลล์
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">เลือกคลิกที่การ์ดเพื่อเปิด Modal ดูรายละเอียดความรู้เจาะลึกเฉพาะระบบ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1 */}
            <div 
              onClick={() => setActiveSystem('OFFGRID')}
              className="bg-[#001738]/60 hover:bg-[#001f4d] border border-[#002D62] hover:border-[#F2A900]/50 p-5 rounded-3xl transition duration-300 cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-[#F2A900] bg-[#002D62] border border-[#F2A900]/30 px-2.5 py-1 rounded-full">
                  ระบบที่ 1
                </span>
                <h3 className="font-semibold text-sm text-white group-hover:text-[#F2A900] transition">
                  Off-Grid System (ระบบอิสระ)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ไม่เชื่อมต่อการไฟฟ้า ชาร์จลงแบตเตอรี่ และจ่ายให้เครื่องใช้ไฟฟ้าโดยตรง
                </p>
              </div>
              <SolarFlowDiagram type="OFFGRID" />
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setActiveSystem('ONGRID')}
              className="bg-[#001738]/60 hover:bg-[#001f4d] border border-[#002D62] hover:border-blue-500/50 p-5 rounded-3xl transition duration-300 cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/80 border border-blue-800/50 px-2.5 py-1 rounded-full">
                  ระบบที่ 2
                </span>
                <h3 className="font-semibold text-sm text-white group-hover:text-blue-400 transition">
                  On-Grid System (ระบบเชื่อมต่อสายส่ง)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  เชื่อมต่อสายส่งการไฟฟ้า ดึงไฟหลวงมาเสริมเมื่อผลิตไม่พอ ไม่มีแบตเตอรี่
                </p>
              </div>
              <SolarFlowDiagram type="ONGRID" />
            </div>

            {/* Card 3 */}
            <div 
              onClick={() => setActiveSystem('HYBRID')}
              className="bg-[#001738]/60 hover:bg-[#001f4d] border border-[#002D62] hover:border-emerald-500/50 p-5 rounded-3xl transition duration-300 cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2.5 py-1 rounded-full">
                  ระบบที่ 3
                </span>
                <h3 className="font-semibold text-sm text-white group-hover:text-emerald-400 transition">
                  Hybrid System (ระบบผสมผสาน)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  รวมข้อดีของทั้ง 2 ระบบ มีแบตเตอรี่สำรองไฟและต่อกับสายส่ง สำรองไฟได้ 100%
                </p>
              </div>
              <SolarFlowDiagram type="HYBRID" />
            </div>

          </div>
        </section>

        {/* SECTION 3: PRODUCTION STATS */}
        <section id="stats" className="scroll-mt-24 space-y-4 bg-[#001738]/40 border border-[#002D62] p-6 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <LineChart className="w-5 h-5 text-[#F2A900]" /> สถิติการผลิตพลังงานไฟฟ้า (kWh)
            </h2>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '11px', fontFamily: 'Prompt' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '11px', fontFamily: 'Prompt' }} />
                <Tooltip contentStyle={{ backgroundColor: '#001738', borderColor: '#002D62', borderRadius: '12px', fontFamily: 'Prompt', fontSize: '12px' }} />
                <Area type="monotone" dataKey="solar" name="Solar Cell (kWh)" stroke="#F2A900" fill="#F2A900" fillOpacity={0.15} />
                <Area type="monotone" dataKey="grid" name="กฟภ. (kWh)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.08} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

      </main>

      {/* --- MODAL POPUP --- */}
      {activeSystem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-[#001738] border border-[#002D62] w-full max-w-xl rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between max-h-[85vh]">
            
            <div className="flex justify-between items-start border-b border-[#002D62] pb-3">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {KNOWLEDGE_DETAILS[activeSystem].title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {KNOWLEDGE_DETAILS[activeSystem].subtitle}
                </p>
              </div>
              <button 
                onClick={() => setActiveSystem(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-[#002D62] rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto max-h-[55vh]">
              {KNOWLEDGE_DETAILS[activeSystem].content}
            </div>

            <div className="border-t border-[#002D62] pt-3 flex justify-end">
              <button
                onClick={() => setActiveSystem(null)}
                className="px-5 py-2 text-xs font-semibold bg-[#002D62] hover:bg-[#003b80] text-white rounded-xl transition border border-[#F2A900]/30"
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
