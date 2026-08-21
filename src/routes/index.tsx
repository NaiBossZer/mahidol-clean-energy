import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  LineChart, ArrowLeft, X, 
  Zap, Sun, Cpu, Leaf,
  BatteryCharging, Network, Layers, Terminal, CheckCircle2, ChevronRight,
  Home, ChevronLeft
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Route = createFileRoute('/')({
  component: CleanEnergyPortal,
});

// ข้อมูล 6 ภาพสไลด์แบนเนอร์เฉพาะสำหรับ Clean Energy Portal
const CLEAN_ENERGY_SLIDES = [
  {
    id: 1,
    image: "/Banner 1.jpg",
    badge: "MAHIDOL CLEAN ENERGY HUB",
    title: "ศูนย์วิจัยพลังงานสะอาด มหิดล",
    subtitle: "งานพันธกิจเพื่อสังคม คณะสิ่งแวดล้อมและทรัพยากรศาสตร์ มหาวิทยาลัยมหิดล อ.สบปราบ จ.ลำปาง",
    buttonText: "สำรวจระบบโซลาร์เซลล์",
    buttonLink: "#bases",
  },
  {
    id: 2,
    image: "/Banner 2.jpg",
    badge: "SOLAR BASE 01 // OFF-GRID",
    title: "ระบบพลังงานแสงอาทิตย์ Off-Grid",
    subtitle: "ระบบผลิตไฟฟ้าแบบอิสระพร้อมแบตเตอรี่สำรอง เหมาะสำหรับพื้นที่ห่างไกลและการเกษตร",
    buttonText: "ดูคู่มือระบบ Off-Grid",
    buttonLink: "#bases",
  },
  {
    id: 3,
    image: "/Banner 3.jpg",
    badge: "SOLAR BASE 02 // ON-GRID",
    title: "ระบบพลังงานแสงอาทิตย์ On-Grid",
    subtitle: "ระบบเชื่อมต่อสายส่งการไฟฟ้า มุ่งเน้นลดค่าไฟฟ้าในช่วงกลางวัน คืนทุนไวที่สุด",
    buttonText: "ดูคู่มือระบบ On-Grid",
    buttonLink: "#bases",
  },
  {
    id: 4,
    image: "/Banner 4.jpg",
    badge: "SOLAR BASE 03 // HYBRID",
    title: "ระบบพลังงานแสงอาทิตย์ Hybrid",
    subtitle: "ระบบผสมผสานเชื่อมสายส่งและแบตเตอรี่สำรองไฟ จ่ายไฟฟ้าต่อเนื่อง 24 ชั่วโมง",
    buttonText: "ดูคู่มือระบบ Hybrid",
    buttonLink: "#bases",
  },
  {
    id: 5,
    image: "/Banner 5.jpg",
    badge: "EV CARPORT // SMART CHARGING",
    title: "โรงจอดรถโซลาร์ & EV Charger",
    subtitle: "สถานีอัดประจุไฟฟ้าพลังงานแสงอาทิตย์เพื่อยานยนต์ไฟฟ้า มหาวิทยาลัยมหิดล",
    buttonText: "ชาร์จไฟฟ้าที่สถานี",
    buttonLink: "/ev",
  },
  {
    id: 6,
    image: "/Banner 6.jpg",
    badge: "REALTIME ANALYTICS",
    title: "สถิติการผลิตไฟฟ้า & คาร์บอนเครดิต",
    subtitle: "ติดตามการลดก๊าซเรือนกระจกและสถิติกำลังการผลิตไฟฟ้ารายเดือนในศูนย์วิจัย",
    buttonText: "ดูสถิติการผลิตไฟฟ้า",
    buttonLink: "#stats",
  },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);

  // ตั้งเวลาเปลี่ยนภาพสไลด์อัตโนมัติทุกๆ 5 วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === CLEAN_ENERGY_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? CLEAN_ENERGY_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === CLEAN_ENERGY_SLIDES.length - 1 ? 0 : prev + 1));
  };

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
      
      {/* ==================== NAVBAR (5 เมนูนำทางตรงตามที่ระบุ) ==================== */}
      <header className="sticky top-0 z-50 bg-[#0A2E4D] text-white shadow-md border-b-2 border-[#004B87]">
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

            {/* ฝั่งขวา: เมนูนำทาง 5 รายการ */}
            <div className="hidden xl:flex items-center space-x-6 text-xs sm:text-sm font-normal text-slate-200 shrink-0">
              <Link to="/" className="hover:text-[#F5B800] transition-colors py-1">
                หน้าแรก
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("bases")}
                className="hover:text-[#F5B800] transition-colors py-1 cursor-pointer"
              >
                คลังความรู้
              </button>
              <Link to="/ev" className="hover:text-[#F5B800] transition-colors py-1">
                ชาร์จไฟฟ้าที่สถานี
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
                onClick={() => scrollToSection("bases")}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white"
              >
                คลังความรู้
              </button>
              <Link to="/ev" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white">
                ชาร์จไฟฟ้าที่สถานี
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
      <main className="grow">

        {/* ==================== HERO SLIDER BANNER SECTION (6 สไลด์พลังงานสะอาด) ==================== */}
        <section className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] overflow-hidden bg-[#061C30]">
          {CLEAN_ENERGY_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* ภาพพื้นหลังสไลด์ */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 transform scale-105"
                style={{ backgroundImage: `url('${encodeURI(slide.image)}')` }}
              >
                {/* Gradient Overlay โทนสีกรมท่า-เขียวมรกตพลังงานสะอาด */}
                <div className="absolute inset-0 bg-[#0A2E4D]/60 bg-gradient-to-t from-[#061C30] via-[#0A2E4D]/50 to-black/40" />
              </div>

              {/* ข้อความกลางสไลด์ */}
              <div className="relative z-20 max-w-5xl mx-auto h-full px-6 sm:px-12 flex flex-col justify-center items-center text-center text-white space-y-4">
                <span className="bg-white/15 backdrop-blur-md text-[#F5B800] text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse"></span>
                  {slide.badge}
                </span>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-md leading-tight max-w-4xl">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-lg text-sky-100/95 max-w-2xl font-light leading-relaxed drop-shadow">
                  {slide.subtitle}
                </p>

                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  {slide.buttonLink.startsWith("/") ? (
                    <Link
                      to={slide.buttonLink as any}
                      className="bg-[#0A2E4D] border border-white/30 hover:bg-[#071F34] text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>{slide.buttonText}</span>
                      <span className="text-[#F5B800] font-bold">›</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const id = slide.buttonLink.replace("#", "");
                        scrollToSection(id);
                      }}
                      className="bg-[#0A2E4D] border border-white/30 hover:bg-[#071F34] text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>{slide.buttonText}</span>
                      <span className="text-[#F5B800] font-bold">›</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* ปุ่มสไลด์ย้อนกลับ (ซ้าย) */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all flex items-center justify-center cursor-pointer border border-white/20"
            aria-label="Previous Slide"
          >
            ‹
          </button>

          {/* ปุ่มสไลด์ถัดไป (ขวา) */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all flex items-center justify-center cursor-pointer border border-white/20"
            aria-label="Next Slide"
          >
            ›
          </button>

          {/* แถบจุดเปลี่ยนสไลด์ 6 แบนเนอร์ (ด้านล่าง) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {CLEAN_ENERGY_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? "w-8 bg-[#F5B800]" : "w-2.5 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
          
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
                className="group relative bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0A2E4D] border border-sky-100 flex items-center justify-center font-bold text-2xl shadow-sm group-hover:bg-[#0A2E4D] group-hover:text-white transition-all duration-300">
                      ⚡
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-sky-50 text-[#0A2E4D] border border-sky-200/80 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      ONLINE APP
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#0A2E4D] uppercase tracking-wider block mb-1">
                      BASE 01 • OFF-GRID SYSTEM
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#0A2E4D] transition-colors flex items-center gap-2">
                      1. ระบบ Off-Grid
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                      ระบบอิสระไม่เชื่อมต่อสายส่งการไฟฟ้า สำรองไฟเข้าแบตเตอรี่ เหมาะสำหรับพื้นที่ห่างไกลและการเกษตร
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0A2E4D] group-hover:text-sky-900 relative z-10">
                  <span className="flex items-center gap-1">
                    เปิดอ่านคู่มือฐาน <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-700 font-mono">off-grid</code>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center group-hover:bg-[#0A2E4D] group-hover:text-white transition-all font-bold">
                    ↗
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setActiveBase('ON_GRID')}
                className="group relative bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#D97706] border border-amber-100 flex items-center justify-center font-bold text-2xl shadow-sm group-hover:bg-[#D97706] group-hover:text-white transition-all duration-300">
                      ☀️
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-amber-50 text-[#D97706] border border-amber-200/80 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      LIVE DATA
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block mb-1">
                      BASE 02 • ON-GRID SYSTEM
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#D97706] transition-colors flex items-center gap-2">
                      2. ระบบ On-Grid
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                      ระบบเชื่อมสายส่งไฟฟ้าหลวง เน้นผลิตไฟใช้ตอนกลางวัน ลดค่าไฟฟ้าได้สูงสุดและคืนทุนไวที่สุด
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#D97706] group-hover:text-amber-900 relative z-10">
                  <span className="flex items-center gap-1">
                    เปิดอ่านคู่มือฐาน <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-700 font-mono">on-grid</code>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center group-hover:bg-[#D97706] group-hover:text-white transition-all font-bold">
                    ↗
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setActiveBase('HYBRID')}
                className="group relative bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center font-bold text-2xl shadow-sm group-hover:bg-[#059669] group-hover:text-white transition-all duration-300">
                      🔋
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200/80 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      HYBRID 24h
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider block mb-1">
                      BASE 03 • HYBRID SYSTEM
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#059669] transition-colors flex items-center gap-2">
                      3. ระบบ Hybrid
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                      ระบบผสมผสานเชื่อมต่อสายส่งร่วมกับแบตเตอรี่ มีไฟสำรองใช้อย่างต่อเนื่องแม้เวลาไฟดับ
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#059669] group-hover:text-emerald-900 relative z-10">
                  <span className="flex items-center gap-1">
                    เปิดอ่านคู่มือฐาน <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-700 font-mono">hybrid</code>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-all font-bold">
                    ↗
                  </span>
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

        </div>

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

      {/* FOOTER */}
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
