import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BookOpen, LineChart, BatteryCharging, ClipboardEdit, LayoutDashboard, 
  ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight, Zap, CheckCircle2, ShieldAlert
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

// ข้อมูลเนื้อหาสำหรับ Modal สไลด์คลังความรู้
const KNOWLEDGE_SLIDES = [
  {
    title: "ระบบผลิตไฟฟ้าด้วยพลังงานแสงอาทิตย์ (SOLAR CELLS SYSTEMS)",
    subtitle: "คณะสิ่งแวดล้อมและทรัพยากรศาสตร์ มหาวิทยาลัยมหิดล (งานพันธกิจเพื่อสังคม อ.สบปราบ จ.ลำปาง)",
    content: (
      <div className="space-y-4 text-center py-6">
        <div className="inline-block p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 mb-2">
          <Zap className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-amber-400">คลังความรู้ระบบพลังงานสะอาด</h3>
        <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed">
          องค์ความรู้การใช้งาน การบำรุงรักษา และสรุปผลการใช้ไฟฟ้าจากโซลาร์เซลล์ ของมหาวิทยาลัยมหิดล เพื่อการจัดการพลังงานอย่างยั่งยืน
        </p>
      </div>
    )
  },
  {
    title: "ประเภทของระบบ Solar Systems",
    subtitle: "รูปแบบการติดตั้งและหลักการทำงานพื้นฐาน",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h4 className="font-bold text-amber-400 text-base mb-1">1. Off-Grid System</h4>
          <p className="text-xs text-slate-300">ระบบอิสระ ไม่เชื่อมต่อสายส่งการไฟฟ้า มีแบตเตอรี่กักเก็บพลังงานไว้ใช้</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h4 className="font-bold text-amber-400 text-base mb-1">2. On-Grid System</h4>
          <p className="text-xs text-slate-300">ระบบเชื่อมต่อสายส่งการไฟฟ้า ดึงไฟหลวงมาเสริมทันทีเมื่อผลิตไม่พอ</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h4 className="font-bold text-amber-400 text-base mb-1">3. Hybrid System</h4>
          <p className="text-xs text-slate-300">ระบบผสมผสาน มีทั้งแบตเตอรี่กักเก็บและเชื่อมต่อสายส่งเพื่อเสถียรภาพสูงสุด</p>
        </div>
      </div>
    )
  },
  {
    title: "เปรียบเทียบข้อดี-ข้อเสียของแต่ละระบบ",
    subtitle: "ข้อมูลประกอบการตัดสินใจติดตั้ง",
    content: (
      <div className="space-y-3 text-xs">
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <span className="font-bold text-amber-400">Off-Grid:</span> ไม่มีปัญหาไฟดับจากส่วนกลาง แต่ต้นทุนแบตเตอรี่สูงและเสี่ยงไฟไม่พอช่วงฝนตก
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <span className="font-bold text-amber-400">On-Grid:</span> คืนทุนไวที่สุดเนื่องจากไม่ต้องใช้แบตเตอรี่ แต่หากไฟการไฟฟ้าดับ ระบบจะดับด้วย
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <span className="font-bold text-amber-400">Hybrid:</span> ยืดหยุ่นสูงสุด ใช้ได้แม้ไฟดับ แต่ระบบมีความซับซ้อนและอุปกรณ์ราคาสูง
        </div>
      </div>
    )
  },
  {
    title: "ขั้นตอนการเปิด-ปิด ระบบ (Operations)",
    subtitle: "ข้อปฏิบัติเพื่อความปลอดภัยในการใช้งาน",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-800 p-4 rounded-xl border border-emerald-500/30">
          <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> ขั้นตอนการเปิด (ON)</h4>
          <ol class="list-decimal list-inside space-y-1 text-slate-300">
            <li>เปิด MCCB และ MCB ที่ตู้ SMDB (ตู้ MBD)</li>
            <li>เปิด CB แต่ละตัวที่ตู้ Solar DC Panel</li>
            <li>หมุนเปิดสวิตช์ Inverter แต่ละตัว</li>
          </ol>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-rose-500/30">
          <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-1"><ShieldAlert className="w-4 h-4"/> ขั้นตอนการปิด (OFF)</h4>
          <p className="text-slate-300">ให้ดำเนินการย้อนลำดับขั้นตอนการเปิดอย่างเคร่งครัด:</p>
          <p className="mt-2 font-mono text-amber-400 bg-slate-900 p-2 rounded border border-slate-700 text-center">
            OFF ตู้ Solar DC → OFF Inverter → OFF ตู้ SMDB
          </p>
        </div>
      </div>
    )
  },
  {
    title: "สรุปผลการใช้พลังงานไฟฟ้า (สบปราบ-ผาลาด จ.ลำปาง)",
    subtitle: "ข้อมูลการผลิตไฟฟ้ารวมขนาด 18 kWp",
    content: (
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400">ไฟฟ้าจาก กฟภ.</span>
            <p className="text-xl font-bold text-rose-400">29.8%</p>
            <span className="text-[10px] text-slate-500">(4,040.80 kWh)</span>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
            <span className="text-slate-400">ไฟฟ้าจาก Solar Cell</span>
            <p className="text-xl font-bold text-emerald-400">70.2%</p>
            <span className="text-[10px] text-slate-500">(9,523.47 kWh)</span>
          </div>
        </div>
        <p className="text-slate-300 text-center bg-slate-800/50 p-2 rounded-lg">
          ช่วยลดค่าไฟฟ้าของโครงการลงอย่างต่อเนื่อง พร้อมทั้งลดการปล่อยก๊าซเรือนกระจก ($CO_2$) และลดการใช้ถ่านหิน
        </p>
      </div>
    )
  }
];

