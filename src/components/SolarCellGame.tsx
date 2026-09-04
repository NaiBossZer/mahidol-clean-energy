import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Zap, Battery, Home, Plug, AlertTriangle, CheckCircle2,
  Sunrise, Sunset, Moon, CloudSun, Wallet, TrendingUp, Info,
  Fan, Tv, Refrigerator, Lightbulb, Car, Power, ShieldAlert
} from "lucide-react";

// ============================================================
// Types
// ============================================================
type CalcMode = "bill" | "appliances";
type UsagePattern = "day" | "night" | "mixed";
type SystemType = "ONGRID" | "OFFGRID" | "HYBRID";
type TimeOfDay = "morning" | "noon" | "evening" | "night";

interface ApplianceItem {
  id: string;
  name: string;
  icon: React.ElementType;
  watt: number;
  qty: number;
  hours: number;
}

interface SizingResult {
  kwp: number;
  panelCount: number;
  inverterKw: number;
  batteryKwh: number;
  budget: number;
  monthlySaving: number;
  paybackYears: number;
}

// ============================================================
// Constants
// ============================================================
const PANEL_WATT = 500;
const PRICE_PER_KWP = 35000;
const PRICE_PER_KWH_BATTERY = 18000;
const ELECTRICITY_UNIT_PRICE = 4.5;

const DEFAULT_APPLIANCES: ApplianceItem[] = [
  { id: "ac", name: "เครื่องปรับอากาศ", icon: Fan, watt: 1200, qty: 1, hours: 6 },
  { id: "fridge", name: "ตู้เย็น", icon: Refrigerator, watt: 150, qty: 1, hours: 24 },
  { id: "tv", name: "โทรทัศน์", icon: Tv, watt: 100, qty: 1, hours: 4 },
  { id: "light", name: "หลอดไฟ", icon: Lightbulb, watt: 12, qty: 8, hours: 6 },
  { id: "ev", name: "ชาร์จรถ EV", icon: Car, watt: 3300, qty: 0, hours: 4 },
];

const TIME_CONFIGS: { key: TimeOfDay; label: string; icon: React.ElementType; solarOutput: number }[] = [
  { key: "morning", label: "เช้า", icon: Sunrise, solarOutput: 0.4 },
  { key: "noon", label: "เที่ยง (แดดจัด)", icon: CloudSun, solarOutput: 1.0 },
  { key: "evening", label: "เย็น", icon: Sunset, solarOutput: 0.2 },
  { key: "night", label: "กลางคืน", icon: Moon, solarOutput: 0 },
];
const DEFAULT_TIME_CONFIG = TIME_CONFIGS.find((t) => t.key === "noon")!;

const SYSTEM_INFO: Record<SystemType, {
  title: string; desc: string; pros: string[]; cons: string[]; color: string;
}> = {
  ONGRID: {
    title: "ON-GRID (ออนกริด)",
    desc: "เชื่อมต่อกับการไฟฟ้า 100% ไม่มีแบตเตอรี่ ใช้ไฟกลางวันจากแดดโดยตรง",
    pros: ["ต้นทุนติดตั้งต่ำที่สุด", "คืนทุนเร็ว", "ดูแลรักษาง่าย"],
    cons: ["ไฟดับจากการไฟฟ้า ระบบจะดับตาม (Anti-Islanding)", "ไม่มีไฟสำรองกลางคืน"],
    color: "#0EA5E9",
  },
  OFFGRID: {
    title: "OFF-GRID (ออฟกริด)",
    desc: "ไม่พึ่งพาการไฟฟ้าเลย ต้องมีแบตเตอรี่ขนาดใหญ่เก็บพลังงานทั้งหมด",
    pros: ["ใช้ได้ในพื้นที่ห่างไกล ไม่มีสายไฟฟ้าเข้าถึง", "อิสระจากการไฟฟ้า 100%"],
    cons: ["ต้นทุนแบตเตอรี่สูงมาก", "ต้องออกแบบระบบละเอียด", "คืนทุนช้า"],
    color: "#16A34A",
  },
  HYBRID: {
    title: "HYBRID (ไฮบริด)",
    desc: "ผสมผสานทั้งสองระบบ เชื่อมการไฟฟ้า + มีแบตเตอรี่สำรอง",
    pros: ["ประหยัดค่าไฟกลางวัน", "ไฟดับก็ยังมีไฟสำรองใช้ในบ้าน", "ยืดหยุ่นที่สุด"],
    cons: ["ต้นทุนสูงกว่าออนกริด", "ต้องบำรุงรักษาแบตเตอรี่"],
    color: "#F2A900",
  },
};

