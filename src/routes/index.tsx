import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BookOpen, LineChart, ArrowLeft, X, 
  Zap, Sun, Cpu, Activity, Leaf, GraduationCap,
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
        <div className="bg-[#1a1a1a] p-4 rounded-md border border-[#002D62] space-y-2">
          <div className="text-[#F2A900] font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F2A900]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            ศึกษารูปแบบการติดตั้งและการทำงานจริงของระบบโซลาร์เซลล์ทั้ง On-Grid, Off-Grid และ Hybrid รวมถึงการบันทึกข้อมูลการผลิตไฟฟ้า (Data Logging) ส่งขึ้น Cloud แบบ Real-time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#101010] p-3.5 rounded-md border border-[#3d3a39]">
            <span className="font-mono text-[#F2A900] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> หัวข้อการเรียนรู้
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• หลักการแปลงพลังงานแสงอาทิตย์เป็นไฟฟ้า</li>
              <li>• การเปรียบเทียบ Inverter แต่ละชนิด</li>
              <li>• การคำนวณจุดคุ้มทุน (ROI) และ Carbon Offsets</li>
            </ul>
          </div>
          <div className="bg-[#101010] p-3.5 rounded-md border border-[#3d3a39]">
            <span className="font-mono text-[#00d992] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <Cpu className="w-3.5 h-3.5" /> อุปกรณ์สาธิต
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
        <div className="bg-[#1a1a1a] p-4 rounded-md border border-[#002D62] space-y-2">
          <div className="text-[#F2A900] font-semibold flex items-center gap-2">
            <Sprout className="w-4 h-4 text-[#F2A900]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            การประยุกต์ใช้ IoT ตรวจวัดความชื้นในดิน อุณหภูมิ แสง และความเข้มธาตุอาหารในดิน ควบคุมระบบให้น้ำและปุ๋ยผ่าน Automation Controller เพื่อเพิ่มคุณภาพผลผลิต
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#101010] p-3.5 rounded-md border border-[#3d3a39]">
            <span className="font-mono text-[#F2A900] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> หัวข้อการเรียนรู้
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• การติดตั้งเซนเซอร์ไร้สายระยะไกล (LoRaWAN)</li>
              <li>• การตั้งค่าวงจรวาล์วน้ำอัตโนมัติตามค่าความชื้น</li>
              <li>• การวิเคราะห์สภาวะอากาศล่วงหน้าเพื่อการเกษตร</li>
            </ul>
          </div>
          <div className="bg-[#101010] p-3.5 rounded-md border border-[#3d3a39]">
            <span className="font-mono text-[#00d992] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <Cpu className="w-3.5 h-3.5" /> อุปกรณ์สาธิต
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
        <div className="bg-[#1a1a1a] p-4 rounded-md border border-[#002D62] space-y-2">
          <div className="text-[#F2A900] font-semibold flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#F2A900]" /> SYSTEM_OVERVIEW
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            การดึงพลังงานตรงจากแสงอาทิตย์ผ่าน Solar Inverter ปั๊มน้ำเข้าสู่วงจรปั๊มหอยโข่งหรือปั๊มบาดาลโดยตรง เพื่อเติมน้ำใส่พักแปลงเกษตร ลดต้นทุนค่าน้ำมันเชื้อเพลิงอย่างยั่งยืน
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
          <div className="bg-[#101010] p-3.5 rounded-md border border-[#3d3a39]">
            <span className="font-mono text-[#F2A900] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> หัวข้อการเรียนรู้
            </span>
            <ul className="text-slate-300 space-y-1 text-xs">
              <li>• การเลือกขนาดปั๊มน้ำ (DC Brushless vs AC)</li>
              <li>• การคำนวณ Head สูบส่งและปริมาณน้ำต่อชั่วโมง</li>
              <li>• ระบบตัดการทำงานอัตโนมัติเมื่อน้ำแห้ง (Dry-run)</li>
            </ul>
          </div>
          <div className="bg-[#101010] p-3.5 rounded-md border border-[#3d3a39]">
            <span className="font-mono text-[#00d992] flex items-center gap-1.5 mb-1.5 text-[11px]">
              <Cpu className="w-3.5 h-3.5" /> อุปกรณ์สาธิต
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
    <div className="font-sans bg-[#101010] min-h-screen text-[#f2f2f2] antialiased selection:bg-[#F2A900] selection:text-[#002D62] pb-24 border-t-2 border-[#F2A900]">
      
      {/* Top Console Bar */}
      <header className="sticky top-0 z-40 bg-[#101010]/95 backdrop-blur border-b border-[#3d3a39] px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#002D62] border border-[#F2A900] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-[#F2A900]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-white tracking-tight leading-none">
                MAHIDOL <span className="text-[#F2A900] font-mono text-xs">[RESEARCH_CENTER]</span>
              </span>
              <span className="font-mono text-[10px] text-[#8b949e]">Sopprab-Phalat Campus</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="px-3 py-1.5 text-xs font-mono text-[#bdbdbd] hover:text-[#F2A900] transition"
            >
              // DASHBOARD
            </button>
            <button 
              onClick={() => scrollToSection('bases')}
              className="px-3 py-1.5 text-xs font-mono text-[#bdbdbd] hover:text-[#F2A900] transition"
            >
              // 3_LEARNING_BASES
            </button>
            <button 
              onClick={() => scrollToSection('stats')}
              className="px-3 py-1.5 text-xs font-mono text-[#bdbdbd] hover:text-[#F2A900] transition hidden sm:inline-block"
            >
              // STATS
            </button>

            <div className="h-4 w-[1px] bg-[#3d3a39] mx-1" />

            <Link 
              to="/ev" 
              className="px-3 py-1.5 bg-[#002D62] hover:bg-[#003b80] border border-[#F2A900]/60 text-[#F2A900] font-mono text-xs rounded transition"
            >
              BOOK_EV
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-12">

        {/* SECTION 1: HERO & METRICS */}
        <section id="dashboard" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#3d3a39] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1a1a1a] border border-[#3d3a39] font-mono text-[11px] text-[#F2A900] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d992] animate-pulse" />
                SYSTEM_STATUS: ONLINE
              </div>
              <h1 className="text-3xl md:text-4xl font-normal text-white tracking-tight">
                ศูนย์วิจัยและถ่ายทอดเทคโนโลยีเพื่อการพัฒนาที่ยั่งยืน
              </h1>
              <p className="text-sm text-[#bdbdbd] mt-1 font-mono">
                มหาวิทยาลัยมหิดล วิทยาเขตลำปาง (สบปราบ-ผาลาด)
              </p>
            </div>
            
            <a 
              href="https://mahidol-lampang.vercel.app" 
              className="inline-flex items-center gap-2 font-mono text-xs text-[#f2f2f2] hover:text-[#F2A900] bg-[#1a1a1a] hover:bg-[#002D62] border border-[#3d3a39] px-3.5 py-2 rounded transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> MAIN_MAP
            </a>
          </div>

          {/* Voltagent Style Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-[#101010] p-6 rounded-md border border-[#3d3a39] hover:border-[#002D62] transition relative">
              <div className="flex items-center justify-between font-mono text-xs text-[#8b949e]">
                <span className="flex items-center gap-1.5 text-[#F2A900]"><Zap className="w-3.5 h-3.5" /> TOTAL_CAPACITY</span>
                <span>METRIC_01</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-normal text-white tracking-tight">18.00</span>
                <span className="text-xs text-[#8b949e]">kWp</span>
              </div>
              <p className="text-xs text-[#bdbdbd] mt-3 border-t border-[#1a1a1a] pt-3">
                กำลังการผลิตติดตั้งติดตั้งครอบคลุมศูนย์วิจัยฯ
              </p>
            </div>

            <div className="bg-[#101010] p-6 rounded-md border border-[#3d3a39] hover:border-[#002D62] transition relative">
              <div className="flex items-center justify-between font-mono text-xs text-[#8b949e]">
                <span className="flex items-center gap-1.5 text-sky-400"><Sun className="w-3.5 h-3.5" /> DAILY_GENERATION</span>
                <span>METRIC_02</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-normal text-white tracking-tight">21.04</span>
                <span className="text-xs text-[#8b949e]">kWh</span>
              </div>
              <p className="text-xs text-[#bdbdbd] mt-3 border-t border-[#1a1a1a] pt-3">
                ปริมาณพลังงานไฟฟ้าที่ผลิตได้ในวันนี้
              </p>
            </div>

            <div className="bg-[#101010] p-6 rounded-md border border-[#3d3a39] hover:border-[#002D62] transition relative">
              <div className="flex items-center justify-between font-mono text-xs text-[#8b949e]">
                <span className="flex items-center gap-1.5 text-[#00d992]"><Leaf className="w-3.5 h-3.5" /> CARBON_OFFSET</span>
                <span>METRIC_03</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-normal text-white tracking-tight">19.05</span>
                <span className="text-xs text-[#8b949e]">Tons</span>
              </div>
              <p className="text-xs text-[#bdbdbd] mt-3 border-t border-[#1a1a1a] pt-3">
                ลดการปล่อยก๊าซเรือนกระจกสะสม
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: 3 LEARNING BASES */}
        <section id="bases" className="scroll-mt-24 space-y-6">
          <div className="border-b border-[#3d3a39] pb-4">
            <span className="font-mono text-xs text-[#F2A900] tracking-widest">// ARCHITECTURE</span>
            <h2 className="text-2xl font-normal text-white tracking-tight mt-1">
              3 ฐานการเรียนรู้หลัก ศูนย์วิจัยมหิดล สบปราบ-ผาลาด
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Base 1 */}
            <div 
              onClick={() => setActiveBase('SOLAR')}
              className="bg-[#101010] hover:bg-[#1a1a1a] border border-[#3d3a39] hover:border-[#F2A900] p-6 rounded-md transition duration-200 cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px] text-[#8b949e]">
                  <span className="text-[#F2A900] bg-[#002D62] px-2 py-0.5 rounded border border-[#F2A900]/40">BASE 01</span>
                  <span>SOLAR_SYS</span>
                </div>
                <h3 className="font-medium text-base text-white group-hover:text-[#F2A900] transition flex items-center justify-between">
                  1. โซลาร์เซลล์ <ChevronRight className="w-4 h-4 text-[#8b949e] group-hover:text-[#F2A900]" />
                </h3>
                <p className="text-xs text-[#bdbdbd] leading-relaxed">
                  เรียนรู้โครงสร้างระบบ On-Grid, Off-Grid และ Hybrid การแปลงพลังงานแสงอาทิตย์เพื่อใช้งานในอาคาร
                </p>
              </div>
              <div className="bg-[#101010] border border-[#3d3a39] p-3 rounded font-mono text-[11px] text-[#8b949e] flex justify-between items-center">
                <span>INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#F2A900]" />
              </div>
            </div>

            {/* Base 2 */}
            <div 
              onClick={() => setActiveBase('SMART_FARM')}
              className="bg-[#101010] hover:bg-[#1a1a1a] border border-[#3d3a39] hover:border-[#00d992] p-6 rounded-md transition duration-200 cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px] text-[#8b949e]">
                  <span className="text-[#00d992] bg-[#101010] px-2 py-0.5 rounded border border-[#00d992]/40">BASE 02</span>
                  <span>AGRI_IOT</span>
                </div>
                <h3 className="font-medium text-base text-white group-hover:text-[#00d992] transition flex items-center justify-between">
                  2. เกษตรอัจฉริยะ <ChevronRight className="w-4 h-4 text-[#8b949e] group-hover:text-[#00d992]" />
                </h3>
                <p className="text-xs text-[#bdbdbd] leading-relaxed">
                  ระบบเซนเซอร์ตรวจวัดสภาวะแปลงปลูกแบบ IoT การให้น้ำและปุ๋ยอัตโนมัติเพิ่มคุณภาพผลผลิต
                </p>
              </div>
              <div className="bg-[#101010] border border-[#3d3a39] p-3 rounded font-mono text-[11px] text-[#8b949e] flex justify-between items-center">
                <span>INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-[#00d992]" />
              </div>
            </div>

            {/* Base 3 */}
            <div 
              onClick={() => setActiveBase('SOLAR_PUMP')}
              className="bg-[#101010] hover:bg-[#1a1a1a] border border-[#3d3a39] hover:border-sky-400 p-6 rounded-md transition duration-200 cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono text-[11px] text-[#8b949e]">
                  <span className="text-sky-400 bg-[#101010] px-2 py-0.5 rounded border border-sky-400/40">BASE 03</span>
                  <span>WATER_PUMP</span>
                </div>
                <h3 className="font-medium text-base text-white group-hover:text-sky-400 transition flex items-center justify-between">
                  3. สูบน้ำพลังงานแสงอาทิตย์ <ChevronRight className="w-4 h-4 text-[#8b949e] group-hover:text-sky-400" />
                </h3>
                <p className="text-xs text--[#bdbdbd] leading-relaxed">
                  การบริหารจัดการน้ำเพื่อการเกษตรด้วยปั๊มน้ำพลังงานโซลาร์เซลล์ ลดการใช้เชื้อเพลิง 100%
                </p>
              </div>
              <div className="bg-[#101010] border border-[#3d3a39] p-3 rounded font-mono text-[11px] text-[#8b949e] flex justify-between items-center">
                <span>INSPECT_BASE</span>
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: ANALYTICS CHART */}
        <section id="stats" className="scroll-mt-24 space-y-4 bg-[#101010] border border-[#3d3a39] p-6 rounded-md">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-4">
            <h2 className="text-base font-normal text-white font-mono flex items-center gap-2">
              <LineChart className="w-4 h-4 text-[#F2A900]" /> // PRODUCTION_ANALYTICS (kWh)
            </h2>
            <span className="font-mono text-xs text-[#8b949e]">PERIOD: JAN-JUN 2026</span>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <XAxis dataKey="month" stroke="#8b949e" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <YAxis stroke="#8b949e" style={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#3d3a39', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', color: '#f2f2f2' }} />
                <Area type="monotone" dataKey="solar" name="Solar Cell" stroke="#F2A900" fill="#F2A900" fillOpacity={0.1} />
                <Area type="monotone" dataKey="grid" name="PEA Grid" stroke="#002D62" fill="#002D62" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

      </main>

      {/* --- BASE DETAILS MODAL --- */}
      {activeBase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101010] border border-[#3d3a39] w-full max-w-2xl rounded-md p-6 relative flex flex-col justify-between max-h-[85vh]">
            
            <div className="flex justify-between items-start border-b border-[#3d3a39] pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#F2A900] tracking-widest">{BASE_DETAILS[activeBase].tag}</span>
                <h3 className="text-lg font-medium text-white tracking-tight mt-0.5">
                  {BASE_DETAILS[activeBase].title}
                </h3>
                <p className="text-xs text-[#8b949e] font-mono mt-0.5">
                  {BASE_DETAILS[activeBase].subtitle}
                </p>
              </div>
              <button 
                onClick={() => setActiveBase(null)}
                className="p-1 text-[#8b949e] hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto max-h-[55vh]">
              {BASE_DETAILS[activeBase].content}
            </div>

            <div className="border-t border-[#3d3a39] pt-4 flex justify-between items-center font-mono">
              <span className="text-[11px] text-[#8b949e]">MU_SUSTAINABILITY_2026</span>
              <button
                onClick={() => setActiveBase(null)}
                className="px-4 py-2 text-xs font-semibold bg-[#002D62] hover:bg-[#003b80] text-[#F2A900] border border-[#F2A900]/40 rounded transition"
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
