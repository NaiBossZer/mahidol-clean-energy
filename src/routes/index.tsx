import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  LineChart, ArrowLeft, X, 
  Zap, Sun, Cpu, Leaf, GraduationCap,
  BatteryCharging, Network, Layers, Terminal, CheckCircle2, ChevronRight,
  ArrowDown, Home, ChevronLeft
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Route = createFileRoute('/')({
  component: CleanEnergyPortal,
});

const productionData = [
  { month: 'JAN', solar: 2400, grid: 1200 },
  { month: 'FEB', solar: 2800, grid: 1100 },
  { month: 'MAR', solar: 3200, grid: 900 },
  { month: 'APR', solar: 3500, grid: 800 },
  { month: 'MAY', solar: 3100, grid: 1000 },
  { month: 'JUN', solar: 2700, grid: 1300 },
];

type BaseType = 'OFF_GRID' | 'ON_GRID' | 'HYBRID';

const BASE_DETAILS: Record<BaseType, { title: string; tag: string; subtitle: string; content: React.ReactNode }> = {
  OFF_GRID: {
    title: "ฐานที่ 1: ระบบพลังงานแสงอาทิตย์แบบ Off-Grid",
    tag: "BASE_01 // OFF_GRID_SYS",
    subtitle: "ระบบผลิตไฟฟ้าแบบอิสระ ไม่เชื่อมต่อกับระบบสายส่งของการไฟฟ้า",
    content: (
      <div className="space-y-4 text-xs font-mono">
        <div className="bg-amber-50/50 p-4 rounded-md border border-amber-400 space-y-2">
          <div className="text-slate-900 font-bold flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-amber-500" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-700 leading-relaxed font-sans">
            ระบบที่ผลิตไฟฟ้าจากแผงโซลาร์เซลล์แล้วนำพลังงานไปเก็บไว้ในแบตเตอรี่ เหมาะสำหรับพื้นที่ห่างไกลที่ไฟฟ้ายังเข้าไม่ถึง สามารถจ่ายไฟให้กับอุปกรณ์ไฟฟ้าพื้นฐานได้ตลอด 24 ชั่วโมง
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-white p-3.5 rounded-md border border-slate-300 shadow-sm">
            <span className="font-mono text-amber-600 flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>• พึ่งพาตนเองได้ 100% ไม่พึ่งพากระแสไฟฟ้าหลวง</li>
              <li>• มีไฟฟ้าใช้ในพื้นที่ห่างไกล/แปลงเกษตร</li>
              <li>• ปลอดภัยจากปัญหาไฟตกหรือไฟดับจากระบบหลัก</li>
            </ul>
          </div>
          <div className="bg-white p-3.5 rounded-md border border-slate-300 shadow-sm">
            <span className="font-mono text-slate-900 flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <Cpu className="w-3.5 h-3.5 text-amber-500" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>• Solar Panels (แผงโซลาร์เซลล์)</li>
              <li>• Off-Grid Inverter / Charge Controller</li>
              <li>• Energy Storage (แบตเตอรี่เก็บไฟ)</li>
              <li>• Home Appliances (เครื่องใช้ไฟฟ้าในบ้าน)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  ON_GRID: {
    title: "ฐานที่ 2: ระบบพลังงานแสงอาทิตย์แบบ On-Grid",
    tag: "BASE_02 // ON_GRID_SYS",
    subtitle: "ระบบเชื่อมต่อกับสายส่งการไฟฟ้า มุ่งเน้นลดค่าไฟฟ้าในช่วงกลางวัน",
    content: (
      <div className="space-y-4 text-xs font-mono">
        <div className="bg-amber-50/50 p-4 rounded-md border border-amber-400 space-y-2">
          <div className="text-slate-900 font-bold flex items-center gap-2">
            <Network className="w-4 h-4 text-amber-500" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-700 leading-relaxed font-sans">
            ระบบที่ผลิตไฟฟ้าเพื่อใช้งานร่วมกับระบบของการไฟฟ้าโดยตรง ผลิตไฟฟ้าใช้ทันทีในเวลากลางวัน ไม่มีแบตเตอรี่สำรอง ช่วยลดค่าไฟได้อย่างมีประสิทธิภาพสูงสุด และคืนทุนไวที่สุด
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-white p-3.5 rounded-md border border-slate-300 shadow-sm">
            <span className="font-mono text-amber-600 flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>• คุ้มค่าเงินลงทุนที่สุด (ROI สูงสุด)</li>
              <li>• ช่วยลดค่าไฟ Peak ในช่วงเวลากลางวัน</li>
              <li>• ระบบดูแลรักษาง่าย ไม่ต้องคอยเปลี่ยนแบตเตอรี่</li>
            </ul>
          </div>
          <div className="bg-white p-3.5 rounded-md border border-slate-300 shadow-sm">
            <span className="font-mono text-slate-900 flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <Cpu className="w-3.5 h-3.5 text-amber-500" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>• High-Efficiency Solar Panels</li>
              <li>• On-Grid Inverter</li>
              <li>• PEA / MEA Grid System</li>
              <li>• Home Load (เครื่องใช้ไฟฟ้าภายในอาคาร)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  HYBRID: {
    title: "ฐานที่ 3: ระบบพลังงานแสงอาทิตย์แบบ Hybrid",
    tag: "BASE_03 // HYBRID_SYS",
    subtitle: "ระบบผสมผสานดึงข้อดีของ On-Grid และ Off-Grid เข้าด้วยกัน",
    content: (
      <div className="space-y-4 text-xs font-mono">
        <div className="bg-amber-50/50 p-4 rounded-md border border-amber-400 space-y-2">
          <div className="text-slate-900 font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-700 leading-relaxed font-sans">
            ระบบที่เชื่อมต่อทั้งไฟจากการไฟฟ้าและมีแบตเตอรี่สำรองพลังงาน สามารถนำไฟฟ้าที่ผลิตได้กลางวันมาเก็บไว้ใช้ในเวลากลางคืน และทำงานเป็นไฟสำรอง (UPS) ได้ทันทีเมื่อไฟหลวงดับ
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-white p-3.5 rounded-md border border-slate-300 shadow-sm">
            <span className="font-mono text-amber-600 flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>• มีไฟฟ้าใช้ต่อเนื่องแม้ยามไฟฟ้าหลวงดับ</li>
              <li>• บริหารจัดการพลังงานได้ยืดหยุ่น (Smart Energy Management)</li>
              <li>• ลดค่าไฟได้ทั้งกลางวันและกลางคืน</li>
            </ul>
          </div>
          <div className="bg-white p-3.5 rounded-md border border-slate-300 shadow-sm">
            <span className="font-mono text-slate-900 flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <Cpu className="w-3.5 h-3.5 text-amber-500" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>• Solar Panels</li>
              <li>• Hybrid Inverter</li>
              <li>• Energy Storage System (แบตเตอรี่)</li>
              <li>• PEA Grid Line + Backup Load</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};

const DIAGRAM_SYSTEMS = [
  {
    id: 'OFF_GRID',
    title: '1. ระบบ Off-Grid',
    desc: 'ระบบอิสระผลิตไฟฟ้าและเก็บสำรองในแบตเตอรี่ 100%',
    nodes: [
      { name: 'Solar PV Panels', sub: 'ผลิตไฟฟ้า DC', icon: Sun, color: 'bg-amber-100 text-amber-600 border-amber-400' },
      { name: 'Off-Grid Inverter', sub: 'แปลงไฟ DC เป็น AC', icon: Cpu, color: 'bg-blue-100 text-blue-600 border-blue-300' },
      { name: 'Energy Storage', sub: 'แบตเตอรี่เก็บไฟ', icon: BatteryCharging, color: 'bg-emerald-100 text-emerald-600 border-emerald-300' },
      { name: 'Home Appliances', sub: 'จ่ายโหลดใช้ในบ้าน', icon: Home, color: 'bg-indigo-100 text-indigo-600 border-indigo-300' }
    ]
  },
  {
    id: 'ON_GRID',
    title: '2. ระบบ On-Grid',
    desc: 'ระบบเชื่อมต่อสายส่งการไฟฟ้าเพื่อลดค่าไฟช่วงกลางวัน',
    nodes: [
      { name: 'Solar PV Panels', sub: 'ผลิตไฟฟ้า DC', icon: Sun, color: 'bg-amber-100 text-amber-600 border-amber-400' },
      { name: 'On-Grid Inverter', sub: 'แปลงไฟ Sync กับระบบการไฟฟ้า', icon: Cpu, color: 'bg-blue-100 text-blue-600 border-blue-300' },
      { name: 'PEA Power Grid', sub: 'เชื่อมต่อสายส่งการไฟฟ้า', icon: Network, color: 'bg-purple-100 text-purple-600 border-purple-300' },
      { name: 'Home Appliances', sub: 'จ่ายโหลดใช้ในบ้าน', icon: Home, color: 'bg-indigo-100 text-indigo-600 border-indigo-300' }
    ]
  },
  {
    id: 'HYBRID',
    title: '3. ระบบ Hybrid',
    desc: 'ระบบผสมผสานเชื่อมสายส่งและแบตเตอรี่สำรองไฟ 24 ชม.',
    nodes: [
      { name: 'Solar PV Panels', sub: 'ผลิตไฟฟ้า DC', icon: Sun, color: 'bg-amber-100 text-amber-600 border-amber-400' },
      { name: 'Hybrid Inverter', sub: 'ควบคุมการจ่ายไฟ 3 ทาง', icon: Layers, color: 'bg-blue-100 text-blue-600 border-blue-300' },
      { name: 'Energy Storage & Grid', sub: 'แบตเตอรี่ + สายส่งการไฟฟ้า', icon: BatteryCharging, color: 'bg-emerald-100 text-emerald-600 border-emerald-300' },
      { name: 'Home Appliances', sub: 'จ่ายโหลดใช้ในบ้านต่อเนื่อง', icon: Home, color: 'bg-indigo-100 text-indigo-600 border-indigo-300' }
    ]
  }
];

function VerticalFlowArrow() {
  return (
    <div className="flex flex-col items-center justify-center my-3 space-y-1">
      {/* Animated Light Bar สีเหลืองนีออนตัดน้ำเงิน */}
      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden relative border border-amber-300 shadow-sm">
        <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 animate-[shimmer_1s_infinite]" />
      </div>
      <ArrowDown className="w-5 h-5 text-amber-500 animate-bounce" />
    </div>
  );
}

function CleanEnergyPortal() {
  const [activeBase, setActiveBase] = useState<BaseType | null>(null);
  const [currentDiagramIndex, setCurrentDiagramIndex] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextDiagram = () => {
    setCurrentDiagramIndex((prev) => (prev + 1) % DIAGRAM_SYSTEMS.length);
  };

  const prevDiagram = () => {
    setCurrentDiagramIndex((prev) => (prev - 1 + DIAGRAM_SYSTEMS.length) % DIAGRAM_SYSTEMS.length);
  };

  return (
    <div className="font-sans bg-white min-h-screen text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-900 pb-24 border-t-4 border-amber-400 overflow-x-hidden relative">
      
      {/* Background Electric Circuit Pattern (ลวดลายวงจรไฟฟ้าสีเหลืองบางๆ ทั่วทั้งหน้า) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" 
        style={{
          backgroundImage: `radial-gradient(#eab308 1px, transparent 1px), linear-gradient(to right, #eab308 1px, transparent 1px), linear-gradient(to bottom, #eab308 1px, transparent 1px)`,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }}
      />

      {/* Header Bar */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 md:px-8 py-3.5 shadow-sm relative z-10">
        
        {/* Neon Yellow Accent Line Under Header */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-blue-600 flex-shrink-0 flex items-center justify-center shadow-sm relative overflow-hidden group">
              <GraduationCap className="w-4 h-4 text-white relative z-10" />
              <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight leading-none truncate">
                MAHIDOL <span className="text-amber-500 font-mono text-[10px] sm:text-xs">[RESEARCH]</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 truncate">Sopprab-Phalat</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="px-2 py-1 text-[11px] font-mono text-slate-600 hover:text-amber-600 transition hidden md:inline-block"
            >
              // DASHBOARD
            </button>
            <button 
              onClick={() => scrollToSection('flow')}
              className="px-2 py-1 text-[11px] font-mono text-slate-600 hover:text-amber-600 transition hidden sm:inline-block"
            >
              // FLOW_DIAGRAM
            </button>
            <button 
              onClick={() => scrollToSection('bases')}
              className="px-2 py-1 text-[11px] font-mono text-slate-600 hover:text-amber-600 transition hidden sm:inline-block"
            >
              // BASES
            </button>

            <Link 
              to="/ev" 
              className="px-3 py-1.5 bg-slate-900 hover:bg-black text-yellow-400 border border-yellow-400 font-mono text-xs rounded font-bold transition shadow-sm flex items-center gap-1"
            >
              <Zap className="w-3 h-3 fill-yellow-400" /> BOOK_EV
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-10 relative z-10">

        {/* SECTION 1: HERO & METRICS */}
        <section id="dashboard" className="scroll-mt-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-50 border border-amber-300 font-mono text-[11px] text-amber-700 mb-2.5 font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                SYSTEM_STATUS: ELECTRIC_ONLINE
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                ศูนย์วิจัยและถ่ายทอดเทคโนโลยีเพื่อการพัฒนาที่ยั่งยืน
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-mono">
                มหาวิทยาลัยมหิดล วิทยาเขตลำปาง (สบปราบ-ผาลาด)
              </p>
            </div>
            
            <a 
              href="https://mahidol-lampang.vercel.app" 
              className="inline-flex items-center justify-center gap-2 font-mono text-xs text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3.5 py-2 rounded transition w-full md:w-auto font-semibold shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-600" /> MAIN_MAP
            </a>
          </div>

          {/* Metric Cards - Enhanced with Electric Yellow Accents */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            
            <div className="bg-gradient-to-b from-slate-50 to-amber-50/30 p-5 rounded-lg border border-amber-200 hover:border-amber-400 transition shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-300/20 blur-xl rounded-full" />
              <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-amber-600 font-bold"><Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> CAPACITY</span>
                <span className="text-amber-500 font-bold">METRIC_01</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">18.00</span>
                <span className="text-xs text-slate-500">kWp</span>
              </div>
              <p className="text-xs text-slate-600 mt-3 border-t border-amber-200/60 pt-2.5">
                กำลังการผลิตติดตั้งครอบคลุมศูนย์วิจัยฯ
              </p>
            </div>

            <div className="bg-gradient-to-b from-slate-50 to-amber-50/30 p-5 rounded-lg border border-amber-200 hover:border-amber-400 transition shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-300/20 blur-xl rounded-full" />
              <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-amber-600 font-bold"><Sun className="w-3.5 h-3.5 text-amber-500" /> GENERATION</span>
                <span className="text-amber-500 font-bold">METRIC_02</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">21.04</span>
                <span className="text-xs text-slate-500">kWh</span>
              </div>
              <p className="text-xs text-slate-600 mt-3 border-t border-amber-200/60 pt-2.5">
                ปริมาณพลังงานไฟฟ้าที่ผลิตได้ในวันนี้
              </p>
            </div>

            <div className="bg-gradient-to-b from-slate-50 to-amber-50/30 p-5 rounded-lg border border-amber-200 hover:border-amber-400 transition shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-300/20 blur-xl rounded-full" />
              <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-amber-600 font-bold"><Leaf className="w-3.5 h-3.5 text-amber-500" /> OFFSETS</span>
                <span className="text-amber-500 font-bold">METRIC_03</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">19.05</span>
                <span className="text-xs text-slate-500">Tons</span>
              </div>
              <p className="text-xs text-slate-600 mt-3 border-t border-amber-200/60 pt-2.5">
                ลดการปล่อยก๊าซเรือนกระจกสะสม
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: VERTICAL FLOW DIAGRAM WITH YELLOW ELECTRIC GLOW */}
        <section id="flow" className="scroll-mt-6 space-y-4 bg-slate-50 border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-sm max-w-lg mx-auto md:max-w-none relative overflow-hidden">
          
          {/* Electric Circuit Pattern Line Accent */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-amber-600 font-bold tracking-widest flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-500 text-amber-500" /> // ELECTRICAL_FLOW_DIAGRAM
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                ไดอะแกรมการไหลของพลังงานไฟฟ้า
              </h2>
            </div>
          </div>

          {/* Main Diagram Card */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            
            {/* Title & Desc */}
            <div className="text-center mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {DIAGRAM_SYSTEMS[currentDiagramIndex].title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {DIAGRAM_SYSTEMS[currentDiagramIndex].desc}
              </p>
            </div>

            {/* Vertical Flow List */}
            <div className="flex flex-col items-center max-w-md mx-auto">
              {DIAGRAM_SYSTEMS[currentDiagramIndex].nodes.map((node, index, arr) => {
                const IconComponent = node.icon;
                return (
                  <div key={index} className="w-full flex flex-col items-center">
                    
                    {/* Card Item Node */}
                    <div className="w-full bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center space-y-2 hover:border-amber-400 transition relative group">
                      <div className={`w-14 h-14 rounded-full border ${node.color} flex items-center justify-center shadow-xs group-hover:scale-105 transition`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div className="font-bold text-sm text-slate-900">{node.name}</div>
                      <p className="text-xs text-slate-400 font-sans">{node.sub}</p>
                    </div>

                    {/* Yellow Electric Arrow Flow */}
                    {index < arr.length - 1 && (
                      <VerticalFlowArrow />
                    )}

                  </div>
                );
              })}
            </div>

            {/* Pagination & Nav Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
              <button 
                onClick={prevDiagram}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-800 font-mono text-xs rounded-lg transition flex items-center gap-1 font-semibold border border-slate-200 hover:border-amber-300"
              >
                <ChevronLeft className="w-4 h-4 text-amber-600" /> PREV
              </button>

              {/* Dots Indicator with Yellow Glow */}
              <div className="flex items-center gap-2">
                {DIAGRAM_SYSTEMS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentDiagramIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentDiagramIndex === idx ? 'w-8 bg-amber-400 shadow-xs' : 'w-2.5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextDiagram}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-800 font-mono text-xs rounded-lg transition flex items-center gap-1 font-semibold border border-slate-200 hover:border-amber-300"
              >
                NEXT <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>

          </div>

        </section>

        {/* SECTION 3: 3 SOLAR SYSTEM BASES WITH YELLOW CORNER ACCENTS */}
        <section id="bases" className="scroll-mt-6 space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <span className="font-mono text-xs text-amber-600 font-bold tracking-widest">// ARCHITECTURE</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              3 ฐานการเรียนรู้ระบบโซลาร์เซลล์ ศูนย์วิจัยมหิดล
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Base 1: Off-Grid */}
            <div 
              onClick={() => setActiveBase('OFF_GRID')}
              className="bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-amber-400 p-5 rounded-lg transition duration-200 cursor-pointer group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-amber-400 opacity-0 group-hover:opacity-100 transition" />
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span className="text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-900" /> BASE 01
                  </span>
                  <span className="text-slate-500 font-semibold">OFF_GRID</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition flex items-center justify-between">
                  1. ระบบ Off-Grid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  ระบบอิสระไม่เชื่อมต่อสายส่งการไฟฟ้า สำรองไฟเข้าแบตเตอรี่ เหมาะสำหรับพื้นที่ห่างไกล
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-700 flex justify-between items-center group-hover:border-amber-300">
                <span className="text-slate-900 font-semibold">INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
              </div>
            </div>

            {/* Base 2: On-Grid */}
            <div 
              onClick={() => setActiveBase('ON_GRID')}
              className="bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-amber-400 p-5 rounded-lg transition duration-200 cursor-pointer group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-amber-400 opacity-0 group-hover:opacity-100 transition" />
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span className="text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-900" /> BASE 02
                  </span>
                  <span className="text-slate-500 font-semibold">ON_GRID</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition flex items-center justify-between">
                  2. ระบบ On-Grid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  ระบบเชื่อมสายส่งไฟฟ้าหลวง เน้นผลิตไฟใช้ตอนกลางวัน ลดค่าไฟฟ้าได้สูงสุดและคืนทุนไวที่สุด
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-700 flex justify-between items-center group-hover:border-amber-300">
                <span className="text-slate-900 font-semibold">INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
              </div>
            </div>

            {/* Base 3: Hybrid */}
            <div 
              onClick={() => setActiveBase('HYBRID')}
              className="bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-amber-400 p-5 rounded-lg transition duration-200 cursor-pointer group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-amber-400 opacity-0 group-hover:opacity-100 transition" />
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span className="text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-900" /> BASE 03
                  </span>
                  <span className="text-slate-500 font-semibold">HYBRID</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition flex items-center justify-between">
                  3. ระบบ Hybrid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  ระบบผสมผสานเชื่อมต่อสายส่งร่วมกับแบตเตอรี่ มีไฟสำรองใช้อย่างต่อเนื่องแม้เวลาไฟดับ
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-700 flex justify-between items-center group-hover:border-amber-300">
                <span className="text-slate-900 font-semibold">INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: ANALYTICS CHART */}
        <section id="stats" className="scroll-mt-6 space-y-4 bg-slate-50 border border-slate-200 p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 font-mono flex items-center gap-2">
              <LineChart className="w-4 h-4 text-amber-500" /> // PRODUCTION_ANALYTICS (kWh)
            </h2>
            <span className="font-mono text-[11px] text-slate-500">PERIOD: JAN-JUN 2026</span>
          </div>
          <div className="h-56 sm:h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#FCD34D', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#0F172A' }} />
                <Area type="monotone" dataKey="solar" name="Solar Cell" stroke="#EAB308" fill="#FACC15" fillOpacity={0.25} />
                <Area type="monotone" dataKey="grid" name="PEA Grid" stroke="#94A3B8" fill="#CBD5E1" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

      </main>

      {/* BASE DETAILS MODAL */}
      {activeBase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-amber-400 w-full max-w-2xl rounded-xl p-5 sm:p-6 relative flex flex-col justify-between max-h-[90vh] shadow-2xl">
            
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-[10px] text-amber-600 font-bold tracking-widest">{BASE_DETAILS[activeBase].tag}</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-0.5">
                  {BASE_DETAILS[activeBase].title}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {BASE_DETAILS[activeBase].subtitle}
                </p>
              </div>
              <button 
                onClick={() => setActiveBase(null)}
                className="p-1 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto max-h-[60vh]">
              {BASE_DETAILS[activeBase].content}
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-center font-mono">
              <span className="text-[10px] sm:text-[11px] text-slate-500">MAHIDOL_SUSTAINABILITY_2026</span>
              <button
                onClick={() => setActiveBase(null)}
                className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-900 rounded transition shadow-sm"
              >
                CLOSE_CONSOLE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default CleanEnergyPortal;
