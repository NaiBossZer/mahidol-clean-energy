import { createFileRoute } from '@tanstack/react-router';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Sun, Battery, Zap, Home, TreePine, CloudOff, Flame, AlertCircle, ArrowLeft, CheckCircle2 
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: FusionSolarDashboard,
});

// ข้อมูลจำลองกราฟการผลิตไฟฟ้าระหว่างวัน (Power Curve)
const dailyPowerData = [
  { time: '00:00', pvOutput: 0, totalConsumption: 0.3, consumedFromPV: 0 },
  { time: '03:40', pvOutput: 0, totalConsumption: 0.25, consumedFromPV: 0 },
  { time: '07:20', pvOutput: 0.5, totalConsumption: 0.6, consumedFromPV: 0.5 },
  { time: '09:10', pvOutput: 3.2, totalConsumption: 1.8, consumedFromPV: 1.8 },
  { time: '11:00', pvOutput: 5.8, totalConsumption: 2.5, consumedFromPV: 2.5 },
  { time: '12:50', pvOutput: 4.2, totalConsumption: 3.1, consumedFromPV: 3.1 },
  { time: '14:40', pvOutput: 3.5, totalConsumption: 2.8, consumedFromPV: 2.8 },
  { time: '16:30', pvOutput: 1.1, totalConsumption: 2.0, consumedFromPV: 1.1 },
  { time: '18:20', pvOutput: 0.1, totalConsumption: 1.2, consumedFromPV: 0.1 },
  { time: '20:10', pvOutput: 0, totalConsumption: 0.8, consumedFromPV: 0 },
  { time: '23:50', pvOutput: 0, totalConsumption: 0.4, consumedFromPV: 0 },
];

// ข้อมูลจำลองรายได้/ค่าไฟที่ประหยัดได้ประจำเดือน (Revenue)
const monthlyRevenueData = [
  { day: '01', revenue: 145 }, { day: '02', revenue: 160 }, { day: '03', revenue: 240 },
  { day: '04', revenue: 175 }, { day: '05', revenue: 155 }, { day: '06', revenue: 230 },
  { day: '07', revenue: 215 }, { day: '08', revenue: 140 }, { day: '09', revenue: 150 },
  { day: '10', revenue: 180 }, { day: '11', revenue: 200 }, { day: '12', revenue: 220 },
  { day: '13', revenue: 150 }, { day: '14', revenue: 280 }, { day: '15', revenue: 160 },
  { day: '16', revenue: 165 }, { day: '17', revenue: 190 }, { day: '18', revenue: 210 },
  { day: '19', revenue: 65 },  { day: '20', revenue: 0 },   { day: '21', revenue: 0 },
];

