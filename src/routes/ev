import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { BatteryCharging, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/ev')({
  component: EVBookingPage,
});

function EVBookingPage() {
  const [station, setStation] = useState('สถานีสบปราบ (18 kWp AC Type 2)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Web App URL จาก Apps Script
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

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center relative">
      
      {/* ปุ่มย้อนกลับไปหน้า Index */}
      <div className="w-full max-w-md mb-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
        </Link>
      </div>

      <div className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-800 max-w-md w-full space-y-6 shadow-2xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-amber-400">
            <BatteryCharging className="w-7 h-7" /> จองคิวชาร์จ EV
          </h2>
          <p className="text-xs text-slate-400 mt-1">กรอกข้อมูลเพื่อสำรองคิวสถานีชาร์จรถยนต์ไฟฟ้า</p>
        </div>

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-xs leading-relaxed">
            <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span>ส่งข้อมูลการจองเรียบร้อย! ระบบบันทึกลง Google Sheet และแจ้งเตือนไปยัง <strong className="underline">apiwat.suw@mahidol.ac.th</strong> แล้วครับ</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">เลือกสถานีชาร์จ</label>
            <select 
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500 transition"
            >
              <option>สถานีสบปราบ (18 kWp AC Type 2)</option>
              <option>สถานีผาลาด (DC Fast Charger)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">วันที่</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">เวลา</label>
              <input 
                type="time" 
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">อีเมลผู้แจ้งจอง (ถ้ามี)</label>
            <input 
              type="email" 
              placeholder="example@mahidol.ac.th"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer text-xs md:text-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'ยืนยันการจองคิว'}
          </button>
        </form>
      </div>
    </div>
  );
}