// ============================================================
// Calculation Helpers
// ============================================================
function calcFromBill(bill: number, pattern: UsagePattern, systemType: SystemType): SizingResult {
  const monthlyUnits = bill / ELECTRICITY_UNIT_PRICE;
  const dailyUnits = monthlyUnits / 30;
  const dayFactor = pattern === "day" ? 0.75 : pattern === "night" ? 0.35 : 0.55;
  const targetDailyOffset = dailyUnits * dayFactor;
  const kwp = Math.max(1, Math.round((targetDailyOffset / 4) * 10) / 10);
  const panelCount = Math.ceil((kwp * 1000) / PANEL_WATT);
  const inverterKw = Math.max(1.5, Math.round(kwp * 0.9 * 10) / 10);
  const batteryKwh =
    systemType === "ONGRID" ? 0 :
    systemType === "OFFGRID" ? Math.round(dailyUnits * 1.3 * 10) / 10 :
    Math.round(dailyUnits * 0.5 * 10) / 10;
  const budget = Math.round(kwp * PRICE_PER_KWP + batteryKwh * PRICE_PER_KWH_BATTERY);
  const monthlySaving = Math.round(targetDailyOffset * 30 * ELECTRICITY_UNIT_PRICE);
  const paybackYears = monthlySaving > 0 ? Math.round((budget / (monthlySaving * 12)) * 10) / 10 : 0;
  return { kwp, panelCount, inverterKw, batteryKwh, budget, monthlySaving, paybackYears };
}

function calcFromAppliances(items: ApplianceItem[], systemType: SystemType): SizingResult {
  const dailyWh = items.reduce((sum, it) => sum + it.watt * it.qty * it.hours, 0);
  const dailyUnits = dailyWh / 1000;
  const kwp = Math.max(1, Math.round((dailyUnits / 4) * 10) / 10);
  const panelCount = Math.ceil((kwp * 1000) / PANEL_WATT);
  const peakWatt = items.reduce((sum, it) => sum + it.watt * it.qty, 0);
  const inverterKw = Math.max(1.5, Math.round((peakWatt / 1000) * 1.2 * 10) / 10);
  const batteryKwh =
    systemType === "ONGRID" ? 0 :
    systemType === "OFFGRID" ? Math.round(dailyUnits * 1.3 * 10) / 10 :
    Math.round(dailyUnits * 0.5 * 10) / 10;
  const budget = Math.round(kwp * PRICE_PER_KWP + batteryKwh * PRICE_PER_KWH_BATTERY);
  const monthlySaving = Math.round(dailyUnits * 0.7 * 30 * ELECTRICITY_UNIT_PRICE);
  const paybackYears = monthlySaving > 0 ? Math.round((budget / (monthlySaving * 12)) * 10) / 10 : 0;
  return { kwp, panelCount, inverterKw, batteryKwh, budget, monthlySaving, paybackYears };
}

// ============================================================
// Flow Diagram Component
// ============================================================
const FlowLine: React.FC<{ active: boolean; color: string; d: string; reverse?: boolean }> = ({ active, color, d, reverse }) => (
  <g>
    <path d={d} fill="none" stroke="#CBD5E1" strokeWidth={3} strokeLinecap="round" />
    {active && (
      <circle r={5} fill={color}>
        <animateMotion dur={reverse ? "1.6s" : "1.8s"} repeatCount="indefinite" path={d} keyPoints={reverse ? "1;0" : "0;1"} keyTimes="0;1" />
      </circle>
    )}
  </g>
);

