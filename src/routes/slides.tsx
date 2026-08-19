import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Sun, BatteryCharging, Zap, Home, Info, X, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

export const Route = createFileRoute('/slides')({
  component: KnowledgeSlidesPage,
});

function KnowledgeSlidesPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);

  const totalSlides = 5;

  return (
    <div className="bg-slate-950/90 fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl p-4 md:p-8 shadow-2xl relative space-y-4 max-h-[92vh] flex flex-col justify-between">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
          <div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
              สไลด์ที่ {currentSlide} / {totalSlides}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-1">
              {currentSlide === 1 && 'ความรู้เบื้องต้นเกี่ยวกับระบบโซลาร์เซลล์'}
              {currentSlide === 2 && 'ประเภทและแผนผังพลังงาน Solar Systems (3 รูปแบบ)'}
              {currentSlide === 3 && 'ขั้นตอนการเปิด-ปิด และการดูแลรักษา'}
              {currentSlide === 4 && 'สรุปผลการลด Carbon Footprint'}
              {currentSlide === 5 && 'ข้อควรระวังและความปลอดภัยในการใช้งาน'}
            </h2>
          </div>
          <button 
            onClick={() => navigate({ to: '/' })}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto pr-1 my-2 space-y-6 flex-1">
          
          {/* SLIDE 2: FLOW DIAGRAM ต่อลงมาจากแต่ละข้อ */}
          {currentSlide === 2 ? (
            <div className="space-y-8 py-2">
              
              {/* ----------------- ข้อที่ 1: OFF-GRID ----------------- */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-amber-400">1. Off-Grid System (ระบบอิสระ)</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    ระบบที่ไม่เชื่อมต่อกับสายส่งการไฟฟ้า ผลิตไฟฟ้าจากโซลาร์เซลล์เก็บลงแบตเตอรี่ และจ่ายพลังงานให้โหลดโดยตรง เหมาะสำหรับพื้นที่ห่างไกล
                  </p>
                </div>

                {/* Flow Diagram: Off-Grid */}
                <div className="relative w-full max-w-sm mx-auto h-[160px] flex items-center justify-center pt-2">
                  <div className="absolute top-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-amber-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-amber-500/10">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-white">2.5 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">PV</span>
                  </div>

                  <div className="absolute left-4 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-emerald-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-emerald-500/10">
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                      <span className="text-[9px] font-bold text-white">1.2 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Battery</span>
                  </div>

                  <div className="absolute right-4 flex flex-col items-center opacity-25">
                    <div className="w-12 h-12 rounded-full border border-purple-400 bg-slate-900 flex flex-col items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-[9px] font-bold text-white">0 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Grid (ไม่ได้เชื่อมต่อ)</span>
                  </div>

                  <div className="absolute bottom-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-sky-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-sky-500/10">
                      <Home className="w-4 h-4 text-sky-400" />
                      <span className="text-[9px] font-bold text-white">3.7 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Load</span>
                  </div>
                </div>
              </div>

              {/* ----------------- ข้อที่ 2: ON-GRID ----------------- */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-amber-400">2. On-Grid System (ระบบเชื่อมต่อสายส่ง)</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    ระบบที่เชื่อมต่อกับสายส่งการไฟฟ้าโดยตรง ผลิตไฟฟ้าใช้งานร่วมกับไฟหลวง ไม่มีแบตเตอรี่ หากผลิตไม่พอจะดึงไฟการไฟฟ้ามาเสริมอัตโนมัติ
                  </p>
                </div>

                {/* Flow Diagram: On-Grid */}
                <div className="relative w-full max-w-sm mx-auto h-[160px] flex items-center justify-center pt-2">
                  <div className="absolute top-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-amber-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-amber-500/10">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-white">3.2 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">PV</span>
                  </div>

                  <div className="absolute left-4 flex flex-col items-center opacity-25">
                    <div className="w-12 h-12 rounded-full border border-emerald-400 bg-slate-900 flex flex-col items-center justify-center">
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                      <span className="text-[9px] font-bold text-white">0 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Battery (ไม่มีแบต)</span>
                  </div>

                  <div className="absolute right-4 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-purple-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-purple-500/10">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-[9px] font-bold text-white">0.5 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Grid</span>
                  </div>

                  <div className="absolute bottom-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-sky-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-sky-500/10">
                      <Home className="w-4 h-4 text-sky-400" />
                      <span className="text-[9px] font-bold text-white">3.7 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Load</span>
                  </div>
                </div>
              </div>

              {/* ----------------- ข้อที่ 3: HYBRID ----------------- */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-amber-400">3. Hybrid System (ระบบผสมผสาน)</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    รวมข้อดีของทั้ง On-Grid และ Off-Grid เข้าด้วยกัน มีทั้งระบบแบตเตอรี่สำรองไฟและต่อเข้ากับสายส่ง ป้องกันปัญหาไฟตกไฟดับได้ 100%
                  </p>
                </div>

                {/* Flow Diagram: Hybrid */}
                <div className="relative w-full max-w-sm mx-auto h-[160px] flex items-center justify-center pt-2">
                  <div className="absolute top-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-amber-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-amber-500/10">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-white">2.8 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">PV</span>
                  </div>

                  <div className="absolute left-4 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-emerald-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-emerald-500/10">
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                      <span className="text-[9px] font-bold text-white">0.6 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Battery</span>
                  </div>

                  <div className="absolute right-4 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-purple-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-purple-500/10">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-[9px] font-bold text-white">0.3 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Grid</span>
                  </div>

                  <div className="absolute bottom-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-sky-400 bg-slate-900 flex flex-col items-center justify-center shadow-md shadow-sky-500/10">
                      <Home className="w-4 h-4 text-sky-400" />
                      <span className="text-[9px] font-bold text-white">3.7 kW</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">Load</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* เนื้อหาสไลด์อื่นๆ */
            <div className="text-slate-300 text-sm leading-relaxed p-4 bg-slate-950/40 rounded-2xl border border-slate-800/50">
              {currentSlide === 1 && (
                <p>โซลาร์เซลล์ (Solar Cell) เป็นอุปกรณ์อิเล็กทรอนิกส์ที่ทำจากสาร半导体 เปลี่ยนพลังงานแสงอาทิตย์ให้เป็นพลังงานไฟฟ้ากระแสตรง (DC) โดยมีอินเวอร์เตอร์ (Inverter) ทำหน้าที่แปลงเป็นไฟฟ้ากระแสสลับ (AC) เพื่อใช้งานกับอุปกรณ์ไฟฟ้าในอาคาร</p>
              )}
              {currentSlide === 3 && (
                <p>การเปิดระบบ: เปิด AC Breaker $\rightarrow$ เปิด DC Breaker $\rightarrow$ ตรวจสอบไฟสถานะหน้าตู้ Inverter<br/>การปิดระบบ: ปิด DC Breaker $\rightarrow$ ปิด AC Breaker เพื่อความปลอดภัยในการบำรุงรักษา</p>
              )}
              {currentSlide === 4 && (
                <p>การผลิตไฟฟ้าจากพลังงานสะอาดช่วยลดการพึ่งพาโรงไฟฟ้าถ่านหินและก๊าซธรรมชาติ โดยทุกๆ 1 kWh ที่ผลิตได้ จะช่วยลดก๊าซคาร์บอนไดออกไซด์ ($CO_2$) ประมาณ 0.5 - 0.6 kg-CO2e</p>
              )}
              {currentSlide === 5 && (
                <p>1. ห้ามฉีดน้ำล้างแผงช่วงแดดจัด<br/>2. ตรวจสอบการขันแน่นของสายไฟเป็นประจำ<br/>3. ตรวจเช็กระบบสายดิน (Grounding) ป้องกันไฟรั่ว</p>
              )}
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3 flex-shrink-0">
          <button
            disabled={currentSlide === 1}
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white rounded-xl transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> ย้อนกลับ
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div 
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentSlide === totalSlides}
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides))}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-xs font-bold text-slate-950 rounded-xl transition flex items-center gap-1"
          >
            ถัดไป <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}