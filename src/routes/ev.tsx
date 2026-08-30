import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BatteryCharging, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  HelpCircle,
  MapPin,
  Clock,
  Send,
  Loader2,
  GraduationCap,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const Route = createFileRoute('/ev/')({
  component: EVGuideAndBookingPage,
});

function EVGuideAndBookingPage() {
  const [station, setStation] = useState('สถานีสบปราบ (18 kWp AC Type 2)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Public endpoint only for the current prototype. Production must proxy this
  // through an authenticated server endpoint with rate limiting and CSRF checks.
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_BOOKING_ENDPOINT ?? "https://script.google.com/macros/s/AKfycbwQsVhjSN6t81B1Isb5FPDQxm2sEU2g0ZzN8VgnULPENDMOqcaJNH5JTqVbK-5L8c1fWw/exec";
  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      if (!GOOGLE_SCRIPT_URL) throw new Error('Booking endpoint is not configured');
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
      desc: "กรอกข้อมูลสำรองเวลาเข้าใช้งานผ่านแบบฟอร์มด้านล่าง เพื่อยืนยันสิทธิ์ล่วงหน้า",
      icon: Calendar,
      tag: "STEP_01"
    },
    {
      number: "02",
      title: "เสียบหัวชาร์จเข้ากับรถ",
      desc: "นำหัวชาร์จ (Type 2 หรือ DC) เสียบเข้ากับเต้ารับของยานยนต์ไฟฟ้าให้แน่นสนิท",
      icon: Zap,
      tag: "STEP_02"
    },
    {
      number: "03",
      title: "เริ่มการชาร์จ",
      desc: "ตรวจสอบสถานะไฟแสดงผลที่ตู้ชาร์จ ระบบจะเริ่มจ่ายพลังงานไฟฟ้าเข้าสู่ตัวรถทันที",
      icon: Smartphone,
      tag: "STEP_03"
    },
    {
      number: "04",
      title: "เสร็จสิ้นการใช้งาน",
      desc: "กดหยุดการทำงานเมื่อชาร์จเสร็จ ถอดหัวชาร์จเก็บเข้าที่เดิมให้เรียบร้อย",
      icon: CheckCircle2,
      tag: "STEP_04"
    }
  ];

  return (
    <div className="font-sans bg-white min-h-screen text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-900 pb-24 border-t-4 border-blue-900 overflow-x-hidden">
      
      {/* 🔴 CSS Override ปิด Grid Pattern บน Root Elements เด็ดขาด 100% ให้เหมือนหน้า Index */}
      <style>{`
        html, body, #root, div {
          background-image: none !important;
        }
        *::before, *::after {
          background-image: none !important;
        }
      `}</style>

      {/* Header Bar - Sticky Top */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 md:px-8 py-3.5 shadow-sm">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900" />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-blue-900 flex-shrink-0 flex items-center justify-center shadow-sm relative overflow-hidden">
              <GraduationCap className="w-4 h-4 text-white relative z-10" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-bold text-xs sm:text-sm text-blue-950 tracking-tight leading-none truncate">
                MAHIDOL <span className="text-amber-500 font-mono text-[10px] sm:text-xs">[EV_CHARGING]</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 truncate">Sopprab-Phalat</span>
            </div>
          </div>
          
          <Link 
            to="/" 
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-blue-900 font-mono text-xs rounded font-semibold border border-slate-300 transition flex items-center gap-1 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-900" /> MAIN_PORTAL
          </Link>
          <Link to="/calendar" className="px-3 py-1.5 bg-amber-400 text-blue-950 font-mono text-xs rounded font-semibold transition hover:bg-amber-300">ปฏิทินรวม</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-10 relative z-10">
        
        {/* Banner Title Section */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 font-mono text-[11px] text-blue-900 font-bold shadow-xs">
            <BatteryCharging className="w-3.5 h-3.5 text-amber-500" />
            SYSTEM_MODULE: EV_RESERVATION_STATION
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            ขั้นตอนการใช้งานและจองคิวสถานีชาร์จ EV
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-mono">
            คู่มือการใช้งานเครื่องชาร์จยานยนต์ไฟฟ้า พร้อมระบบสำรองคิวล่วงหน้า มหาวิทยาลัยมหิดล
          </p>
        </div>

        {/* 4 Steps Grid (ปรับสไตล์ตาม Metric Card หน้า Index) */}
        <section className="space-y-3">
          <div className="font-mono text-xs text-blue-900 font-bold tracking-widest">// USER_OPERATIONAL_STEPS</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-5 rounded-lg border-2 border-slate-200 hover:border-blue-900 transition shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4 group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-900" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="flex items-center gap-1.5 text-blue-900 font-bold">
                        <Icon className="w-4 h-4 text-amber-500" /> {step.tag}
                      </span>
                      <span className="text-3xl font-black font-mono text-slate-200 group-hover:text-blue-900 transition">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{step.desc}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                    <span>READY_FOR_USE</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form and Station Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Station Information */}
          <div className="lg:col-span-5 space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <span className="font-mono text-xs text-blue-900 font-bold tracking-widest">// LOCATIONS</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-900" /> สถานีที่เปิดให้บริการ
              </h2>
            </div>

            <div className="space-y-3">
              <div className="bg-white border-2 border-slate-200 p-4 rounded-lg space-y-2 relative overflow-hidden shadow-sm hover:border-blue-900 transition">
                <div className="absolute top-0 right-0 w-2 h-full bg-blue-900" />
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 font-mono">สถานีสบปราบ</h4>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans">เครื่องชาร์จ AC Type 2 (กำลังผลิต 18 kWp)</p>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 pt-1 border-t border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> SERVICE: 24/7 HOURS
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200 p-4 rounded-lg space-y-2 relative overflow-hidden shadow-sm hover:border-blue-900 transition">
                <div className="absolute top-0 right-0 w-2 h-full bg-blue-900" />
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 font-mono">สถานีผาลาด</h4>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans">เครื่องชาร์จ DC Fast Charger (ชาร์จเร็วความเร็วสูง)</p>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 pt-1 border-t border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> SERVICE: 24/7 HOURS
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 flex gap-3 items-start shadow-xs">
              <HelpCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed font-sans">
                <strong className="text-blue-950 font-mono block mb-1">// NOTICE_RECOMMENDATION:</strong>
                หากพบปัญหาการใช้งานหัวชาร์จ หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเจ้าหน้าที่ประจำศูนย์วิจัยฯ ได้ตลอดเวลาทำการ
              </div>
            </div>
          </div>

          {/* Booking Form (กล่องสี Slate-50 ดีไซน์เข้าคู่กัน) */}
          <div className="lg:col-span-7 bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-blue-900 font-bold tracking-widest">// BOOKING_CONSOLE</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-900" /> สำรองคิวชาร์จล่วงหน้า
                </h3>
              </div>
              <Terminal className="w-5 h-5 text-slate-400" />
            </div>

            {success && (
              <div role="status" aria-live="polite" className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-lg flex items-center gap-3 text-xs font-mono leading-relaxed shadow-xs">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span>SUCCESS: บันทึกข้อมูลการจองเรียบร้อยแล้ว ระบบได้ส่งข้อมูลแจ้งเตือนไปยังเจ้าหน้าที่แล้วครับ</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                  SELECT_STATION (เลือกสถานีชาร์จ)
                </label>
                <select 
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-900 transition font-sans shadow-xs"
                >
                  <option>สถานีสบปราบ (18 kWp AC Type 2)</option>
                  <option>สถานีผาลาด (DC Fast Charger)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                    DATE (วันที่เข้าใช้บริการ)
                  </label>
                  <input 
                    type="date" 
                    required
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900 transition font-mono shadow-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                    TIME (เวลาโดยประมาณ)
                  </label>
                  <input 
                    type="time" 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-900 transition font-mono shadow-xs" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                  USER_EMAIL (อีเมลสำหรับยืนยัน)
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="example@mahidol.ac.th"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-900 transition font-mono shadow-xs" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 active:scale-98 disabled:opacity-50 text-amber-400 font-mono font-bold text-xs sm:text-sm rounded-lg transition shadow-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> PROCESSING...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-amber-400 text-amber-400" /> CONFIRM_RESERVATION
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </main>

    </div>
  );
}

export default EVGuideAndBookingPage;
