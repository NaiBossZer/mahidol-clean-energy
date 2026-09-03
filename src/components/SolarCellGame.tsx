import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Zap,
  BatteryCharging,
  BatteryFull,
  Battery,
  Car,
  Building2,
  Leaf,
  Trophy,
  RotateCcw,
  Info,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Wallet,
  Cloud,
} from "lucide-react";

// ============================================================
// Types & Constants
// ============================================================

type TimeSlot = "morning" | "noon" | "evening" | "night";
type BatteryMode = "charge" | "discharge";

interface TimeConfig {
  key: TimeSlot;
  label: string;
  time: string;
  icon: React.ReactNode;
  solarOutputPercent: number; // 0-100
  campusLoadKw: number;
  skyGradient: string;
}

const MAX_SOLAR_KW = 120; // กำลังผลิตสูงสุดของแผงโซลาร์เซลล์ (kW)
const EV_STATION_KW = 25; // กำลังไฟสถานีชาร์จ EV
const BATTERY_CAPACITY_KW_STEP = 8; // อัตราชาร์จ/จ่ายไฟของแบตเตอรี่ต่อรอบ (kW)
const CO2_FACTOR_KG_PER_KWH = 0.5; // kgCO2 ต่อ kWh ไฟฟ้าที่ประหยัดได้จาก Grid
const BAHT_PER_KWH = 4.5; // ราคาไฟฟ้าโดยประมาณ (บาท/หน่วย)

const TIME_CONFIGS: TimeConfig[] = [
  {
    key: "morning",
    label: "เช้า",
    time: "08:00 น.",
    icon: <Sunrise className="w-5 h-5" />,
    solarOutputPercent: 45,
    campusLoadKw: 60,
    skyGradient: "from-sky-200 via-amber-100 to-orange-100",
  },
  {
    key: "noon",
    label: "เที่ยงวัน",
    time: "12:00 น.",
    icon: <Sun className="w-5 h-5" />,
    solarOutputPercent: 100,
    campusLoadKw: 85,
    skyGradient: "from-sky-300 via-sky-100 to-yellow-50",
  },
  {
    key: "evening",
    label: "เย็น",
    time: "17:00 น.",
    icon: <Sunset className="w-5 h-5" />,
    solarOutputPercent: 30,
    campusLoadKw: 95,
    skyGradient: "from-orange-300 via-amber-200 to-rose-100",
  },
  {
    key: "night",
    label: "กลางคืน",
    time: "22:00 น.",
    icon: <Moon className="w-5 h-5" />,
    solarOutputPercent: 0,
    campusLoadKw: 50,
    skyGradient: "from-indigo-900 via-indigo-800 to-slate-900",
  },
];
const DEFAULT_TIME_CONFIG: TimeConfig = TIME_CONFIGS.find((t) => t.key === "noon") as TimeConfig;
// ============================================================
// Helper Components
// ============================================================

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  accentColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subValue, accentColor }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <span className="text-slate-500 text-sm font-medium">{label}</span>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
      >
        {icon}
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-slate-800">{value}</span>
      {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
    </div>
  </div>
);

interface ProgressBarProps {
  percent: number;
  colorFrom: string;
  colorTo: string;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, colorFrom, colorTo, height = "h-3" }) => (
  <div className={`w-full bg-slate-100 rounded-full ${height} overflow-hidden`}>
    <div
      className={`${height} rounded-full transition-all duration-700 ease-out`}
      style={{
        width: `${Math.min(100, Math.max(0, percent))}%`,
        background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
      }}
    />
  </div>
);

// ============================================================
// Main Component
// ============================================================

