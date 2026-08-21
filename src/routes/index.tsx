import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  LineChart, ArrowLeft, X, 
  Zap, Sun, Cpu, Leaf,
  BatteryCharging, Network, Layers, Terminal, CheckCircle2, ChevronRight,
  Home, ChevronLeft, ClipboardList, Lock
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
      <div className="space-y-4 text-xs">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="text-[#0A2E4D] font-bold flex items-center gap-2 text-sm">
            <BatteryCharging className="w-4 h-4 text-[#F5B800]" /> ภาพรวมระบบ (System Overview)
          </div>
          <p className="text-slate-700 leading-relaxed">
            ระบบที่ผลิตไฟฟ้าจากแผงโซลาร์เซลล์แล้วนำพลังงานไปเก็บไว้ในแบตเตอรี่ เหมาะสำหรับพื้นที่ห่างไกลที่ไฟฟ้ายังเข้าไม่ถึง สามารถจ่ายไฟให้กับอุปกรณ์ไฟฟ้าพื้นฐานได้ตลอด 24 ชั่วโมง
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[#0A2E4D] flex items-center gap-1.5 mb-2 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#F5B800]" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-700 space-y-1.5 text-xs">
              <li>• พึ่งพาตนเองได้ 100% ไม่พึ่งพากระแสไฟฟ้าหลวง</li>
              <li>• มีไฟฟ้าใช้ในพื้นที่ห่างไกล/แปลงเกษตร</li>
              <li>• ปลอดภัยจากปัญหาไฟตกหรือไฟดับจากระบบหลัก</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[#0A2E4D] flex items-center gap-1.5 mb-2 font-bold text-xs">
              <Cpu className="w-4 h-4 text-[#F5B800]" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-700 space-y-1.5 text-xs">
              <li>• Solar Panels (แผงโซลาร์เซลล์)</li>
              <li>• Off-Grid Inverter / Charge Controller</li>
              <li>• Energy Storage (แบตเตอรี่เก็บไฟ)</li>
              <li>• Home Appliances (เครื่องใช้ไฟฟ้า)</li>
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
      <div className="space-y-4 text-xs">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="text-[#0A2E4D] font-bold flex items-center gap-2 text-sm">
            <Network className="w-4 h-4 text-[#F5B800]" /> ภาพรวมระบบ (System Overview)
          </div>
          <p className="text-slate-700 leading-relaxed">
            ระบบที่ผลิตไฟฟ้าเพื่อใช้งานร่วมกับระบบของการไฟฟ้าโดยตรง ผลิตไฟฟ้าใช้ทันทีในเวลากลางวัน ไม่มีแบตเตอรี่สำรอง ช่วยลดค่าไฟได้อย่างมีประสิทธิภาพสูงสุด และคืนทุนไวที่สุด
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[#0A2E4D] flex items-center gap-1.5 mb-2 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#F5B800]" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-700 space-y-1.5 text-xs">
              <li>• คุ้มค่าเงินลงทุนที่สุด (ROI สูงสุด)</li>
              <li>• ช่วยลดค่าไฟ Peak ในช่วงเวลากลางวัน</li>
              <li>• ระบบดูแลรักษาง่าย ไม่ต้องคอยเปลี่ยนแบตเตอรี่</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[#0A2E4D] flex items-center gap-1.5 mb-2 font-bold text-xs">
              <Cpu className="w-4 h-4 text-[#F5B800]" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-700 space-y-1.5 text-xs">
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
      <div className="space-y-4 text-xs">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="text-[#0A2E4D] font-bold flex items-center gap-2 text-sm">
            <Layers className="w-4 h-4 text-[#F5B800]" /> ภาพรวมระบบ (System Overview)
          </div>
          <p className="text-slate-700 leading-relaxed">
            ระบบที่เชื่อมต่อทั้งไฟจากการไฟฟ้าและมีแบตเตอรี่สำรองพลังงาน สามารถนำไฟฟ้าที่ผลิตได้กลางวันมาเก็บไว้ใช้ในเวลากลางคืน และทำงานเป็นไฟสำรอง (UPS) ได้ทันทีเมื่อไฟหลวงดับ
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[#0A2E4D] flex items-center gap-1.5 mb-2 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#F5B800]" /> จุดเด่นการใช้งาน
            </span>
            <ul className="text-slate-700 space-y-1.5 text-xs">
              <li>• มีไฟฟ้าใช้ต่อเนื่องแม้ยามไฟฟ้าหลวงดับ</li>
              <li>• บริหารจัดการพลังงานได้ยืดหยุ่น (Smart Energy Management)</li>
              <li>• ลดค่าไฟได้ทั้งกลางวันและกลางคืน</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[#0A2E4D] flex items-center gap-1.5 mb-2 font-bold text-xs">
              <Cpu className="w-4 h-4 text-[#F5B800]" /> อุปกรณ์หลักในระบบ
            </span>
            <ul className="text-slate-700 space-y-1.5 text-xs">
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
      { name: 'Solar PV Panels', sub: 'ผลิตไฟฟ้า DC', icon: Sun, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'Off-Grid Inverter', sub: 'แปลงไฟ DC เป็น AC', icon: Cpu, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'Energy Storage', sub: 'แบตเตอรี่เก็บไฟ', icon: BatteryCharging, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'Home Appliances', sub: 'จ่ายโหลดใช้ในบ้าน', icon: Home, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' }
    ]
  },
  {
    id: 'ON_GRID',
    title: '2. ระบบ On-Grid',
    desc: 'ระบบเชื่อมต่อสายส่งการไฟฟ้าเพื่อลดค่าไฟช่วงกลางวัน',
    nodes: [
      { name: 'Solar PV Panels', sub: 'ผลิตไฟฟ้า DC', icon: Sun, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'On-Grid Inverter', sub: 'แปลงไฟ Sync กับระบบการไฟฟ้า', icon: Cpu, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'PEA Power Grid', sub: 'เชื่อมต่อสายส่งการไฟฟ้า', icon: Network, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'Home Appliances', sub: 'จ่ายโหลดใช้ในบ้าน', icon: Home, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' }
    ]
  },
  {
    id: 'HYBRID',
    title: '3. ระบบ Hybrid',
    desc: 'ระบบผสมผสานเชื่อมสายส่งและแบตเตอรี่สำรองไฟ 24 ชม.',
    nodes: [
      { name: 'Solar PV Panels', sub: 'ผลิตไฟฟ้า DC', icon: Sun, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'Hybrid Inverter', sub: 'ควบคุมการจ่ายไฟ 3 ทาง', icon: Layers, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'Energy Storage & Grid', sub: 'แบตเตอรี่ + สายส่งการไฟฟ้า', icon: BatteryCharging, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' },
      { name: 'Home Appliances', sub: 'จ่ายโหลดใช้ในบ้านต่อเนื่อง', icon: Home, color: 'bg-[#0A2E4D]/10 text-[#0A2E4D] border-sky-200' }
    ]
  }
];

function VerticalFlowArrow() {
  return (
    <div className="flex flex-col items-center justify-center my-2 space-y-1">
      <div className="w-[2px] h-4 bg-[#0A2E4D]" />
      <div className="w-2 h-2 border-r-2 border-b-2 border-[#0A2E4D] rotate-45 -mt-1.5" />
    </div>
  );
}

export function CleanEnergyPortal() {
  const [activeBase, setActiveBase] = useState<BaseType | null>(null);
  const [currentDiagramIndex, setCurrentDiagramIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const nextDiagram = () => {
    setCurrentDiagramIndex((prev) => (prev + 1) % DIAGRAM_SYSTEMS.length);
  };

  const prevDiagram = () => {
    setCurrentDiagramIndex((prev) => (prev - 1 + DIAGRAM_SYSTEMS.length) % DIAGRAM_SYSTEMS.length);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-['Mitr'] selection:bg-[#801818] selection:text-white flex flex-col justify-between antialiased">
      
      {/* ==================== SINGLE NAVBAR (ตรงกับหน้าแรก) ==================== */}
      <header className="sticky top-0 z-50 bg-[#0A2E4D] text-white shadow-md border-b border-[#08233C]">
        <nav className="max-w-7xl mx-auto px-4 lg:px-6 py-2.5">
          <div className="flex items-center justify-between gap-4">
            
            {/* ฝั่งซ้าย: โลโก้ 3 ตัว + เส้นแบ่ง + ข้อความ */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-lg h-9 sm:h-11 flex items-center justify-center shrink-0 shadow-sm">
                  <img 
                    src="/envi-logo.jpg" 
                    alt="Envi Mahidol Logo" 
                    className="h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerText = '🌍 Envi';
                    }}
                  />
                </div>

                <div className="bg-white p-1 rounded-lg h-9 sm:h-11 flex items-center justify-center shrink-0 shadow-sm">
                  <img 
                    src="/mahidol-logo.png" 
                    alt="Mahidol University Logo" 
                    className="h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerText = '🏛️ Mahidol';
                    }}
                  />
                </div>

                <div className="bg-white p-1 rounded-lg h-9 sm:h-11 flex items-center justify-center shrink-0 shadow-sm">
                  <img 
                    src="/social-engagement-logo.png" 
                    alt="Social Engagement Logo" 
                    className="h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerText = '🤝 Social';
                    }}
                  />
                </div>
              </div>

              <div className="w-[1px] h-8 sm:h-10 bg-white/20 shrink-0 hidden sm:block"></div>

              <div className="hidden sm:block">
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white block leading-snug">
                  งานพันธกิจเพื่อสังคม สำนักงานวิจัยและวิทยบริการ
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-[#F5B800] block leading-tight mt-0.5">
                  คณะสิ่งแวดล้อมและทรัพยากรศาสตร์ มหาวิทยาลัยมหิดล จังหวัดลำปาง
                </span>
              </div>
            </div>

            {/* ฝั่งขวา: เมนูนำทาง */}
            <div className="hidden xl:flex items-center space-x-5 text-xs sm:text-sm font-normal text-slate-200 shrink-0">
              <Link to="/" className="hover:text-[#F5B800] transition-colors py-1">
                หน้าแรก
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("flow")}
                className="hover:text-[#F5B800] transition-colors py-1 cursor-pointer"
              >
                ไดอะแกรมระบบ
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("bases")}
                className="hover:text-[#F5B800] transition-colors py-1 cursor-pointer"
              >
                ฐานการเรียนรู้
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("stats")}
                className="hover:text-[#F5B800] transition-colors py-1 cursor-pointer"
              >
                สถิติพลังงาน
              </button>
              <Link to="/ev" className="hover:text-[#F5B800] transition-colors py-1">
                จอง EV Charger
              </Link>
              <Link to="/survey" className="hover:text-[#F5B800] transition-colors py-1">
                แบบสอบถาม
              </Link>
              <Link to="/dashboard" className="hover:text-[#F5B800] transition-colors py-1">
                สรุปผลแบบประเมินความพึงพอใจ
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="xl:hidden shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-[#F5B800]"
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>

          </div>

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="xl:hidden mt-3 pt-3 border-t border-white/15 space-y-2 text-sm font-normal">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white">
                หน้าแรก
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("flow")}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white"
              >
                ไดอะแกรมระบบ
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("bases")}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white"
              >
                ฐานการเรียนรู้
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("stats")}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white"
              >
                สถิติพลังงาน
              </button>
              <Link to="/ev" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white">
                จอง EV Charger
              </Link>
              <Link to="/survey" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white">
                แบบสอบถาม
              </Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white">
                สรุปผลแบบประเมินความพึงพอใจ
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 w-full">

        {/* HERO SECTION - พลังงานสะอาด */}
        <header className="bg-gradient-to-r from-[#0A2E4D] via-[#0E416C] to-[#125389] text-white py-14 sm:py-16 px-6 sm:px-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="space-y-4 text-center md:text-left relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-[#F5B800] font-medium text-xs sm:text-sm tracking-wide px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse"></span>
              ⚡ ศูนย์วิจัยและถ่ายทอดเทคโนโลยีพลังงานสะอาด มหาวิทยาลัยมหิดล
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight drop-shadow-md">
              ระบบพลังงานแสงอาทิตย์ & EV Carport
            </h1>
            <p className="text-sm sm:text-base font-light text-sky-100/90 leading-relaxed">
              งานพันธกิจเพื่อสังคม คณะสิ่งแวดล้อมและทรัพยากรศาสตร์ มหาวิทยาลัยมหิดล อ.สบปราบ จ.ลำปาง
            </p>
          </div>

          <a 
            href="https://mahidol-lampang-portal.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#F5B800] text-[#0A2E4D] hover:bg-[#ffc926] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 relative z-10"
          >
            <ArrowLeft className="w-4 h-4 text-[#0A2E4D]" /> กลับหน้าหลัก PORTAL
          </a>
        </header>

        {/* METRIC CARDS */}
        <section id="dashboard" className="scroll-mt-24 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-2 text-[#0A2E4D] font-bold">
                  <Zap className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" /> กำลังการผลิตรวม
                </span>
                <span className="text-[#F5B800] font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">METRIC 01</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-bold text-slate-800 font-mono">18.00</span>
                <span className="text-xs text-slate-500 font-semibold">kWp</span>
              </div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 font-normal">
                กำลังการผลิตติดตั้งรวมครอบคลุมอาคารศูนย์วิจัยฯ
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-2 text-[#0A2E4D] font-bold">
                  <Sun className="w-4 h-4 text-[#F5B800]" /> ไฟฟ้าที่ผลิตได้วันนี้
                </span>
                <span className="text-[#F5B800] font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">METRIC 02</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-bold text-slate-800 font-mono">21.04</span>
                <span className="text-xs text-slate-500 font-semibold">kWh</span>
              </div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 font-normal">
                ปริมาณพลังงานไฟฟ้าแสงอาทิตย์ที่ผลิตสะสมวันนี้
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-2 text-[#0A2E4D] font-bold">
                  <Leaf className="w-4 h-4 text-[#2D5A27]" /> ลดการปล่อยก๊าซคาร์บอน
                </span>
                <span className="text-[#2D5A27] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">METRIC 03</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-bold text-[#2D5A27] font-mono">19.05</span>
                <span className="text-xs text-slate-500 font-semibold">Tons</span>
              </div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 font-normal">
                ปริมาณก๊าซเรือนกระจกที่ช่วยลดลงได้สะสม
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 2: VERTICAL FLOW DIAGRAM */}
        <section id="flow" className="scroll-mt-24 space-y-6">
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/40 space-y-6">
            
            <div className="border-b border-slate-100 pb-4 text-center sm:text-left space-y-1">
              <span className="text-xs font-semibold text-[#F5B800] bg-[#0A2E4D] px-3 py-1 rounded-full uppercase tracking-wider">
                ⚡ Electrical Flow Diagram
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 pt-1">
                ไดอะแกรมการไหลของพลังงานไฟฟ้า 3 ระบบ
              </h2>
            </div>

            <div className="bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-inner">
              
              <div className="text-center mb-6 space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                  {DIAGRAM_SYSTEMS[currentDiagramIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal">
                  {DIAGRAM_SYSTEMS[currentDiagramIndex].desc}
                </p>
              </div>

              <div className="flex flex-col items-center max-w-md mx-auto">
                {DIAGRAM_SYSTEMS[currentDiagramIndex].nodes.map((node, index, arr) => {
                  const IconComponent = node.icon;
                  return (
                    <div key={index} className="w-full flex flex-col items-center">
                      
                      <div className="w-full bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-sm text-center flex flex-col items-center space-y-2 hover:border-[#0A2E4D] transition-colors group">
                        <div className={`w-12 h-12 rounded-xl border ${node.color} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                          <IconComponent className="w-6 h-6 text-[#0A2E4D]" />
                        </div>
                        <div className="font-bold text-sm text-slate-800">{node.name}</div>
                        <p className="text-xs text-slate-500 font-normal">{node.sub}</p>
                      </div>

                      {index < arr.length - 1 && (
                        <VerticalFlowArrow />
                      )}

                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-slate-200/80 pt-6 mt-6">
                <button 
                  type="button"
                  onClick={prevDiagram}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs rounded-xl transition-all flex items-center gap-1.5 font-semibold border border-slate-300 shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-[#0A2E4D]" /> ย้อนกลับ
                </button>

                <div className="flex items-center gap-2">
                  {DIAGRAM_SYSTEMS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentDiagramIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentDiagramIndex === idx ? 'w-8 bg-[#0A2E4D] shadow-2xs' : 'w-2.5 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={nextDiagram}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs rounded-xl transition-all flex items-center gap-1.5 font-semibold border border-slate-300 shadow-2xs cursor-pointer"
                >
                  ถัดไป <ChevronRight className="w-4 h-4 text-[#0A2E4D]" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: 3 SOLAR SYSTEM BASES */}
        <section id="bases" className="scroll-mt-24 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              🏛️ 3 ฐานการเรียนรู้ระบบโซลาร์เซลล์ ศูนย์วิจัยมหิดล
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              คลิกการ์ดเพื่อเปิดดูโครงสร้างอุปกรณ์และคุณสมบัติเจาะลึก
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div 
              onClick={() => setActiveBase('OFF_GRID')}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 p-6 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white bg-[#0A2E4D] px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#F5B800] text-[#F5B800]" /> ฐานที่ 1
                  </span>
                  <span className="text-slate-500 font-medium">OFF_GRID</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#801818] transition-colors flex items-center justify-between">
                  1. ระบบ Off-Grid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#801818]" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  ระบบอิสระไม่เชื่อมต่อสายส่งการไฟฟ้า สำรองไฟเข้าแบตเตอรี่ เหมาะสำหรับพื้นที่ห่างไกล
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-xs text-slate-700 flex justify-between items-center group-hover:border-slate-300 font-semibold">
                <span>เปิดอ่านคู่มือฐาน</span>
                <Terminal className="w-4 h-4 text-[#0A2E4D]" />
              </div>
            </div>

            <div 
              onClick={() => setActiveBase('ON_GRID')}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 p-6 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white bg-[#0A2E4D] px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#F5B800] text-[#F5B800]" /> ฐานที่ 2
                  </span>
                  <span className="text-slate-500 font-medium">ON_GRID</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#0A2E4D] transition-colors flex items-center justify-between">
                  2. ระบบ On-Grid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0A2E4D]" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  ระบบเชื่อมสายส่งไฟฟ้าหลวง เน้นผลิตไฟใช้ตอนกลางวัน ลดค่าไฟฟ้าได้สูงสุดและคืนทุนไวที่สุด
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-xs text-slate-700 flex justify-between items-center group-hover:border-slate-300 font-semibold">
                <span>เปิดอ่านคู่มือฐาน</span>
                <Terminal className="w-4 h-4 text-[#0A2E4D]" />
              </div>
            </div>

            <div 
              onClick={() => setActiveBase('HYBRID')}
              className="bg-white hover:bg-slate-50/80 border border-slate-200/90 p-6 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white bg-[#0A2E4D] px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#F5B800] text-[#F5B800]" /> ฐานที่ 3
                  </span>
                  <span className="text-slate-500 font-medium">HYBRID</span>
                </div>
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#2D5A27] transition-colors flex items-center justify-between">
                  3. ระบบ Hybrid <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2D5A27]" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  ระบบผสมผสานเชื่อมต่อสายส่งร่วมกับแบตเตอรี่ มีไฟสำรองใช้อย่างต่อเนื่องแม้เวลาไฟดับ
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-xs text-slate-700 flex justify-between items-center group-hover:border-slate-300 font-semibold">
                <span>เปิดอ่านคู่มือฐาน</span>
                <Terminal className="w-4 h-4 text-[#0A2E4D]" />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: ANALYTICS CHART */}
        <section id="stats" className="scroll-mt-24 space-y-4">
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-[#0A2E4D]" /> สถิติกำลังการผลิตไฟฟ้ารายเดือน (kWh)
              </h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">รอบมกราคม - มิถุนายน 2026</span>
            </div>
            
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionData}>
                  <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '11px', fontFamily: 'Mitr, sans-serif' }} />
                  <YAxis stroke="#64748B" style={{ fontSize: '11px', fontFamily: 'Mitr, sans-serif' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#0A2E4D', borderRadius: '12px', fontFamily: 'Mitr, sans-serif', fontSize: '12px', color: '#1E293B', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Area type="monotone" dataKey="solar" name="พลังงานโซลาร์เซลล์" stroke="#0A2E4D" fill="#0A2E4D" fillOpacity={0.15} />
                  <Area type="monotone" dataKey="grid" name="สายส่งการไฟฟ้า PEA" stroke="#F5B800" fill="#F5B800" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

      </main>

      {/* BASE DETAILS MODAL */}
      {activeBase && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity"
          onClick={() => setActiveBase(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-sky-50 text-[#0A2E4D] border border-sky-200 rounded-full">{BASE_DETAILS[activeBase].tag}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight mt-1">
                  {BASE_DETAILS[activeBase].title}
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  {BASE_DETAILS[activeBase].subtitle}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setActiveBase(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 overflow-y-auto max-h-[60vh]">
              {BASE_DETAILS[activeBase].content}
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">MAHIDOL CLEAN ENERGY 2026</span>
              <button
                type="button"
                onClick={() => setActiveBase(null)}
                className="px-5 py-2.5 font-semibold bg-[#0A2E4D] hover:bg-[#071F34] text-white rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#071F34] text-slate-300 py-10 border-t border-slate-800 mt-16 space-y-3 text-center">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed">
            งานพันธกิจเพื่อสังคม สำนักงานวิจัยและวิทยบริการ คณะสิ่งแวดล้อมและทรัพยากรศาสตร์ มหาวิทยาลัยมหิดล จังหวัดลำปาง
          </p>
          <p className="text-slate-500 text-xs font-mono">
            © 2026 Faculty of Environment and Resource Studies, Mahidol University. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default CleanEnergyPortal;