const FlowDiagram: React.FC<{ systemType: SystemType; hasSun: boolean; outage: boolean; usingBattery: boolean }> = ({
  systemType, hasSun, outage, usingBattery,
}) => {
  const showGrid = systemType === "ONGRID" || systemType === "HYBRID";
  const showBattery = systemType === "OFFGRID" || systemType === "HYBRID";
  const gridDown = outage && showGrid;
  const homeIsDark = systemType === "ONGRID" && outage;
  const color = SYSTEM_INFO[systemType].color;

  return (
    <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 p-4 overflow-x-auto">
      <svg viewBox="0 0 800 300" className="w-full min-w-[700px] h-72">
        <FlowLine active={hasSun} color="#F2A900" d="M 100 60 L 220 100" />
        <FlowLine active={hasSun} color="#0EA5E9" d="M 260 100 L 380 100" />
        {showGrid && <FlowLine active={!gridDown} color="#002D62" d="M 700 60 L 500 100" />}
        {showBattery && (
          <FlowLine
            active={hasSun || usingBattery}
            color="#16A34A"
            d="M 420 140 L 420 220"
            reverse={usingBattery && !hasSun}
          />
        )}
        <FlowLine active={!homeIsDark} color={color} d="M 460 100 L 620 200" />

        <foreignObject x="40" y="10" width="120" height="90">
          <div className="flex flex-col items-center justify-center h-full">
            <Sun className={`w-10 h-10 ${hasSun ? "text-amber-500" : "text-slate-300"}`} />
            <span className="text-xs mt-1 text-slate-600">ดวงอาทิตย์</span>
          </div>
        </foreignObject>

        <foreignObject x="200" y="60" width="120" height="90">
          <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl border border-slate-200 shadow-sm">
            <Zap className="w-8 h-8 text-sky-500" />
            <span className="text-xs mt-1 text-slate-600">แผงโซลาร์</span>
          </div>
        </foreignObject>

        <foreignObject x="380" y="60" width="120" height="90">
          <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl border border-slate-200 shadow-sm">
            <Plug className="w-8 h-8" style={{ color }} />
            <span className="text-xs mt-1 text-slate-600 text-center">อินเวอร์เตอร์<br />DC → AC</span>
          </div>
        </foreignObject>

        {showBattery && (
          <foreignObject x="360" y="200" width="120" height="90">
            <div className={`flex flex-col items-center justify-center h-full bg-white rounded-xl border shadow-sm ${usingBattery ? "border-green-400 ring-2 ring-green-300" : "border-slate-200"}`}>
              <Battery className={`w-8 h-8 ${usingBattery ? "text-green-600" : "text-slate-400"}`} />
              <span className="text-xs mt-1 text-slate-600">แบตเตอรี่ BESS</span>
            </div>
          </foreignObject>
        )}

        {showGrid && (
          <foreignObject x="640" y="10" width="140" height="90">
            <div className={`flex flex-col items-center justify-center h-full bg-white rounded-xl border shadow-sm ${gridDown ? "border-red-400 ring-2 ring-red-300" : "border-slate-200"}`}>
              {gridDown ? <ShieldAlert className="w-8 h-8 text-red-500" /> : <Power className="w-8 h-8 text-blue-900" />}
              <span className="text-xs mt-1 text-slate-600 text-center">สายส่งการไฟฟ้า{gridDown ? "\n(ตัดขาด)" : ""}</span>
            </div>
          </foreignObject>
        )}

        <foreignObject x="580" y="170" width="140" height="100">
          <div className={`flex flex-col items-center justify-center h-full rounded-xl border shadow-sm transition-colors ${homeIsDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
            <Home className={`w-9 h-9 ${homeIsDark ? "text-slate-500" : "text-amber-500"}`} />
            <span className={`text-xs mt-1 text-center ${homeIsDark ? "text-slate-400" : "text-slate-600"}`}>
              บ้าน{homeIsDark ? " (ไฟดับ)" : ""}
            </span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

// ============================================================
// Main Component
// ============================================================
const SolarHomeCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>("bill");
  const [bill, setBill] = useState<number>(3000);
  const [pattern, setPattern] = useState<UsagePattern>("mixed");
  const [appliances, setAppliances] = useState<ApplianceItem[]>(DEFAULT_APPLIANCES);
  const [systemType, setSystemType] = useState<SystemType>("HYBRID");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("noon");
  const [outage, setOutage] = useState<boolean>(false);

  const currentTime = useMemo(
    () => TIME_CONFIGS.find((t) => t.key === timeOfDay) ?? DEFAULT_TIME_CONFIG,
    [timeOfDay]
  );

  const result: SizingResult = useMemo(() => {
    return mode === "bill"
      ? calcFromBill(bill, pattern, systemType)
      : calcFromAppliances(appliances, systemType);
  }, [mode, bill, pattern, appliances, systemType]);

  const sunActive = currentTime.solarOutput > 0;
  const usingBattery = outage && (systemType === "OFFGRID" || systemType === "HYBRID") && result.batteryKwh > 0;
  const homeDark = outage && systemType === "ONGRID";

  const updateAppliance = (id: string, key: "qty" | "hours", value: number) => {
    setAppliances((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: Math.max(0, value) } : it)));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#002D62" }}>
            ☀️ เครื่องคำนวณระบบโซลาร์เซลล์สำหรับบ้าน
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            ประเมินขนาดระบบที่เหมาะสม เข้าใจ ON-GRID / OFF-GRID / HYBRID และจำลองสถานการณ์ไฟดับ
          </p>
        </div>

        {/* SECTION 1: Calculator */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5" style={{ color: "#002D62" }} />
            <h2 className="font-semibold text-lg text-slate-800">คำนวณขนาดระบบที่เหมาะกับบ้านคุณ</h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setMode("bill")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${mode === "bill" ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              A. ประเมินจากค่าไฟ
            </button>
            <button
              onClick={() => setMode("appliances")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${mode === "appliances" ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              B. ประเมินจากเครื่องใช้ไฟฟ้า
            </button>
          </div>

          {mode === "bill" ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600 font-medium">ค่าไฟเฉลี่ยต่อเดือน (บาท)</label>
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600 font-medium">พฤติกรรมการใช้ไฟ</label>
                <select
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value as UsagePattern)}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="day">เน้นใช้ไฟกลางวัน</option>
                  <option value="night">เน้นใช้ไฟกลางคืน</option>
                  <option value="mixed">ใช้ทั้งวัน (ผสม)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {appliances.map((it) => {
                const Icon = it.icon;
                return (
                  <div key={it.id} className="flex flex-wrap items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <Icon className="w-6 h-6 text-blue-900 shrink-0" />
                    <span className="font-medium text-slate-700 min-w-[130px]">{it.name}</span>
                    <span className="text-xs text-slate-400">{it.watt}W</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <label className="text-xs text-slate-500">จำนวน</label>
                      <input
                        type="number"
                        min={0}
                        value={it.qty}
                        onChange={(e) => updateAppliance(it.id, "qty", Number(e.target.value))}
                        className="w-16 border border-slate-300 rounded-lg px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="text-xs text-slate-500">ชม./วัน</label>
                      <input
                        type="number"
                        min={0}
                        max={24}
                        value={it.hours}
                        onChange={(e) => updateAppliance(it.id, "hours", Number(e.target.value))}
                        className="w-16 border border-slate-300 rounded-lg px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Result Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <SummaryCard icon={Sun} label="ขนาดแผงโซลาร์" value={`${result.kwp} kWp`} sub={`${result.panelCount} แผง (500W)`} color="#F2A900" />
            <SummaryCard icon={Plug} label="Inverter ที่แนะนำ" value={`${result.inverterKw} kW`} color="#0EA5E9" />
            <SummaryCard icon={Battery} label="แบตเตอรี่ BESS" value={result.batteryKwh > 0 ? `${result.batteryKwh} kWh` : "ไม่จำเป็น"} color="#16A34A" />
            <SummaryCard icon={Wallet} label="งบประมาณติดตั้งโดยประมาณ" value={`฿${result.budget.toLocaleString()}`} color="#002D62" />
            <SummaryCard icon={TrendingUp} label="ประหยัดค่าไฟ/เดือน" value={`฿${result.monthlySaving.toLocaleString()}`} color="#16A34A" />
            <SummaryCard icon={CheckCircle2} label="ระยะเวลาคืนทุน" value={result.paybackYears > 0 ? `${result.paybackYears} ปี` : "-"} color="#F2A900" />
          </div>
        </div>

        {/* SECTION 2: System Comparison */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5" style={{ color: "#002D62" }} />
            <h2 className="font-semibold text-lg text-slate-800">เปรียบเทียบระบบ ON-GRID / OFF-GRID / HYBRID</h2>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(Object.keys(SYSTEM_INFO) as SystemType[]).map((key) => (
              <button
                key={key}
                onClick={() => setSystemType(key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition border-2`}
                style={{
                  backgroundColor: systemType === key ? SYSTEM_INFO[key].color : "white",
                  color: systemType === key ? "white" : SYSTEM_INFO[key].color,
                  borderColor: SYSTEM_INFO[key].color,
                }}
              >
                {SYSTEM_INFO[key].title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={systemType}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 gap-4"
            >
              <div>
                <p className="text-slate-600 text-sm mb-3">{SYSTEM_INFO[systemType].desc}</p>
                <p className="font-semibold text-green-700 text-sm mb-1">ข้อดี</p>
                <ul className="space-y-1 mb-3">
                  {SYSTEM_INFO[systemType].pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-red-600 text-sm mb-1">ข้อจำกัด</p>
                <ul className="space-y-1">
                  {SYSTEM_INFO[systemType].cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-center">
                <table className="text-sm w-full">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 text-slate-500">มีแบตเตอรี่</td>
                      <td className="py-2 font-semibold text-right">{systemType === "ONGRID" ? "ไม่มี" : "มี"}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 text-slate-500">เชื่อมการไฟฟ้า</td>
                      <td className="py-2 font-semibold text-right">{systemType === "OFFGRID" ? "ไม่เชื่อม" : "เชื่อม"}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 text-slate-500">ไฟดับยังใช้ไฟได้ไหม</td>
                      <td className="py-2 font-semibold text-right">{systemType === "ONGRID" ? "ไม่ได้" : "ได้"}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-500">ต้นทุนโดยรวม</td>
                      <td className="py-2 font-semibold text-right">
                        {systemType === "ONGRID" ? "ต่ำ" : systemType === "HYBRID" ? "ปานกลาง-สูง" : "สูงมาก"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SECTION 3 & 4: Flow Diagram + Simulation */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" style={{ color: "#002D62" }} />
            <h2 className="font-semibold text-lg text-slate-800">แผนภาพการไหลของไฟฟ้า และจำลองสถานการณ์จริง</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {TIME_CONFIGS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setTimeOfDay(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition ${
                    timeOfDay === t.key ? "bg-blue-900 text-white border-blue-900" : "bg-white text-slate-600 border-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              );
            })}
            <button
              onClick={() => setOutage((o) => !o)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 transition ml-auto ${
                outage ? "bg-red-600 text-white border-red-600" : "bg-white text-red-600 border-red-500"
              }`}
            >
              <ShieldAlert className="w-4 h-4" /> {outage ? "ยกเลิกไฟดับ" : "จำลองไฟดับจากการไฟฟ้า!"}
            </button>
          </div>

          <FlowDiagram systemType={systemType} hasSun={sunActive} outage={outage} usingBattery={usingBattery} />

          <AnimatePresence>
            {outage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`rounded-xl p-4 border-2 flex items-start gap-3 ${
                  homeDark ? "bg-red-50 border-red-300" : "bg-green-50 border-green-300"
                }`}
              >
                {homeDark ? (
                  <>
                    <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-700">บ้านไฟดับทันที!</p>
                      <p className="text-sm text-red-600 mt-1">
                        ระบบ ON-GRID ต้องตัดการจ่ายไฟอัตโนมัติเมื่อการไฟฟ้าดับ (Anti-Islanding Protection)
                        เพื่อความปลอดภัยของช่างที่ซ่อมสายไฟฟ้าภายนอก แม้แผงโซลาร์จะยังผลิตไฟได้อยู่ก็ตาม
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Battery className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-700">ไฟในบ้านยังใช้งานได้ปกติ!</p>
                      <p className="text-sm text-green-600 mt-1">
                        ระบบ {systemType === "HYBRID" ? "HYBRID" : "OFF-GRID"} ตัดขาดจากกริดอัตโนมัติ
                        และดึงพลังงานจากแบตเตอรี่ ({result.batteryKwh} kWh) มาจ่ายให้เครื่องใช้ไฟฟ้าในบ้านแทน
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ icon: React.ElementType; label: string; value: string; sub?: string; color: string }> = ({
  icon: Icon, label, value, sub, color,
}) => (
  <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 flex flex-col gap-1">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" style={{ color }} />
      <span className="text-xs text-slate-500">{label}</span>
    </div>
    <span className="text-lg font-bold text-slate-800">{value}</span>
    {sub && <span className="text-xs text-slate-400">{sub}</span>}
  </div>
);

export default SolarHomeCalculator;
