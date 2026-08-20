import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  LineChart, ArrowLeft, X, 
  Zap, Sun, Cpu, Leaf, GraduationCap,
  BatteryCharging, Network, Layers, Terminal, CheckCircle2, ChevronRight
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
        <div className="bg-[#0F172A] p-4 rounded-md border border-[#3B82F6] space-y-2">
          <div className="text-white font-semibold flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-[#3B82F6]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-200 leading-relaxed font-sans">
            ระบบที่ผลิตไฟฟ้าจากแผงโซลาร์เซลล์แล้วนำพลังงานไปเก็บไว้ในแบตเตอรี่ เหมาะสำหรับพื้นที่ห่างไกลที่ไฟฟ้ายังเข้าไม่ถึง สามารถจ่ายไฟให้กับอุปกรณ์ไฟฟ้าพื้นฐานได้ตลอด 24 ชั่วโมง
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#1E293B] p-3.5 rounded-md border border-slate-600">
            <span className="font-mono text-[#3B82F6] flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-200 space-y-1 text-xs">
              <li>• พึ่งพาตนเองได้ 100% ไม่พึ่งพากระแสไฟฟ้าหลวง</li>
              <li>• มีไฟฟ้าใช้ในพื้นที่ห่างไกล/แปลงเกษตร</li>
              <li>• ปลอดภัยจากปัญหาไฟตกหรือไฟดับจากระบบหลัก</li>
            </ul>
          </div>
          <div className="bg-[#1E293B] p-3.5 rounded-md border border-slate-600">
            <span className="font-mono text-white flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-200 space-y-1 text-xs">
              <li>• Solar Panels (แผงโซลาร์เซลล์)</li>
              <li>• Solar Charge Controller (เครื่องควบคุมการชาร์จ)</li>
              <li>• Deep Cycle / Lithium Battery Bank</li>
              <li>• Off-Grid Inverter</li>
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
        <div className="bg-[#0F172A] p-4 rounded-md border border-[#3B82F6] space-y-2">
          <div className="text-white font-semibold flex items-center gap-2">
            <Network className="w-4 h-4 text-[#3B82F6]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-200 leading-relaxed font-sans">
            ระบบที่ผลิตไฟฟ้าเพื่อใช้งานร่วมกับระบบของการไฟฟ้าโดยตรง ผลิตไฟฟ้าใช้ทันทีในเวลากลางวัน ไม่มีแบตเตอรี่สำรอง ช่วยลดค่าไฟได้อย่างมีประสิทธิภาพสูงสุด และคืนทุนไวที่สุด
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#1E293B] p-3.5 rounded-md border border-slate-600">
            <span className="font-mono text-[#3B82F6] flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-200 space-y-1 text-xs">
              <li>• คุ้มค่าเงินลงทุนที่สุด (ROI สูงสุด)</li>
              <li>• ช่วยลดค่าไฟ Peak ในช่วงเวลากลางวัน</li>
              <li>• ระบบดูแลรักษาง่าย ไม่ต้องคอยเปลี่ยนแบตเตอรี่</li>
            </ul>
          </div>
          <div className="bg-[#1E293B] p-3.5 rounded-md border border-slate-600">
            <span className="font-mono text-white flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-200 space-y-1 text-xs">
              <li>• High-Efficiency Solar Panels</li>
              <li>• Grid-Tied Inverter (ผ่านการรับรอง MEA/PEA)</li>
              <li>• Zero Export Controller (อุปกรณ์กันไฟย้อน)</li>
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
        <div className="bg-[#0F172A] p-4 rounded-md border border-[#3B82F6] space-y-2">
          <div className="text-white font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#3B82F6]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-200 leading-relaxed font-sans">
            ระบบที่เชื่อมต่อทั้งไฟจากการไฟฟ้าและมีแบตเตอรี่สำรองพลังงาน สามารถนำไฟฟ้าที่ผลิตได้กลางวันมาเก็บไว้ใช้ในเวลากลางคืน และทำงานเป็นไฟสำรอง (UPS) ได้ทันทีเมื่อไฟหลวงดับ
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#1E293B] p-3.5 rounded-md border border-slate-600">
            <span className="font-mono text-[#3B82F6] flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-200 space-y-1 text-xs">
              <li>• มีไฟฟ้าใช้ต่อเนื่องแม้ยามไฟฟ้าหลวงดับ</li>
              <li>• บริหารจัดการพลังงานได้ยืดหยุ่น (Smart Energy Management)</li>
              <li>• ลดค่าไฟได้ทั้งกลางวันและกลางคืน</li>
            </ul>
          </div>
          <div className="bg-[#1E293B] p-3.5 rounded-md border border-slate-600">
            <span className="font-mono text-white flex items-center gap-1.5 mb-1.5 text-[11px] font-bold">
              <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-200 space-y-1 text-xs">
              <li>• Solar Panels</li>
              <li>• Smart Hybrid Inverter</li>
              <li>• Energy Storage System (ESS Lithium Battery)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};

