import { Link } from "react-router-dom";
import { CalendarDays, Leaf, BatteryCharging, MapPin, ArrowLeft } from 'lucide-react';


type CalendarEvent = {
  date: string;
  title: string;
  detail: string;
  kind: 'produce' | 'ev';
};

const events: CalendarEvent[] = [
  { date: '2026-09-02', title: 'ผักสลัดพร้อมเก็บเกี่ยว', detail: 'แปลง A • 30 กก. • รับที่ Smart Farm', kind: 'produce' },
  { date: '2026-09-03', title: 'รอบจอง EV', detail: 'สถานีสบปราบ • 09:00–12:00', kind: 'ev' },
  { date: '2026-09-05', title: 'มะเขือเทศปลอดสาร', detail: 'แปลง B • 20 กก. • เปิดรับพรีออเดอร์', kind: 'produce' },
  { date: '2026-09-07', title: 'รอบจอง EV', detail: 'สถานีผาลาด • 13:00–16:00', kind: 'ev' },
];

const formatDate = (date: string) => new Intl.DateTimeFormat('th-TH', {
  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
}).format(new Date(`${date}T00:00:00`));

function CalendarPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"><ArrowLeft size={16} /> กลับหน้าหลัก</Link>
        <header className="border-b border-slate-700 pb-6">
          <p className="font-mono text-xs tracking-widest text-amber-400">// SHARED_OPERATIONS_CALENDAR</p>
          <h1 className="mt-2 text-3xl font-bold">ปฏิทินผลผลิตและการจอง EV</h1>
          <p className="mt-2 text-slate-300">รวมกำหนดการเก็บเกี่ยวสินค้าและช่วงเวลาการใช้สถานีชาร์จไว้ในมุมมองเดียว</p>
        </header>
        <section aria-label="รายการกำหนดการ" className="grid gap-3">
          {events.length === 0 ? <p className="rounded-xl border border-slate-700 p-8 text-center text-slate-400">ยังไม่มีกำหนดการ</p> : events.map((event) => {
            const isProduce = event.kind === 'produce';
            return <article key={`${event.date}-${event.title}`} className="flex gap-4 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg">
              <div className={`mt-1 rounded-lg p-2 ${isProduce ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-300'}`} aria-hidden="true">
                {isProduce ? <Leaf size={20} /> : <BatteryCharging size={20} />}
              </div>
              <div className="min-w-0 flex-1"><time dateTime={event.date} className="font-mono text-xs text-slate-400">{formatDate(event.date)}</time><h2 className="mt-1 font-semibold">{event.title}</h2><p className="mt-1 text-sm text-slate-300">{event.detail}</p></div>
              <MapPin className="hidden text-slate-500 sm:block" size={18} aria-label="สถานที่" />
            </article>;
          })}
        </section>
        <div className="flex items-center gap-4 text-xs text-slate-400"><CalendarDays size={16} /> ข้อมูลตัวอย่าง — Production ควรโหลดจาก API ที่ตรวจสิทธิ์และตรวจเวลาซ้ำฝั่ง server</div>
      </div>
    </main>
  );
}


