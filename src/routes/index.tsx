import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  LineChart, ArrowLeft, X, 
  Zap, Sun, Cpu, Leaf, GraduationCap,
  Droplets, Sprout, Terminal, CheckCircle2, ChevronRight
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

type BaseType = 'SOLAR' | 'SMART_FARM' | 'SOLAR_PUMP';

const BASE_DETAILS: Record<BaseType, { title: string; tag: string; subtitle: string; content: React.ReactNode }> = {
  SOLAR: {
    title: "ฐานที่ 1: ระบบพลังงานแสงอาทิตย์ (Solar Energy)",
    tag: "BASE_01 // POWER_GEN",
    subtitle: "ศูนย์เรียนรู้และทดสอบการผลิตไฟฟ้าจากพลังงานแสงอาทิตย์เพื่อความยั่งยืน",
    content: (
      <div className="space-y-4 text-xs font-mono">
        <div className="bg-[#0F172A] p-4 rounded-md border border-[#1E40AF] space-y-2">
          <div className="text-[#3B82F6] font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#3B82F6]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            ศึกษารูปแบบการติดตั้งและการทำงานจริงของระบบโซลาร์เซลล์ทั้ง On-Grid, Off-Grid และ Hybrid รวมถึงการบันทึกข้อมูลการผลิตไฟฟ้า (Data Logging) ส่งขึ้น Cloud แบบ Real-time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#0A0E17] p-3.5 rounded-md border border-[#1E293B]">
            <span className="font-mono text-[#3B82F6] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> หัวข้อการเรียนรู้
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• หลักการแปลงพลังงานแสงอาทิตย์เป็นไฟฟ้า</li>
              <li>• การเปรียบเทียบ Inverter แต่ละชนิด</li>
              <li>• การคำนวณจุดคุ้มทุน (ROI) และ Carbon Offsets</li>
            </ul>
          </div>
          <div className="bg-[#0A0E17] p-3.5 rounded-md border border-[#1E293B]">
            <span className="font-mono text-white flex items-center gap-1.5 mb-1.5 text-[11px]">
              <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" /> อุปกรณ์สาธิต
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• แผง Mono-PERC / Bifacial 550W</li>
              <li>• Smart Hybrid Inverter & Lithium Battery</li>
              <li>• Smart Energy Metering Console</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  SMART_FARM: {
    title: "ฐานที่ 2: เกษตรอัจฉริยะ (Smart Agriculture)",
    tag: "BASE_02 // IOT_FARMING",
    subtitle: "ยกระดับการแปลงปลูกด้วยระบบเซนเซอร์วัดสภาวะแวดล้อมและเกษตรแม่นยำ",
    content: (
      <div className="space-y-4 text-xs font-mono">
        <div className="bg-[#0F172A] p-4 rounded-md border border-[#1E40AF] space-y-2">
          <div className="text-[#3B82F6] font-semibold flex items-center gap-2">
            <Sprout className="w-4 h-4 text-[#3B82F6]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            การประยุกต์ใช้ IoT ตรวจวัดความชื้นในดิน อุณหภูมิ แสง และความเข้มธาตุอาหารในดิน ควบคุมระบบให้น้ำและปุ๋ยผ่าน Automation Controller เพื่อเพิ่มคุณภาพผลผลิต
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#0A0E17] p-3.5 rounded-md border border-[#1E293B]">
            <span className="font-mono text-[#3B82F6] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> หัวข้อการเรียนรู้
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• การติดตั้งเซนเซอร์ไร้สายระยะไกล (LoRaWAN)</li>
              <li>• การตั้งค่าวงจรวาล์วน้ำอัตโนมัติตามค่าความชื้น</li>
              <li>• การวิเคราะห์สภาวะอากาศล่วงหน้าเพื่อการเกษตร</li>
            </ul>
          </div>
          <div className="bg-[#0A0E17] p-3.5 rounded-md border border-[#1E293B]">
            <span className="font-mono text-white flex items-center gap-1.5 mb-1.5 text-[11px]">
              <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" /> อุปกรณ์สาธิต
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• Soil NPK & Moisture Sensor Telemetry</li>
              <li>• Automatic Solenoid Valve Control Board</li>
              <li>• Micro-Weather Station Console</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  SOLAR_PUMP: {
    title: "ฐานที่ 3: ระบบสูบน้ำพลังงานแสงอาทิตย์ (Solar Pumping)",
    tag: "BASE_03 // WATER_MGMT",
    subtitle: "การบริหารจัดการน้ำเพื่อการเกษตรโดยไม่พึ่งพาสายส่งไฟฟ้าหลวง",
    content: (
      <div className="space-y-4 text-xs font-mono">
        <div className="bg-[#0F172A] p-4 rounded-md border border-[#1E40AF] space-y-2">
          <div className="text-[#3B82F6] font-semibold flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#3B82F6]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            การดึงพลังงานตรงจากแสงอาทิตย์ผ่าน Solar Inverter ปั๊มน้ำเข้าสู่วงจรปั๊มหอยโข่งหรือปั๊มบาดาลโดยตรง เพื่อเติมน้ำใส่พักแปลงเกษตร ลดต้นทุนค่าน้ำมันเชื้อเพลิงอย่างยั่งยืน
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#0A0E17] p-3.5 rounded-md border border-[#1E293B]">
            <span className="font-mono text-[#3B82F6] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> หัวข้อการเรียนรู้
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• การเลือกขนาดปั๊มน้ำ (DC Brushless vs AC)</li>
              <li>• การคำนวณ Head สูบส่งและปริมาณน้ำต่อชั่วโมง</li>
              <li>• ระบบตัดการทำงานอัตโนมัติเมื่อน้ำแห้ง (Dry-run)</li>
            </ul>
          </div>
          <div className="bg-[#0A0E17] p-3.5 rounded-md border border-[#1E293B]">
            <span className="font-mono text-white flex items-center gap-1.5 mb-1.5 text-[11px]">
              <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" /> อุปกรณ์สาธิต
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• Solar Pump Inverter MPPT Tracker</li>
              <li>• DC Submersible & Centrifugal Pump Unit</li>
              <li>• Ultrasonic Water Level Sensor Module</li>
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
    <div className="font-sans bg-[#0A0E17] min-h-screen text-[#FFFFFF] antialiased selection:bg-[#3B82F6] selection:text-white pb-24 border-t-2 border-[#1E40AF]">
      
      {/* Top Console Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0E17]/95 backdrop-blur border-b border-[#1E293B] px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1E40AF] border border-[#3B82F6] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-white tracking-tight leading-none">
                MAHIDOL <span className="text-[#3B82F6] font-mono text-xs">[RESEARCH_CENTER]</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">Sopprab-Phalat Campus</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-[#3B82F6] transition"
            >
              // DASHBOARD
            </button>
            <button 
              onClick={() => scrollToSection('bases')}
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-[#3B82F6] transition"
            >
              // 3_LEARNING_BASES
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-[#3B82F6] transition hidden sm:inline-block"
            >
              // STATS
            </button>

            <div className="h-4 w-[1px] bg-[#1E293B] mx-1" />

            <Link 
              to="/ev" 
              className="px-3.5 py-1.5 bg-[#1E40AF] hover:bg-[#2563EB] text-white border border-[#3B82F6] font-mono text-xs rounded transition font-medium"
            >
              BOOK_EV
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-12">

        {/* SECTION 1: HERO & METRICS */}
        <section id="dashboard" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E293B] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0F172A] border border-[#1E40AF] font-mono text-[11px] text-[#3B82F6] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                SYSTEM_STATUS: ONLINE
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                ศูนย์วิจัยและถ่ายทอดเทคโนโลยีเพื่อการพัฒนาที่ยั่งยืน
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-mono">
                มหาวิทยาลัยมหิดล วิทยาเขตลำปาง (สบปราบ-ผาลาด)
              </p>
            </div>
            
            <a 
              href="https://mahidol-lampang.vercel.app" 
              className="inline-flex items-center gap-2 font-mono text-xs text-white hover:text-[#3B82F6] bg-[#0F172A] hover:bg-[#1E40AF]/30 border border-[#1E293B] hover:border-[#3B82F6] px-3.5 py-2 rounded transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> MAIN_MAP
            </a>
          </div>

          {/* Metric Cards: Black, Navy & White */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-[#0A0E17] p-6 rounded-md border border-[#1E293B] hover:border-[#1E40AF] transition relative">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-[#3B82F6]"><Zap className="w-3.5 h-3.5" /> TOTAL_CAPACITY</span>
                <span>METRIC_01</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-normal text-white tracking-tight">18.00</span>
                <span className="text-xs text-slate-400">kWp</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 border-t border-[#1E293B] pt-3">
                กำลังการผลิตติดตั้งติดตั้งครอบคลุมศูนย์วิจัยฯ
              </p>
            </div>

            <div className="bg-[#0A0E17] p-6 rounded-md border border-[#1E293B] hover:border-[#1E40AF] transition relative">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-white"><Sun className="w-3.5 h-3.5 text-[#3B82F6]" /> DAILY_GENERATION</span>
                <span>METRIC_02</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-normal text-white tracking-tight">21.04</span>
                <span className="text-xs text-slate-400">kWh</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 border-t border-[#1E293B] pt-3">
                ปริมาณพลังงานไฟฟ้าที่ผลิตได้ในวันนี้
              </p>
            </div>

            <div className="bg-[#0A0E17] p-6 rounded-md border border-[#1E293B] hover:border-[#1E40AF] transition relative">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-[#3B82F6]"><Leaf className="w-3.5 h-3.5" /> CARBON_OFFSET</span>
                <span>METRIC_03</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-normal text-white tracking-tight">19.05</span>
                <span className="text-xs text-slate-400">Tons</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 border-t border-[#1E293B] pt-3">
                ลดการปล่อยก๊าซเรือนกระจกสะสม
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: 3 LEARNING BASES */}
        <section id="bases" className="scroll-mt-24 space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <span className="font-mono text-xs text-[#3B82F6] tracking-widest">// ARCHITECTURE</span>
            <h2 className="text-2xl font-normal text-white tracking-tight mt-1">
              3 ฐานการเรียนรู้หลัก ศูนย์วิจัยมหิดล สบปราบ-ผาลาด
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Base 1 */}
            <div 
              onClick={() => setActiveBase('SOLAR')}
              className="bg-[#0A0E17] hover:bg-[#0F172A] border border-[#1E293B] hover:border-[#3B82F6] p-6 rounded-md transition duration-200 cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px] text-slate-400">
                  <span className="text-white bg-[#1E40AF] px-2 py-0.5 rounded border border-[#3B82F6]">BASE 01</span>
                  <span>SOLAR_SYS</span>
                </div>
                <h3 className="font-medium text-base text-white group-hover:text-[#3B82F6] transition flex items-center justify-between">
                  1. โซลาร์เซลล์ <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#3B82F6]" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  เรียนรู้โครงสร้างระบบ On-Grid, Off-Grid และ Hybrid การแปลงพลังงานแสงอาทิตย์เพื่อใช้งานในอาคาร
                </p>
              </div>
              <div className="bg-[#0A0E17] border border-[#1E293B] p-3 rounded font-mono text-[11px] text-slate-400 flex justify-between items-center">
                <span>INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#3B82F6]" />
              </div>
            </div>

            {/* Base 2 */}
            <div 
              onClick={() => setActiveBase('SMART_FARM')}
              className="bg-[#0A0E17] hover:bg-[#0F172A] border border-[#1E293B] hover:border-[#3B82F6] p-6 rounded-md transition duration-200 cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px] text-slate-400">
                  <span className="text-white bg-[#1E40AF] px-2 py-0.5 rounded border border-[#3B82F6]">BASE 02</span>
                  <span>AGRI_IOT</span>
                </div>
                <h3 className="font-medium text-base text-white group-hover:text-[#3B82F6] transition flex items-center justify-between">
                  2. เกษตรอัจฉริยะ <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#3B82F6]" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ระบบเซนเซอร์ตรวจวัดสภาวะแปลงปลูกแบบ IoT การให้น้ำและปุ๋ยอัตโนมัติเพิ่มคุณภาพผลผลิต
                </p>
              </div>
              <div className="bg-[#0A0E17] border border-[#1E293B] p-3 rounded font-mono text-[11px] text-slate-400 flex justify-between items-center">
                <span>INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#3B82F6]" />
              </div>
            </div>

            {/* Base 3 */}
            <div 
              onClick={() => setActiveBase('SOLAR_PUMP')}
              className="bg-[#0A0E17] hover:bg-[#0F172A] border border-[#1E293B] hover:border-[#3B82F6] p-6 rounded-md transition duration-200 cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px] text-slate-400">
                  <span className="text-white bg-[#1E40AF] px-2 py-0.5 rounded border border-[#3B82F6]">BASE 03</span>
                  <span>WATER_PUMP</span>
                </div>
                <h3 className="font-medium text-base text-white group-hover:text-[#3B82F6] transition flex items-center justify-between">
                  3. สูบน้ำพลังงานแสงอาทิตย์ <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#3B82F6]" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  การบริหารจัดการน้ำเพื่อการเกษตรด้วยปั๊มน้ำพลังงานโซลาร์เซลล์ ลดการใช้เชื้อเพลิง 100%
                </p>
              </div>
              <div className="bg-[#0A0E17] border border-[#1E293B] p-3 rounded font-mono text-[11px] text-slate-400 flex justify-between items-center">
                <span>INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#3B82F6]" />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: ANALYTICS CHART */}
        <section id="stats" className="scroll-mt-24 space-y-4 bg-[#0A0E17] border border-[#1E293B] p-6 rounded-md">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
            <h2 className="text-base font-normal text-white font-mono flex items-center gap-2">
              <LineChart className="w-4 h-4 text-[#3B82F6]" /> // PRODUCTION_ANALYTICS (kWh)
            </h2>
            <span className="font-mono text-xs text-slate-400">PERIOD: JAN-JUN 2026</span>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', color: '#FFFFFF' }} />
                <Area type="monotone" dataKey="solar" name="Solar Cell" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                <Area type="monotone" dataKey="grid" name="PEA Grid" stroke="#64748B" fill="#64748B" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

      </main>

      {/* --- BASE DETAILS MODAL --- */}
      {activeBase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0E17] border border-[#1E293B] w-full max-w-2xl rounded-md p-6 relative flex flex-col justify-between max-h-[85vh]">
            
            <div className="flex justify-between items-start border-b border-[#1E293B] pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#3B82F6] tracking-widest">{BASE_DETAILS[activeBase].tag}</span>
                <h3 className="text-lg font-medium text-white tracking-tight mt-0.5">
                  {BASE_DETAILS[activeBase].title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
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

            <div className="py-4 overflow-y-auto max-h-[55vh]">
              {BASE_DETAILS[activeBase].content}
            </div>

            <div className="border-t border-[#1E293B] pt-4 flex justify-between items-center font-mono">
              <span className="text-[11px] text-slate-400">MAHIDOL_SUSTAINABILITY_2026</span>
              <button
                onClick={() => setActiveBase(null)}
                className="px-4 py-2 text-xs font-semibold bg-[#1E40AF] hover:bg-[#2563EB] text-white border border-[#3B82F6] rounded transition"
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
