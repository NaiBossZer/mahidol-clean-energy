import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BatteryCharging, 
  Smartphone, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  HelpCircle,
  MapPin,
  Clock,
  Send,
  Loader2
} from 'lucide-react';

export const Route = createFileRoute('/ev/')({
  component: EVGuideAndBookingPage,
});

function EVGuideAndBookingPage() {
  // State สำหรับแบบฟอร์มการจอง
  const [station, setStation] = useState('สถานีสบปราบ (18 kWp AC Type 2)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQsVhjSN6t81B1Isb5FPDQxm2sEU2g0ZzN8VgnULPENDMOqcaJNH5JTqVbK-5L8c1fWw/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ station, date, time, email }),
      });

      setSuccess(true);
      setDate('');
      setTime('');
      setEmail('');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      number: "01",
      title: "ลงทะเบียน / จองคิว",
      desc: "กรอกข้อมูลสำรองเวลาเข้าใช้งานผ่านแบบฟอร์มด้านล่าง หรือจองผ่านระบบล่วงหน้า",
      icon: Calendar,
      color: "from-blue-500 to-cyan-400"
    },
    {
      number: "02",
      title: "เสียบหัวชาร์จเข้ากับรถ",
      desc: "นำหัวชาร์จ (Type 2 หรือ DC) เสียบเข้ากับเต้ารับของยานยนต์ไฟฟ้าให้แน่นสนิท",
      icon: Zap,
      color: "from-amber-500 to-yellow-400"
    },
    {
      number: "03",
      title: "เริ่มการชาร์จ",
      desc: "ตรวจสอบสถานะไฟแสดงผลที่ตู้ชาร์จ ระบบจะเริ่มจ่ายพลังงานไฟฟ้าเข้าสู่ตัวรถทันที",
      icon: Smartphone,
      color: "from-emerald-500 to-green-400"
    },
    {
      number: "04",
      title: "เสร็จสิ้นการใช้งาน",
      desc: "กดหยุดการทำงานเมื่อชาร์จเสร็จ ถอดหัวชาร์จเก็บเข้าที่เดิมให้เรียบร้อย",
      icon: CheckCircle2,
      color: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans pb-16">
      
      {/* Header Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <BatteryCharging className="w-5 h-5" />
            <span>Mahidol EV Charging</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-8 space-y-12">
        
        {/* Banner Section */}
        <div className="text-center space-y-3">
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-medium">
            User Guide & Reservation
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            ขั้นตอนการใช้งานสถานีชาร์จรถยนต์ไฟฟ้า
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            คู่มือการใช้งานเครื่องชาร์จ EV พร้อมระบบจองคิวเข้าใช้งานล่วงหน้า มหาวิทยาลัยมหิดล
          </p>
        </div>

        {/* 4 Steps Grid (สไตล์ PEA VOLTA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-slate-700 transition group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} text-slate-950 font-bold shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-800 group-hover:text-slate-700 transition">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-100 mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section: แบบฟอร์มจองคิว & รายละเอียดสถานี */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* ข้อมูลสถานีบริการ */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" /> สถานีที่เปิดให้บริการ
              </h2>
              <p className="text-xs text-slate-400 mt-1">ตำแหน่งเครื่องชาร์จภายในศูนย์เรียนรู้</p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-amber-400">สถานีสบปราบ</h4>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded">พร้อมใช้งาน</span>
                </div>
                <p className="text-xs text-slate-300">เครื่องชาร์จ AC Type 2 (18 kWp)</p>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                  <Clock className="w-3.5 h-3.5" /> เปิดบริการ 24 ชั่วโมง
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-cyan-400">สถานีผาลาด</h4>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded">พร้อมใช้งาน</span>
                </div>
                <p className="text-xs text-slate-300">เครื่องชาร์จ DC Fast Charger</p>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                  <Clock className="w-3.5 h-3.5" /> เปิดบริการ 24 ชั่วโมง
                </div>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex gap-3 items-start">
              <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400 block mb-1">ข้อแนะนำเพิ่มเติม:</strong>
                หากพบปัญหาในการชาร์จ หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ประจำศูนย์ได้ตลอดเวลาทำการ
              </div>
            </div>
          </div>

          {/* ฟอร์มจองคิว */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-400" /> สำรองคิวชาร์จล่วงหน้า
              </h3>
              <p className="text-xs text-slate-400 mt-1">ระบุรายละเอียดเพื่อยืนยันสิทธิ์การเข้าใช้งาน</p>
            </div>

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl flex items-center gap-3 text-xs leading-relaxed">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                <span>บันทึกข้อมูลการจองสำเร็จ! ระบบได้ทำการส่งอีเมลแจ้งเตือนไปยังเจ้าหน้าที่แล้วครับ</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">เลือกสถานีชาร์จ</label>
                <select 
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500 transition"
                >
                  <option>สถานีสบปราบ (18 kWp AC Type 2)</option>
                  <option>สถานีผาลาด (DC Fast Charger)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">วันที่เข้าใช้บริการ</label>
                  <input 
                    type="date" 
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">เวลาโดยประมาณ</label>
                  <input 
                    type="time" 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">อีเมลผู้จอง (สำหรับรับผลยืนยัน)</label>
                <input 
                  type="email" 
                  placeholder="example@mahidol.ac.th"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer text-xs md:text-sm flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'ยืนยันข้อมูลการจอง'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}