function CleanEnergyPortal() {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'stats' | 'ev' | 'survey' | 'dashboard'>('knowledge');
  
  // State สำหรับควบคุม Modal อ่านสไลด์
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const openSlideModal = (index: number = 0) => {
    setCurrentSlideIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 bg-slate-900 min-h-screen text-slate-100 font-sans space-y-6">
      
      {/* Top Bar Navigation */}
      <div className="flex flex-wrap justify-center items-center gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-xl">
        
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
            activeTab === 'knowledge' 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
              : 'bg-white text-slate-800 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          คลังความรู้
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
            activeTab === 'stats' 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
              : 'bg-white text-slate-800 hover:bg-slate-100'
          }`}
        >
          <LineChart className="w-4 h-4 text-blue-600" />
          สถิติการผลิต
        </button>

        <button
          onClick={() => setActiveTab('ev')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
            activeTab === 'ev' 
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
              : 'bg-white text-slate-800 hover:bg-slate-100'
          }`}
        >
          <BatteryCharging className="w-4 h-4 text-amber-600" />
          จองที่ชาร์จ EV
        </button>

        <button
          onClick={() => setActiveTab('survey')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
            activeTab === 'survey' 
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' 
              : 'bg-white text-slate-800 hover:bg-slate-100'
          }`}
        >
          <ClipboardEdit className="w-4 h-4 text-purple-600" />
          ทำแบบประเมินความพึงพอใจ
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
            activeTab === 'dashboard' 
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
              : 'bg-white text-slate-800 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-teal-600" />
          ดูสรุปผล Dashboard
        </button>

      </div>

      {/* Main Dynamic Content Area */}
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
        
        {/* 1. คลังความรู้ */}
        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-emerald-400">
              <BookOpen className="w-6 h-6" /> คลังความรู้ระบบโซลาร์เซลล์พลังงานสะอาด
            </h2>
            
            {/* Grid ของการ์ดที่เปิด Modal สไลด์ได้เมื่อคลิก */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div 
                onClick={() => openSlideModal(1)}
                className="bg-slate-800 p-5 rounded-2xl border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group shadow-lg space-y-2"
              >
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md">พื้นฐาน</span>
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition">หลักการทำงานของ On-Grid System</h3>
                <p className="text-slate-400 text-sm">การเชื่อมต่อแผงโซลาร์เซลล์เข้ากับระบบไฟฟ้าการไฟฟ้า เพื่อลดค่าไฟช่วงกลางวัน</p>
                <p className="text-xs text-emerald-400/80 pt-2 flex items-center gap-1 font-medium">คลิกเพื่ออ่านบทเรียนเพิ่มเติม →</p>
              </div>

              <div 
                onClick={() => openSlideModal(3)}
                className="bg-slate-800 p-5 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group shadow-lg space-y-2"
              >
                <span className="text-xs font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-md">คู่มือ</span>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">ขั้นตอนการเปิด-ปิด และการดูแลรักษา</h3>
                <p className="text-slate-400 text-sm">ข้อควรระวังและการตรวจสอบความปลอดภัยก่อนและหลังการใช้งานระบบโซลาร์</p>
                <p className="text-xs text-blue-400/80 pt-2 flex items-center gap-1 font-medium">คลิกเพื่ออ่านบทเรียนเพิ่มเติม →</p>
              </div>

              <div 
                onClick={() => openSlideModal(4)}
                className="bg-slate-800 p-5 rounded-2xl border border-slate-700 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group shadow-lg space-y-2"
              >
                <span className="text-xs font-bold text-purple-400 bg-purple-950 px-2.5 py-1 rounded-md">สิ่งแวดล้อม</span>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition">สรุปผลการลด Carbon Footprint</h3>
                <p className="text-slate-400 text-sm">เปลี่ยนพลังงานแสงอาทิตย์เป็นหน่วยลดการปล่อยก๊าซเรือนกระจก ($CO_2$ Avoided) โครงการลำปาง</p>
                <p className="text-xs text-purple-400/80 pt-2 flex items-center gap-1 font-medium">คลิกเพื่ออ่านบทเรียนเพิ่มเติม →</p>
              </div>

            </div>
          </div>
        )}

        {/* 2. สถิติการผลิต */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-400">
              <LineChart className="w-6 h-6" /> สถิติการผลิตพลังงานไฟฟ้า (kWh)
            </h2>
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionData}>
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                  <Area type="monotone" dataKey="solar" name="Solar Cell (kWh)" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="grid" name="กฟภ. (kWh)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 3. ระบบจองที่ชาร์จ EV */}
        {activeTab === 'ev' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-amber-400">
              <BatteryCharging className="w-6 h-6" /> ระบบจองคิวชาร์จรถยนต์ไฟฟ้า (EV Charger)
            </h2>
            <form className="space-y-4 bg-slate-800 p-6 rounded-2xl border border-slate-700" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">เลือกสถานีชาร์จ</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
                  <option>สถานีสบปราบ (18 kWp AC Type 2)</option>
                  <option>สถานีผาลาด (DC Fast Charger)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">วันที่ต้องการจอง</label>
                  <input type="date" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">ช่วงเวลา</label>
                  <input type="time" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer">
                ยืนยันการจองคิวชาร์จ EV
              </button>
            </form>
          </div>
        )}

        {/* 4. ทำแบบประเมินความพึงพอใจ */}
        {activeTab === 'survey' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-purple-400">
              <ClipboardEdit className="w-6 h-6" /> แบบประเมินความพึงพอใจการใช้บริการ
            </h2>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <p className="text-sm text-slate-300">ขอเชิญร่วมตอบแบบประเมินความพึงพอใจในการใช้งานระบบพลังงานสะอาดและสถานีชาร์จ EV เพื่อนำไปพัฒนาการบริการต่อไป</p>
              <a 
                href="https://forms.gle" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                เปิดแบบสอบถาม (Google Forms) <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* 5. ดูสรุปผล Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-teal-400">
                <LayoutDashboard className="w-6 h-6" /> ภาพรวมสรุปผล Dashboard (Huawei FusionSolar)
              </h2>
              <a href="https://mahidol-lampang.vercel.app" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> กลับหน้า Map หลัก
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-400 font-semibold uppercase">กำลังการผลิตรวม</p>
                <p className="text-3xl font-black text-emerald-400 mt-1">18.00 <span className="text-sm font-normal text-slate-400">kWp</span></p>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-400 font-semibold uppercase">ผลิตไฟวันนี้ (Yield Today)</p>
                <p className="text-3xl font-black text-blue-400 mt-1">21.04 <span className="text-sm font-normal text-slate-400">kWh</span></p>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-400 font-semibold uppercase">ลดปล่อย $CO_2$ สะสม</p>
                <p className="text-3xl font-black text-purple-400 mt-1">19.05 <span className="text-sm font-normal text-slate-400">Tons</span></p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- MODAL READ SLIDES (ส่วนป๊อปอัปแสดงสไลด์คลังความรู้) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative flex flex-col justify-between min-h-[420px]">
            
            {/* Header Modal */}
            <div>
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                    สไลด์ที่ {currentSlideIndex + 1} / {KNOWLEDGE_SLIDES.length}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">
                    {KNOWLEDGE_SLIDES[currentSlideIndex].title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {KNOWLEDGE_SLIDES[currentSlideIndex].subtitle}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="py-4">
                {KNOWLEDGE_SLIDES[currentSlideIndex].content}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center border-t border-slate-800 pt-4 mt-auto">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> ย้อนกลับ
              </button>

              <div className="flex gap-1.5">
                {KNOWLEDGE_SLIDES.map((_, i) => (
                  <span 
                    key={i} 
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                      i === currentSlideIndex ? 'bg-emerald-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={currentSlideIndex === KNOWLEDGE_SLIDES.length - 1}
                onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                ถัดไป <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}