import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/slides')({
  component: SlidesPage,
})

function SlidesPage() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen p-6 flex flex-col items-center space-y-12 font-sans">
      {/* SLIDE 1: Title */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl text-center space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 1</span>
        <h1 class="text-3xl font-bold text-amber-400">ระบบผลิตไฟฟ้าด้วยพลังงานแสงอาทิตย์<br />(SOLAR CELLS SYSTEMS)</h1>
        <p class="text-slate-400 text-sm">คณะสิ่งแวดล้อมและทรัพยากรศาสตร์ มหาวิทยาลัยมหิดล<br />(งานพันธกิจเพื่อสังคม อ.สบปราบ จ.ลำปาง)</p>
      </section>

      {/* SLIDE 2: Contents */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 2</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">หัวข้อการนำเสนอ</h2>
        <ol class="list-decimal list-inside space-y-2 text-slate-300">
          <li>ข้อมูลพื้นฐานระบบผลิตไฟฟ้าจากเซลล์แสงอาทิตย์ (Solar Systems)</li>
          <li>การติดตั้งระบบผลิตไฟฟ้าฯ ภายในโครงการ (Off-Grid / On-Grid / Hybrid)</li>
          <li>การใช้งานและการติดตามผล (Monitoring)</li>
          <li>การบำรุงรักษาระบบ (Maintenance)</li>
          <li>สรุปผลการใช้ไฟฟ้าและโซลาร์เซลล์ งานพันธกิจเพื่อสังคม (ลำปาง)</li>
        </ol>
      </section>

      {/* SLIDE 3: Types */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 3</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">ประเภทของระบบ Solar Systems</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
            <h3 class="font-bold text-amber-400">1. Off-Grid System</h3>
            <p class="text-sm text-slate-300 mt-1">ระบบอิสระ ไม่เชื่อมต่อการไฟฟ้า</p>
          </div>
          <div class="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
            <h3 class="font-bold text-amber-400">2. On-Grid System</h3>
            <p class="text-sm text-slate-300 mt-1">ระบบเชื่อมต่อสายส่งการไฟฟ้า</p>
          </div>
          <div class="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
            <h3 class="font-bold text-amber-400">3. Hybrid System</h3>
            <p class="text-sm text-slate-300 mt-1">ระบบผสมผสาน มีแบตเตอรี่และเชื่อมต่อสายส่ง</p>
          </div>
        </div>
      </section>

      {/* SLIDE 4: Off-Grid */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 4</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">ระบบผลิตไฟฟ้าแบบ OFF-GRID SYSTEM</h2>
        <p class="text-xs text-amber-400/80 font-mono">FLOW: PV Module → Battery / Inverter → Breaker → Home / Green House</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-emerald-950/30 border border-emerald-800/50 p-4 rounded-xl">
            <h3 class="font-bold text-emerald-400 mb-2">ข้อดี</h3>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              <li>ไม่มีปัญหาไฟตก/ไฟดับ (ผลิตไฟฟ้าได้อย่างอิสระ)</li>
              <li>ไม่ต้องจ่ายค่าไฟฟ้าให้การไฟฟ้า</li>
            </ul>
          </div>
          <div class="bg-rose-950/30 border border-rose-800/50 p-4 rounded-xl">
            <h3 class="font-bold text-rose-400 mb-2">ข้อเสีย</h3>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              <li>อาจไม่คุ้มทุนเนื่องจากแบตเตอรี่มีราคาสูง</li>
              <li>มักมีปัญหาช่วงหน้าฝน หากแสงแดดไม่เพียงพอ</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SLIDE 5: On-Grid */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 5</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">ระบบผลิตไฟฟ้าแบบ ON-GRID SYSTEM</h2>
        <p class="text-xs text-amber-400/80 font-mono">FLOW: Solar Cell + Grid Meter → Inverter → Breaker → Home</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-emerald-950/30 border border-emerald-800/50 p-4 rounded-xl">
            <h3 class="font-bold text-emerald-400 mb-2">ข้อดี</h3>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              <li>ดึงไฟจากการไฟฟ้ามาช่วยทันทีเมื่อโซลาร์เซลล์ผลิตไม่พอ</li>
              <li>ไม่ต้องใช้แบตเตอรี่ ทำให้คืนทุนได้เร็ว</li>
            </ul>
          </div>
          <div class="bg-rose-950/30 border border-rose-800/50 p-4 rounded-xl">
            <h3 class="font-bold text-rose-400 mb-2">ข้อเสีย</h3>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              <li>หากไฟจากการไฟฟ้าดับ ระบบโซลาร์เซลล์จะดับด้วย</li>
              <li>ผลิตพลังงานได้เฉพาะช่วงเวลากลางวันที่มีแสงแดด</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SLIDE 6: Hybrid */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 6</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">ระบบผลิตไฟฟ้าแบบ HYBRID SYSTEM</h2>
        <p class="text-xs text-amber-400/80 font-mono">FLOW: Solar Cell + Battery + Grid Meter → Inverter → Breaker → Home</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-emerald-950/30 border border-emerald-800/50 p-4 rounded-xl">
            <h3 class="font-bold text-emerald-400 mb-2">ข้อดี</h3>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              <li>ใช้งานได้ตลอดเวลา (ไฟดับดึงจากแบตฯ / ผลิตไม่พอดึงจาก กฟภ.)</li>
              <li>ปรับแต่งการจ่ายไฟให้เหมาะกับพฤติกรรมการใช้ไฟฟ้าได้</li>
            </ul>
          </div>
          <div class="bg-rose-950/30 border border-rose-800/50 p-4 rounded-xl">
            <h3 class="font-bold text-rose-400 mb-2">ข้อเสีย</h3>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              <li>แบตเตอรี่และอุปกรณ์ราคาสูง</li>
              <li>อุปกรณ์ซับซ้อน และต้องใช้อินเวอร์เตอร์ที่ผ่านเกณฑ์ กฟภ.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SLIDE 7: Operations */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 7</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">ขั้นตอนการเปิด-ปิด ระบบ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-slate-700/40 p-4 rounded-xl border border-slate-600">
            <h3 class="font-bold text-amber-400 mb-2">ขั้นตอนการเปิด (ON System)</h3>
            <ol class="list-decimal list-inside space-y-1 text-slate-300">
              <li><strong>ON ตู้ SMDB:</strong> เปิด MCCB และ MCB (ตู้ MBD)</li>
              <li><strong>ON ตู้ Solar DC Panel:</strong> เปิด CB แต่ละตัว</li>
              <li><strong>ON สวิตช์ Inverter:</strong> หมุนเปิดสวิตช์ Inverter แต่ละตัว</li>
            </ol>
          </div>
          <div class="bg-slate-700/40 p-4 rounded-xl border border-slate-600">
            <h3 class="font-bold text-slate-400 mb-2">ขั้นตอนการปิด (OFF System)</h3>
            <p class="text-slate-300 leading-relaxed">ให้ดำเนินการย้อนลำดับขั้นตอนการเปิด:<br /><span class="text-amber-400 font-mono text-xs">OFF ตู้ Solar DC → OFF Inverter → OFF ตู้ SMDB</span></p>
          </div>
        </div>
      </section>

      {/* SLIDE 8: Monitoring */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 8</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">การติดตามผลการทำงาน (Monitoring)</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-slate-700/40 p-4 rounded-xl border border-slate-600">
            <h3 class="font-bold text-amber-400 mb-1">Mobile Application</h3>
            <p class="text-slate-300">ตรวจสอบข้อมูล Real-time, สถานะการทำงานของ Inverter/Battery และปริมาณไฟฟ้าที่ผลิตได้</p>
          </div>
          <div class="bg-slate-700/40 p-4 rounded-xl border border-slate-600">
            <h3 class="font-bold text-amber-400 mb-1">Web Management Platform</h3>
            <p class="text-slate-300">วิเคราะห์ข้อมูลเชิงลึก รายวัน รายเดือน รายปี และรายงานผลการลดการปล่อยก๊าซคาร์บอน</p>
          </div>
        </div>
      </section>

      {/* SLIDE 9: Summary */}
      <section class="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl space-y-4">
        <span class="bg-amber-500/10 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-amber-500/20">Slide 9</span>
        <h2 class="text-xl font-bold text-slate-200 border-b border-slate-700 pb-2">สรุปผลการใช้พลังงานไฟฟ้า (สบปราบ-ผาลาด จ.ลำปาง)</h2>
        <div class="text-sm text-slate-300 space-y-2">
          <p><strong>ขนาดการติดตั้ง:</strong> 12.6 kWp (รวมของเดิมเป็น 18 kWp)</p>
          <div class="grid grid-cols-2 gap-4 my-3 text-center">
            <div class="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <span class="block text-xs text-slate-400">ไฟฟ้าจาก กฟภ.</span>
              <span class="text-xl font-bold text-rose-400">29.8%</span>
              <span class="block text-xs text-slate-400">(4,040.80 หน่วย)</span>
            </div>
            <div class="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <span class="block text-xs text-slate-400">ไฟฟ้าจาก Solar Cell</span>
              <span class="text-xl font-bold text-emerald-400">70.2%</span>
              <span class="block text-xs text-slate-400">(9,523.47 หน่วย)</span>
            </div>
          </div>
          <ul class="list-disc list-inside space-y-1 text-slate-300">
            <li>ลดค่าไฟฟ้าของโครงการลงอย่างต่อเนื่องตั้งแต่ปี 2566 ถึง 2569</li>
            <li>ช่วยลดการปล่อยก๊าซเรือนกระจก (CO₂) และลดการใช้ถ่านหินในการผลิตไฟฟ้า</li>
          </ul>
        </div>
      </section>
    </div>
  )
}