const SolarCellGame: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<TimeSlot>("noon");
  const [batteryMode, setBatteryMode] = useState<BatteryMode>("charge");
  const [batteryLevel, setBatteryLevel] = useState<number>(50); // % 0-100
  const [evStationOn, setEvStationOn] = useState<boolean>(false);
  const [cumulativeCo2Kg, setCumulativeCo2Kg] = useState<number>(0);
  const [cumulativeSavingBaht, setCumulativeSavingBaht] = useState<number>(0);
  const [showTip, setShowTip] = useState<boolean>(false);

  const currentConfig = useMemo(
    () => TIME_CONFIGS.find((t) => t.key === selectedTime) ?? DEFAULT_TIME_CONFIG,
    [selectedTime]
  );


  const solarPowerKw = useMemo(
    () => Math.round((currentConfig.solarOutputPercent / 100) * MAX_SOLAR_KW),
    [currentConfig]
  );

  const totalLoadKw = useMemo(
    () => currentConfig.campusLoadKw + (evStationOn ? EV_STATION_KW : 0),
    [currentConfig, evStationOn]
  );

  // คำนวณสมดุลพลังงานทุกครั้งที่ปัจจัยเปลี่ยน
  const balance = useMemo(() => {
    let solarRemaining = solarPowerKw;
    let load = totalLoadKw;
    let batterySupportKw = 0;
    let batteryChargeKw = 0;

    // ใช้โซลาร์ตอบสนองโหลดก่อน
    const solarUsedForLoad = Math.min(solarRemaining, load);
    load -= solarUsedForLoad;
    solarRemaining -= solarUsedForLoad;

    if (batteryMode === "discharge" && load > 0 && batteryLevel > 0) {
      batterySupportKw = Math.min(BATTERY_CAPACITY_KW_STEP, load);
      load -= batterySupportKw;
    }

    if (batteryMode === "charge" && solarRemaining > 0 && batteryLevel < 100) {
      batteryChargeKw = Math.min(BATTERY_CAPACITY_KW_STEP, solarRemaining);
      solarRemaining -= batteryChargeKw;
    }

    const gridDrawKw = Math.max(0, load); // ไฟที่ต้องดึงจากสายส่งหลักเพิ่ม
    const surplusKw = solarRemaining; // ไฟส่วนเกินที่ไม่ได้ใช้/เก็บ
    const isNetZero = gridDrawKw === 0;

    // Net Zero Score: คิดจากสัดส่วนโหลดที่ครอบคลุมได้ด้วยพลังงานสะอาด
    const cleanCovered = totalLoadKw - gridDrawKw;
    const scoreRaw = totalLoadKw > 0 ? (cleanCovered / totalLoadKw) * 100 : 100;
    const score = Math.round(Math.max(0, Math.min(100, scoreRaw)));

    return {
      solarUsedForLoad,
      batterySupportKw,
      batteryChargeKw,
      gridDrawKw,
      surplusKw,
      isNetZero,
      score,
    };
  }, [solarPowerKw, totalLoadKw, batteryMode, batteryLevel]);

  // อัปเดตระดับแบตเตอรี่แบบอนิเมชันเมื่อโหมด/เวลาเปลี่ยน
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (batteryMode === "charge" && balance.batteryChargeKw > 0) {
          return Math.min(100, prev + 1);
        }
        if (batteryMode === "discharge" && balance.batterySupportKw > 0) {
          return Math.max(0, prev - 1);
        }
        return prev;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [batteryMode, balance.batteryChargeKw, balance.batterySupportKw]);

  // สะสมผลลัพธ์ CO2 และเงินประหยัดตามเวลาที่ผ่านไป (จำลองแบบ real-time tick)
  useEffect(() => {
    const interval = setInterval(() => {
      const cleanEnergyKwh =
        (balance.solarUsedForLoad + balance.batterySupportKw) * (5 / 60); // จำลอง 5 นาทีต่อ tick
      if (cleanEnergyKwh > 0) {
        setCumulativeCo2Kg((prev) => prev + cleanEnergyKwh * CO2_FACTOR_KG_PER_KWH);
        setCumulativeSavingBaht((prev) => prev + cleanEnergyKwh * BAHT_PER_KWH);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [balance.solarUsedForLoad, balance.batterySupportKw]);

  const handleReset = useCallback(() => {
    setSelectedTime("noon");
    setBatteryMode("charge");
    setBatteryLevel(50);
    setEvStationOn(false);
    setCumulativeCo2Kg(0);
    setCumulativeSavingBaht(0);
    setShowTip(false);
  }, []);

  const scoreColor =
    balance.score >= 90 ? "#16A34A" : balance.score >= 60 ? "#F2A900" : "#DC2626";

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div
          className={`relative overflow-hidden rounded-3xl p-6 md:p-8 bg-linear-to-br ${currentConfig.skyGradient} shadow-lg`}
        >
          <div className="absolute inset-0 bg-[#002D62]/10 backdrop-blur-[2px]" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#002D62] flex items-center justify-center shadow-md">
                <Building2 className="w-7 h-7 text-[#F2A900]" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-extrabold text-[#002D62]">
                  ระบบจำลองพลังงานแสงอาทิตย์ &amp; สถานีชาร์จ EV
                </h1>
                <p className="text-sm md:text-base text-[#002D62]/80 font-medium">
                  มหาวิทยาลัยมหิดล วิทยาเขตนครลำปาง
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-[#002D62] font-semibold shadow-sm transition-all active:scale-95 self-start md:self-auto"
            >
              <RotateCcw className="w-4 h-4" />
              รีเซ็ตเกม
            </button>
          </div>
        </div>

        {/* Time Controller */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="w-5 h-5 text-[#002D62]" />
            <h2 className="font-bold text-slate-800">เลือกช่วงเวลาจำลอง</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIME_CONFIGS.map((cfg) => {

const DEFAULT_TIME_CONFIG: TimeConfig = TIME_CONFIGS.find((t) => t.key === "noon") as TimeConfig;
              const active = cfg.key === selectedTime;
              return (
                <button
                  key={cfg.key}
                  onClick={() => setSelectedTime(cfg.key)}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-4 border-2 transition-all duration-200 ${
                    active
                      ? "border-[#002D62] bg-[#002D62] text-white shadow-md scale-[1.02]"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className={active ? "text-[#F2A900]" : "text-slate-400"}>{cfg.icon}</div>
                  <span className="font-semibold text-sm">{cfg.label}</span>
                  <span className="text-xs opacity-80">{cfg.time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Sun className="w-5 h-5" />}
            label="กำลังผลิตโซลาร์"
            value={`${solarPowerKw} kW`}
            subValue={`${currentConfig.solarOutputPercent}% กำลังสูงสุด`}
            accentColor="#0EA5E9"
          />
          <StatCard
            icon={<Building2 className="w-5 h-5" />}
            label="โหลดอาคารเรียน"
            value={`${currentConfig.campusLoadKw} kW`}
            accentColor="#002D62"
          />
          <StatCard
            icon={<Car className="w-5 h-5" />}
            label="สถานีชาร์จ EV"
            value={evStationOn ? `+${EV_STATION_KW} kW` : "ปิดอยู่"}
            accentColor="#F2A900"
          />
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            label="โหลดรวมทั้งหมด"
            value={`${totalLoadKw} kW`}
            accentColor="#DC2626"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Battery & EV Control */}
          <div className="lg:col-span-1 space-y-6">
            {/* Battery Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-[#16A34A]" />
                <h3 className="font-bold text-slate-800">แบตเตอรี่สำรอง (BESS)</h3>
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      strokeWidth="3.5"
                      strokeDasharray={`${batteryLevel}, 100`}
                      strokeLinecap="round"
                      stroke={batteryLevel > 20 ? "#16A34A" : "#DC2626"}
                      fill="none"
                      className="transition-all duration-700"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {batteryLevel > 80 ? (
                      <BatteryFull className="w-5 h-5 text-[#16A34A]" />
                    ) : (
                      <Battery className="w-5 h-5 text-slate-500" />
                    )}
                    <span className="font-bold text-slate-800 text-sm">{batteryLevel}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-xl p-1">
                <button
                  onClick={() => setBatteryMode("charge")}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                    batteryMode === "charge"
                      ? "bg-[#0EA5E9] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  ⚡ ชาร์จเก็บไฟ
                </button>
                <button
                  onClick={() => setBatteryMode("discharge")}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                    batteryMode === "discharge"
                      ? "bg-[#16A34A] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  🔋 จ่ายไฟช่วยเหลือ
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                {batteryMode === "charge"
                  ? "แบตเตอรี่กำลังดูดซับพลังงานส่วนเกินจากโซลาร์เซลล์"
                  : "แบตเตอรี่กำลังจ่ายไฟเสริมให้กับโหลดของอาคาร"}
              </p>
            </div>

            {/* EV Station Toggle */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#F2A900]/15 flex items-center justify-center">
                    <Car className="w-5 h-5 text-[#F2A900]" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">สถานีชาร์จ EV</p>
                    <p className="text-xs text-slate-400">เพิ่มโหลด {EV_STATION_KW} kW</p>
                  </div>
                </div>
                <button
                  onClick={() => setEvStationOn((prev) => !prev)}
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${
                    evStationOn ? "bg-[#F2A900]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                      evStationOn ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Power Balance Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#002D62]" />
                <h3 className="font-bold text-slate-800">สมดุลพลังงาน (Power Balance)</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">พลังงานผลิตได้</span>
                    <span className="font-semibold text-[#0EA5E9]">{solarPowerKw} kW</span>
                  </div>
                  <ProgressBar percent={(solarPowerKw / MAX_SOLAR_KW) * 100} colorFrom="#0EA5E9" colorTo="#38BDF8" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">พลังงานที่ใช้</span>
                    <span className="font-semibold text-[#DC2626]">{totalLoadKw} kW</span>
                  </div>
                  <ProgressBar percent={(totalLoadKw / (MAX_SOLAR_KW + EV_STATION_KW)) * 100} colorFrom="#F87171" colorTo="#DC2626" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-sky-50 rounded-xl py-3">
                  <p className="text-xs text-slate-500 mb-1">โซลาร์ป้อนโหลด</p>
                  <p className="font-bold text-[#0EA5E9]">{Math.round(balance.solarUsedForLoad)} kW</p>
                </div>
                <div className="bg-emerald-50 rounded-xl py-3">
                  <p className="text-xs text-slate-500 mb-1">แบตช่วยจ่าย</p>
                  <p className="font-bold text-[#16A34A]">{Math.round(balance.batterySupportKw)} kW</p>
                </div>
                <div className="bg-red-50 rounded-xl py-3">
                  <p className="text-xs text-slate-500 mb-1">ดึงไฟหลักเพิ่ม</p>
                  <p className="font-bold text-[#DC2626]">{Math.round(balance.gridDrawKw)} kW</p>
                </div>
              </div>

              {/* Status Box */}
              <div
                className={`rounded-2xl p-4 flex items-center gap-3 border ${
                  balance.isNetZero
                    ? "bg-[#16A34A]/10 border-[#16A34A]/30"
                    : "bg-[#DC2626]/10 border-[#DC2626]/30"
                }`}
              >
                {balance.isNetZero ? (
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-[#DC2626] shrink-0" />
                )}
                <div>
                  <p className={`font-bold ${balance.isNetZero ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                    {balance.isNetZero ? "Zero Carbon Grid!" : "มีการดึงไฟหลักเพิ่ม (Grid Draw)"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {balance.isNetZero
                      ? "พลังงานสะอาดเพียงพอต่อความต้องการทั้งหมดของแคมปัส"
                      : `ต้องการไฟเพิ่มจากสายส่งหลัก ${Math.round(balance.gridDrawKw)} kW เพื่อชดเชยส่วนที่ขาด`}
                  </p>
                </div>
              </div>

              {/* Net Zero Score */}
              <div className="flex items-center gap-4 pt-2">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      strokeWidth="3.5"
                      strokeDasharray={`${balance.score}, 100`}
                      strokeLinecap="round"
                      stroke={scoreColor}
                      fill="none"
                      className="transition-all duration-700"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-extrabold text-slate-800">{balance.score}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-[#F2A900]" />
                    <span className="font-bold text-slate-800 text-sm">Net Zero Score</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    คะแนนสะท้อนสัดส่วนพลังงานสะอาดที่ครอบคลุมความต้องการไฟฟ้าทั้งหมด
                  </p>
                  <button
                    onClick={() => setShowTip((prev) => !prev)}
                    className="mt-2 flex items-center gap-1 text-xs text-[#002D62] font-semibold hover:underline"
                  >
                    <Info className="w-3.5 h-3.5" />
                    เคล็ดลับทำคะแนนเต็ม 100
                  </button>
                  {showTip && (
                    <div className="mt-2 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3">
                      เลือกช่วง "เที่ยงวัน" ที่โซลาร์ผลิตไฟสูงสุด แล้วตั้งแบตเตอรี่เป็นโหมด
                      "ชาร์จเก็บไฟ" เพื่อเก็บพลังงานส่วนเกินไว้ใช้ในช่วงเย็นหรือกลางคืน
                      จากนั้นสลับมาโหมด "จ่ายไฟช่วยเหลือ" ในช่วงที่โซลาร์ผลิตไฟน้อย
                      เพื่อให้ Grid Draw เป็น 0 ตลอดเวลา
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cumulative Impact */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-linear-to-br from-[#16A34A] to-[#15803D] rounded-2xl p-5 text-white shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">CO2 ที่ลดได้สะสม</span>
                </div>
                <p className="text-2xl font-extrabold">{cumulativeCo2Kg.toFixed(1)} kg</p>
              </div>
              <div className="bg-linear-to-br from-[#002D62] to-[#001A3D] rounded-2xl p-5 text-white shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-[#F2A900]" />
                  <span className="text-sm font-medium opacity-90">เงินที่ประหยัดได้สะสม</span>
                </div>
                <p className="text-2xl font-extrabold">{cumulativeSavingBaht.toFixed(1)} บาท</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center text-xs text-slate-400 pt-4 pb-6">
          ระบบจำลองเพื่อการศึกษา — มหาวิทยาลัยมหิดล วิทยาเขตนครลำปาง
        </footer>
      </div>
    </div>
  );
};

export default SolarCellGame;