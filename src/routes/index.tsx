import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BookOpen, LineChart, BatteryCharging, ClipboardEdit, LayoutDashboard, 
  Sun, Zap, CheckCircle2, ArrowLeft, ExternalLink, Calendar, Clock
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

function CleanEnergyPortal() {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'stats' | 'ev' | 'survey' | 'dashboard'>('dashboard');

  return (
    <div className="p-4 md:p-8 bg-slate-900 min-h-screen text-slate-100 font-sans space-y-6">
      
      {/* Top Bar Navigation (ตามรูปภาพ) */}
      <div className="flex flex-wrap justify-center items-center gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-xl">
        
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md">พื้นฐาน</span>
                <h3 className="text-lg font-semibold text-white">หลักการทำงานของ On-Grid System</h3>
                <p className="text-slate-400 text-sm">การเชื่อมต่อแผงโซลาร์เซลล์เข้ากับระบบไฟฟ้าการไฟฟ้า เพื่อลดค่าไฟช่วงกลางวัน</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-md">คู่มือ</span>
                <h3 className="text-lg font-semibold text-white">การดูแลรักษาสถานีชาร์จ EV</h3>
                <p className="text-slate-400 text-sm">ข้อควรระวังและการตรวจสอบความปลอดภัยก่อนเสียบชาร์จรถยนต์ไฟฟ้า</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-purple-400 bg-purple-950 px-2.5 py-1 rounded-md">สิ่งแวดล้อม</span>
                <h3 className="text-lg font-semibold text-white">การคำนวณการลด Carbon Footprint</h3>
                <p className="text-slate-400 text-sm">เปลี่ยนพลังงานแสงอาทิตย์เป็นหน่วยลดการปล่อยก๊าซเรือนกระจก (CO₂ Avoided)</p>
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
              <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition shadow-lg shadow-purple-600/30"
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
                <p className="text-xs text-slate-400 font-semibold uppercase">ลดปล่อย CO₂ สะสม</p>
                <p className="text-3xl font-black text-purple-400 mt-1">19.05 <span className="text-sm font-normal text-slate-400">Tons</span></p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}