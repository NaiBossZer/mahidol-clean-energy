import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: SolarInfoPage,
});

function SolarInfoPage() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 bg-slate-50 min-h-screen text-slate-800">
      
      {/* Header Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Mahidol Clean Energy
          </span>
          <h1 className="text-3xl font-extrabold mt-2 text-slate-900">
            ระบบพลังงานแสงอาทิตย์ (Solar Cell)
          </h1>
          <p className="text-slate-500 mt-1">
            โครงการบริการวิชาการและงานพันธกิจเพื่อสังคม อ.สบปราบ และ อ.ผาลาด จ.ลำปาง
          </p>
        </div>
        <a
          href="https://mahidol-lampang.vercel.app"
          className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition"
        >
          ← กลับหน้า Map หลัก
        </a>
      </div>

      {/* Highlights / Key Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">ขนาดติดตั้งระบบ</p>
          <p className="text-3xl font-black text-blue-600 mt-2">18 kWp</p>
          <p className="text-xs text-slate-400 mt-1">ติดตั้ง ณ พื้นที่ อ.สบปราบ</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">สัดส่วนการใช้ไฟฟ้าพลังงานแสงอาทิตย์</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">70.03%</p>
          <p className="text-xs text-slate-400 mt-1">คิดเป็น 10,743.43 หน่วย/ปี</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">สัดส่วนการใช้ไฟฟ้า กฟภ.</p>
          <p className="text-3xl font-black text-amber-600 mt-2">29.97%</p>
          <p className="text-xs text-slate-400 mt-1">คิดเป็น 4,597.60 หน่วย/ปี</p>
        </div>
      </div>

      {/* Details & Energy Ratio Bar */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900">สัดส่วนการทดแทนการใช้พลังงาน (อ.สบปราบ)</h2>
        <p className="text-slate-600 text-sm">
          ระบบ Solar Cell ขนาด 18 kWp ช่วยลดการพึ่งพาไฟฟ้าจากการไฟฟ้าส่วนภูมิภาค (กฟภ.) ได้มากกว่าสองในสามของปริมาณการใช้งานทั้งหมดในพื้นที่
        </p>
        
        {/* Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-emerald-600">Solar Cell (70.03%)</span>
            <span className="text-amber-600">กฟภ. (29.97%)</span>
          </div>
          <div className="w-full h-5 bg-amber-100 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full" style={{ width: '70.03%' }}></div>
            <div className="bg-amber-500 h-full" style={{ width: '29.97%' }}></div>
          </div>
        </div>
      </div>

      {/* Historical Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Electricity Unit Usage Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">สรุปปริมาณการใช้ไฟฟ้า (หน่วย)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5">ปีงบประมาณ</th>
                  <th className="py-2.5">สบปราบ</th>
                  <th className="py-2.5">ผาลาด</th>
                  <th className="py-2.5 text-right">รวม (หน่วย)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 font-medium">2566</td>
                  <td className="py-2.5">16,649.10</td>
                  <td className="py-2.5">34,152.00</td>
                  <td className="py-2.5 text-right font-bold">50,801.10</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">2567</td>
                  <td className="py-2.5">15,461.60</td>
                  <td className="py-2.5">30,512.00</td>
                  <td className="py-2.5 text-right font-bold">45,973.60</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">2568</td>
                  <td className="py-2.5">9,312.00</td>
                  <td className="py-2.5">11,175.21</td>
                  <td className="py-2.5 text-right font-bold text-emerald-600">20,487.21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Savings Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">สรุปค่าใช้จ่ายไฟฟ้า (บาท)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5">ปีงบประมาณ</th>
                  <th className="py-2.5">สบปราบ</th>
                  <th className="py-2.5">ผาลาด</th>
                  <th className="py-2.5 text-right">รวม (บาท)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 font-medium">2566</td>
                  <td className="py-2.5">100,096.41</td>
                  <td className="py-2.5">181,218.16</td>
                  <td className="py-2.5 text-right font-bold">281,314.57</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">2567</td>
                  <td className="py-2.5">80,749.78</td>
                  <td className="py-2.5">142,663.92</td>
                  <td className="py-2.5 text-right font-bold">223,413.70</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">2568</td>
                  <td className="py-2.5">46,258.13</td>
                  <td className="py-2.5">54,834.94</td>
                  <td className="py-2.5 text-right font-bold text-emerald-600">101,093.07</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}