function FusionSolarDashboard() {
  return (
    <div className="p-4 md:p-8 bg-slate-100 min-h-screen space-y-6 text-slate-800 font-sans">
      
      {/* 1. Top Header */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-2xl font-bold text-slate-900">TH-MUEN-LP 18.0 kWp</h1>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">
              Online Normal
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            การติดตามการผลิตพลังงานแสงอาทิตย์ (Huawei FusionSolar System)
          </p>
        </div>
        
        <a
          href="https://mahidol-lampang.vercel.app"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> กลับหน้า Map หลัก
        </a>
      </div>

      {/* 2. Top Metric Cards (Yield & Consumption) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yield today</p>
            <p className="text-2xl font-black text-blue-600 mt-1">21.04 <span className="text-sm font-medium text-slate-500">kWh</span></p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Sun className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total yield</p>
            <p className="text-2xl font-black text-slate-800 mt-1">40.11 <span className="text-sm font-medium text-slate-500">MWh</span></p>
          </div>
          <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Consumption today</p>
            <p className="text-2xl font-black text-amber-600 mt-1">31.89 <span className="text-sm font-medium text-slate-500">kWh</span></p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Home className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Consumed from PV</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">21.02 <span className="text-sm font-medium text-slate-500">kWh</span></p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 3. Middle Section: Power Flow & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Power Flow Diagram & Environmental Impact */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 space-y-6">
          <h2 className="text-base font-bold text-slate-800">การไหลของพลังงานแบบเรียลไทม์ (Power Flow)</h2>
          
          {/* Energy Diagram Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-amber-100 flex flex-col items-center">
              <Sun className="w-7 h-7 text-amber-500 mb-1" />
              <span className="text-xs text-slate-400 font-semibold">PV Array</span>
              <span className="text-base font-extrabold text-slate-800 mt-1">2.281 kW</span>
            </div>

            <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-100 flex flex-col items-center">
              <Battery className="w-7 h-7 text-emerald-500 mb-1" />
              <span className="text-xs text-slate-400 font-semibold">Battery (49%)</span>
              <span className="text-base font-extrabold text-slate-800 mt-1">1.219 kW</span>
            </div>

            <div className="p-3 bg-white rounded-xl shadow-sm border border-blue-100 flex flex-col items-center">
              <Zap className="w-7 h-7 text-blue-500 mb-1" />
              <span className="text-xs text-slate-400 font-semibold">Grid</span>
              <span className="text-base font-extrabold text-slate-800 mt-1">0.036 kW</span>
            </div>

            <div className="p-3 bg-white rounded-xl shadow-sm border border-purple-100 flex flex-col items-center">
              <Home className="w-7 h-7 text-purple-500 mb-1" />
              <span className="text-xs text-slate-400 font-semibold">Load</span>
              <span className="text-base font-extrabold text-slate-800 mt-1">1.098 kW</span>
            </div>
          </div>

          {/* Environmental Contribution */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">ผลประโยชน์ด้านสิ่งแวดล้อม (ESG Benefits)</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Standard coal saved</p>
                  <p className="text-sm font-bold text-slate-800">16.04 <span className="text-xs font-normal">tons</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <CloudOff className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">CO₂ avoided</p>
                  <p className="text-sm font-bold text-emerald-600">19.05 <span className="text-xs font-normal">tons</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-50 text-green-700 rounded-xl">
                  <TreePine className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Trees planted</p>
                  <p className="text-sm font-bold text-green-700">27 <span className="text-xs font-normal">trees</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* System Alarms & Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-800">สถานะระบบ (Alarms)</h2>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">0 Alarms</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Critical</span>
                <span className="text-sm font-bold text-slate-800">0</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Major</span>
                <span className="text-sm font-bold text-slate-800">0</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Minor</span>
                <span className="text-sm font-bold text-slate-800">0</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Warning</span>
                <span className="text-sm font-bold text-slate-800">0</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Total string capacity:</span>
              <span className="font-semibold text-slate-700">18.000 kWp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rated battery capacity:</span>
              <span className="font-semibold text-slate-700">13.8 kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Grid connection date:</span>
              <span className="font-semibold text-slate-700">2022-03-02</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Bottom Section: Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Real-time Power Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">Energy Management (กำลังไฟฟ้าประจำวัน)</h2>
            <span className="text-xs text-slate-400">kW</span>
          </div>

          {/* Breakdown progress bars */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-emerald-600">PV Yield (21.04 kWh)</span>
                <span>99.90% Consumed</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '99.90%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-amber-600">Consumption (31.89 kWh)</span>
                <span>47.32% From PV</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: '47.32%' }}></div>
              </div>
            </div>
          </div>

          <div className="h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyPowerData}>
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="pvOutput" name="PV Output (kW)" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Area type="monotone" dataKey="totalConsumption" name="Total Consumption (kW)" stroke="#ef4444" fill="#ef4444" fillOpacity={0.05} />
                <Area type="monotone" dataKey="consumedFromPV" name="Consumed from PV (kW)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">Revenue / Cost Savings (มูลค่าการประหยัดไฟ)</h2>
              <p className="text-xs text-emerald-600 font-bold mt-0.5">Total Revenue: 3.47K ฿</p>
            </div>
            <span className="text-xs text-slate-400">บาท (฿)</span>
          </div>

          <div className="h-72 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="revenue" name="Revenue (฿)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}