function CleanEnergyPortal() {
  const [activeBase, setActiveBase] = useState<BaseType | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans bg-[#05080E] min-h-screen text-[#FFFFFF] antialiased selection:bg-[#2563EB] selection:text-white pb-24 border-t-4 border-[#2563EB] overflow-x-hidden">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#05080E]/95 backdrop-blur border-b border-slate-800 px-3 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-[#1E40AF] border border-white/30 flex-shrink-0 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-bold text-xs sm:text-sm text-white tracking-tight leading-none truncate">
                MAHIDOL <span className="text-[#60A5FA] font-mono text-[10px] sm:text-xs">[RESEARCH]</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 truncate">Sopprab-Phalat</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-white transition hidden md:inline-block"
            >
              // DASHBOARD
            </button>
            <button 
              onClick={() => scrollToSection('bases')}
              className="px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-white transition hidden sm:inline-block"
            >
              // BASES
            </button>

            <Link 
              to="/ev" 
              className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs rounded font-bold border border-white/20 transition shadow-sm"
            >
              BOOK_EV
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-10">

        {/* SECTION 1: HERO & METRICS */}
        <section id="dashboard" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0F172A] border border-slate-700 font-mono text-[11px] text-[#60A5FA] mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                SYSTEM_STATUS: ONLINE
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                ศูนย์วิจัยและถ่ายทอดเทคโนโลยีเพื่อการพัฒนาที่ยั่งยืน
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-mono">
                มหาวิทยาลัยมหิดล วิทยาเขตลำปาง (สบปราบ-ผาลาด)
              </p>
            </div>
            
            <a 
              href="https://mahidol-lampang.vercel.app" 
              className="inline-flex items-center justify-center gap-2 font-mono text-xs text-white bg-[#0F172A] hover:bg-[#1E293B] border border-slate-600 hover:border-white px-3.5 py-2 rounded transition w-full md:w-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> MAIN_MAP
            </a>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            
            <div className="bg-[#0F172A] p-5 rounded-lg border-2 border-slate-800 hover:border-[#3B82F6] transition shadow-md">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-[#60A5FA] font-bold"><Zap className="w-3.5 h-3.5" /> CAPACITY</span>
                <span>METRIC_01</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl sm:text-4xl font-bold text-white">18.00</span>
                <span className="text-xs text-slate-400">kWp</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 border-t border-slate-800 pt-2.5">
                กำลังการผลิตติดตั้งครอบคลุมศูนย์วิจัยฯ
              </p>
            </div>

            <div className="bg-[#0F172A] p-5 rounded-lg border-2 border-slate-800 hover:border-[#3B82F6] transition shadow-md">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-white font-bold"><Sun className="w-3.5 h-3.5 text-[#60A5FA]" /> GENERATION</span>
                <span>METRIC_02</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl sm:text-4xl font-bold text-white">21.04</span>
                <span className="text-xs text-slate-400">kWh</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 border-t border-slate-800 pt-2.5">
                ปริมาณพลังงานไฟฟ้าที่ผลิตได้ในวันนี้
              </p>
            </div>

            <div className="bg-[#0F172A] p-5 rounded-lg border-2 border-slate-800 hover:border-[#3B82F6] transition shadow-md">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-[#60A5FA] font-bold"><Leaf className="w-3.5 h-3.5" /> OFFSETS</span>
                <span>METRIC_03</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5 font-mono">
                <span className="text-3xl sm:text-4xl font-bold text-white">19.05</span>
                <span className="text-xs text-slate-400">Tons</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 border-t border-slate-800 pt-2.5">
                ลดการปล่อยก๊าซเรือนกระจกสะสม
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: 3 SOLAR SYSTEM BASES */}
        <section id="bases" className="scroll-mt-20 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="font-mono text-xs text-[#60A5FA] font-bold tracking-widest">// ARCHITECTURE</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              3 ฐานการเรียนรู้ระบบโซลาร์เซลล์ ศูนย์วิจัยมหิดล
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Base 1: Off-Grid */}
            <div 
              onClick={() => setActiveBase('OFF_GRID')}
              className="bg-[#0F172A] hover:bg-[#1E293B] border-2 border-slate-700 hover:border-[#3B82F6] p-5 rounded-lg transition duration-200 cursor-pointer group flex flex-col justify-between space-y-5 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span className="text-white bg-[#1E40AF] px-2.5 py-0.5 rounded font-bold border border-white/20">BASE 01</span>
                  <span className="text-slate-400">OFF_GRID</span>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#60A5FA] transition flex items-center justify-between">
                  1. ระบบ Off-Grid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  ระบบอิสระไม่เชื่อมต่อสายส่งการไฟฟ้า สำรองไฟเข้าแบตเตอรี่ เหมาะสำหรับพื้นที่ห่างไกล
                </p>
              </div>
              <div className="bg-[#05080E] border border-slate-700 p-2.5 rounded font-mono text-[11px] text-slate-300 flex justify-between items-center group-hover:border-slate-500">
                <span className="text-white font-semibold">INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#60A5FA]" />
              </div>
            </div>

            {/* Base 2: On-Grid */}
            <div 
              onClick={() => setActiveBase('ON_GRID')}
              className="bg-[#0F172A] hover:bg-[#1E293B] border-2 border-slate-700 hover:border-[#3B82F6] p-5 rounded-lg transition duration-200 cursor-pointer group flex flex-col justify-between space-y-5 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span className="text-white bg-[#1E40AF] px-2.5 py-0.5 rounded font-bold border border-white/20">BASE 02</span>
                  <span className="text-slate-400">ON_GRID</span>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#60A5FA] transition flex items-center justify-between">
                  2. ระบบ On-Grid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  ระบบเชื่อมสายส่งไฟฟ้าหลวง เน้นผลิตไฟใช้ตอนกลางวัน ลดค่าไฟฟ้าได้สูงสุดและคืนทุนไวที่สุด
                </p>
              </div>
              <div className="bg-[#05080E] border border-slate-700 p-2.5 rounded font-mono text-[11px] text-slate-300 flex justify-between items-center group-hover:border-slate-500">
                <span className="text-white font-semibold">INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#60A5FA]" />
              </div>
            </div>

            {/* Base 3: Hybrid */}
            <div 
              onClick={() => setActiveBase('HYBRID')}
              className="bg-[#0F172A] hover:bg-[#1E293B] border-2 border-slate-700 hover:border-[#3B82F6] p-5 rounded-lg transition duration-200 cursor-pointer group flex flex-col justify-between space-y-5 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span className="text-white bg-[#1E40AF] px-2.5 py-0.5 rounded font-bold border border-white/20">BASE 03</span>
                  <span className="text-slate-400">HYBRID</span>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#60A5FA] transition flex items-center justify-between">
                  3. ระบบ Hybrid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  ระบบผสมผสานเชื่อมต่อสายส่งร่วมกับแบตเตอรี่ มีไฟสำรองใช้อย่างต่อเนื่องแม้เวลาไฟดับ
                </p>
              </div>
              <div className="bg-[#05080E] border border-slate-700 p-2.5 rounded font-mono text-[11px] text-slate-300 flex justify-between items-center group-hover:border-slate-500">
                <span className="text-white font-semibold">INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#60A5FA]" />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: ANALYTICS CHART */}
        <section id="stats" className="scroll-mt-20 space-y-4 bg-[#0F172A] border-2 border-slate-800 p-4 sm:p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h2 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
              <LineChart className="w-4 h-4 text-[#60A5FA]" /> // PRODUCTION_ANALYTICS (kWh)
            </h2>
            <span className="font-mono text-[11px] text-slate-400">PERIOD: JAN-JUN 2026</span>
          </div>
          <div className="h-56 sm:h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <XAxis dataKey="month" stroke="#94A3B8" style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#05080E', borderColor: '#334155', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#FFFFFF' }} />
                <Area type="monotone" dataKey="solar" name="Solar Cell" stroke="#3B82F6" fill="#2563EB" fillOpacity={0.3} />
                <Area type="monotone" dataKey="grid" name="PEA Grid" stroke="#94A3B8" fill="#64748B" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

      </main>

      {/* BASE DETAILS MODAL */}
      {activeBase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#05080E] border-2 border-slate-700 w-full max-w-2xl rounded-lg p-5 sm:p-6 relative flex flex-col justify-between max-h-[90vh] shadow-2xl">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#60A5FA] font-bold tracking-widest">{BASE_DETAILS[activeBase].tag}</span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                  {BASE_DETAILS[activeBase].title}
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  {BASE_DETAILS[activeBase].subtitle}
                </p>
              </div>
              <button 
                onClick={() => setActiveBase(null)}
                className="p-1 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto max-h-[60vh]">
              {BASE_DETAILS[activeBase].content}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-center font-mono">
              <span className="text-[10px] sm:text-[11px] text-slate-400">MAHIDOL_SUSTAINABILITY_2026</span>
              <button
                onClick={() => setActiveBase(null)}
                className="px-4 py-2 text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white border border-white/20 rounded transition"
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
