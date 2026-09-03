import { Link, redirect, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { 
  GraduationCap, 
  ArrowLeft, 
  RefreshCw, 
  LogOut, 
  Filter, 
  RotateCcw, 
  Users, 
  Star, 
  Trophy, 
  Wrench, 
  BarChart3, 
  PieChart as PieChartIcon, 
  MessageSquare, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  Calendar,
  UserCheck,
  Building2,
  Tag
} from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxIXYFkonDlYf8sb1VqTDoJXlsZ58Pd53qYSP-rxeLc-9_hiHA4kKIUVAUEM-IdcrLIkQ/exec";

interface SurveyResponse {
  timestamp?: string;
  ageGroup?: string;
  affiliation?: string;
  everJoined?: string;
  channels?: string;
  p2_location?: number | string;
  p2_schedule?: number | string;
  p2_readiness?: number | string;
  p2_reception?: number | string;
  p2_overall?: number | string;
  p3_interest?: number | string;
  p3_content?: number | string;
  p3_clarity?: number | string;
  p3_benefit?: number | string;
  p3_application?: number | string;
  p4_knowledge?: number | string;
  p4_inspiration?: number | string;
  p4_communityResource?: number | string;
  p4_futureReturn?: number | string;
  feedback?: string;
}

const QUESTION_MAP: Record<keyof SurveyResponse, { title: string; category: string }> = {
  p2_location: { title: "ความเหมาะสมของสถานที่", category: "การจัดงาน" },
  p2_schedule: { title: "ความเหมาะสมของระยะเวลา", category: "การจัดงาน" },
  p2_readiness: { title: "ความพร้อมของอุปกรณ์/สื่อ", category: "การจัดงาน" },
  p2_reception: { title: "การต้อนรับและการอำนวยความสะดวก", category: "การจัดงาน" },
  p2_overall: { title: "ภาพรวมการจัดกิจกรรม", category: "การจัดงาน" },
  p3_interest: { title: "ความน่าสนใจของเนื้อหา", category: "เนื้อหา/การเรียนรู้" },
  p3_content: { title: "ความสมบูรณ์ครบถ้วนของเนื้อหา", category: "เนื้อหา/การเรียนรู้" },
  p3_clarity: { title: "ความชัดเจนในการถ่ายทอด", category: "เนื้อหา/การเรียนรู้" },
  p3_benefit: { title: "ประโยชน์ที่ได้รับ", category: "เนื้อหา/การเรียนรู้" },
  p3_application: { title: "การนำไปประยุกต์ใช้", category: "เนื้อหา/การเรียนรู้" },
  p4_knowledge: { title: "ความรู้ความเข้าใจที่เพิ่มขึ้น", category: "ผลกระทบ" },
  p4_inspiration: { title: "แรงบันดาลใจในการต่อยอด", category: "ผลกระทบ" },
  p4_communityResource: { title: "การเป็นแหล่งเรียนรู้ของชุมชน", category: "ผลกระทบ" },
  p4_futureReturn: { title: "ความสนใจเข้าร่วมอีกในอนาคต", category: "ผลกระทบ" },
  timestamp: { title: "", category: "" },
  ageGroup: { title: "", category: "" },
  affiliation: { title: "", category: "" },
  everJoined: { title: "", category: "" },
  channels: { title: "", category: "" },
  feedback: { title: "", category: "" },
};

const COLOR_PALETTE = ["#1e3a8a", "#d97706", "#2563eb", "#059669", "#7c3aed", "#db2777", "#475569"];

const MONTH_NAMES = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [selectedAge, setSelectedAge] = useState<string>("ALL");
  const [selectedAffiliation, setSelectedAffiliation] = useState<string>("ALL");

  useEffect(() => {
    const isAuth = sessionStorage.getItem("dashboard_auth") === "true";
    if (!isAuth) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleResetFilter = () => {
    setSelectedYear("ALL");
    setSelectedMonth("ALL");
    setSelectedAge("ALL");
    setSelectedAffiliation("ALL");
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, { method: "GET", redirect: "follow" });
      if (!res.ok) throw new Error("ไม่สามารถเชื่อมต่อกับ Google Apps Script ได้");
      const json = await res.json();

      if (Array.isArray(json)) {
        const validData = json.filter((item: any) => {
          if (!item || typeof item !== "object") return false;
          return Object.values(item).some(
            (val) => val !== null && val !== undefined && String(val).trim() !== ""
          );
        });
        setData(validData);
      } else {
        setData([]);
      }

      const now = new Date();
      setLastUpdated(
        `${now.getDate()} ส.ค. ${now.getFullYear() + 543} ${now
          .getHours()
          .toString()
          .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
      );
    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
      setErrorMsg("ไม่สามารถดึงข้อมูลได้ในขณะนี้ กรุณากด Refresh อีกครั้ง");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const parseNum = (val: any): number => {
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  };

  const availableYears = useMemo(() => {
    const yearSet = new Set<string>();
    data.forEach((item) => {
      if (item.timestamp) {
        const d = new Date(item.timestamp);
        if (!isNaN(d.getTime())) {
          yearSet.add(d.getFullYear().toString());
        }
      }
    });
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, [data]);

  const availableMonths = useMemo(() => {
    const monthSet = new Set<number>();
    data.forEach((item) => {
      if (item.timestamp) {
        const d = new Date(item.timestamp);
        if (!isNaN(d.getTime())) {
          if (selectedYear === "ALL" || d.getFullYear().toString() === selectedYear) {
            monthSet.add(d.getMonth());
          }
        }
      }
    });
    return Array.from(monthSet).sort((a, b) => a - b);
  }, [data, selectedYear]);

  const ageGroupList = useMemo(() => {
    const set = new Set<string>();
    data.forEach((item) => {
      if (item.ageGroup?.trim()) set.add(item.ageGroup.trim());
    });
    return Array.from(set);
  }, [data]);

  const affiliationsList = useMemo(() => {
    const set = new Set<string>();
    data.forEach((item) => set.add(item.affiliation?.trim() || "ไม่ระบุ"));
    return Array.from(set);
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (item.timestamp) {
        const itemDate = new Date(item.timestamp);
        if (!isNaN(itemDate.getTime())) {
          if (selectedYear !== "ALL" && itemDate.getFullYear().toString() !== selectedYear) {
            return false;
          }
          if (selectedMonth !== "ALL" && itemDate.getMonth().toString() !== selectedMonth) {
            return false;
          }
        }
      }

      if (selectedAge !== "ALL") {
        const itemAge = item.ageGroup?.trim() || "";
        if (itemAge !== selectedAge) return false;
      }

      if (selectedAffiliation !== "ALL") {
        const itemAff = item.affiliation?.trim() || "ไม่ระบุ";
        if (itemAff !== selectedAffiliation) return false;
      }

      return true;
    });
  }, [data, selectedYear, selectedMonth, selectedAge, selectedAffiliation]);

  const itemScores = useMemo(() => {
    const keys = Object.keys(QUESTION_MAP).filter(
      (k) => QUESTION_MAP[k as keyof SurveyResponse].title !== ""
    ) as (keyof SurveyResponse)[];

    return keys.map((key) => {
      let sum = 0;
      let count = 0;
      filteredData.forEach((item) => {
        const val = parseNum(item[key]);
        if (val > 0) {
          sum += val;
          count++;
        }
      });
      const avg = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
      return {
        key,
        title: QUESTION_MAP[key].title,
        category: QUESTION_MAP[key].category,
        avg,
      };
    });
  }, [filteredData]);

  const categoryGroupedScores = useMemo(() => {
    const groups: Record<string, { category: string; avg: number; items: typeof itemScores }> = {};

    itemScores.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = { category: item.category, avg: 0, items: [] };
      }
      groups[item.category].items.push(item);
    });

    const resultList = Object.values(groups).map((group) => {
      const total = group.items.reduce((sum, i) => sum + i.avg, 0);
      const avg = group.items.length > 0 ? parseFloat((total / group.items.length).toFixed(2)) : 0;
      const sortedItems = [...group.items].sort((a, b) => b.avg - a.avg);

      return {
        ...group,
        avg,
        items: sortedItems,
      };
    });

    return resultList.sort((a, b) => b.avg - a.avg);
  }, [itemScores]);

  const cardMetrics = useMemo(() => {
    if (itemScores.length === 0 || filteredData.length === 0) return null;

    const sorted = [...itemScores].sort((a, b) => b.avg - a.avg);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    const rawGrandAvg = itemScores.reduce((acc, curr) => acc + curr.avg, 0) / itemScores.length;
    const grandAvgPercent = Math.round((rawGrandAvg / 5) * 100);

    return {
      highest,
      lowest,
      grandAvgPercent,
      totalQuestions: itemScores.length,
    };
  }, [itemScores, filteredData]);

  const affiliationBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((item) => {
      const key = item.affiliation?.trim() || "ไม่ระบุ";
      counts[key] = (counts[key] || 0) + 1;
    });
    const total = filteredData.length || 1;
    return Object.entries(counts).map(([name, count], idx) => ({
      name,
      count,
      percent: parseFloat(((count / total) * 100).toFixed(1)),
      color: COLOR_PALETTE[idx % COLOR_PALETTE.length],
    }));
  }, [filteredData]);

  const feedbackAnalysis = useMemo(() => {
    const rawFeedbacks = filteredData
      .filter((d) => d.feedback && d.feedback.trim() !== "")
      .map((d) => ({
        text: d.feedback!.trim(),
        affiliation: d.affiliation || "ไม่ระบุ",
        timestamp: d.timestamp || "N/A",
      }));

    let positiveCount = 0;
    let followUpCount = 0;
    let urgentCount = 0;
    let generalCount = 0;

    const topicCounts: Record<string, number> = {
      "การให้บริการ": 0,
      "กิจกรรม/การเรียนรู้": 0,
      "สิ่งแวดล้อม/สถานที่": 0,
      "อุปกรณ์/สื่อ": 0,
    };

    const parsedList = rawFeedbacks.map((item) => {
      const t = item.text.toLowerCase();
      let status: "positive" | "followup" | "urgent" | "general" = "positive";
      let tag = "ทั่วไป";

      if (t.includes("ด่วน") || t.includes("ปรับปรุง") || t.includes("แย่") || t.includes("เสีย") || t.includes("ช้า")) {
        status = "urgent";
        urgentCount++;
      } else if (t.includes("ควร") || t.includes("อยากให้") || t.includes("ติดตาม") || t.includes("เพิ่ม")) {
        status = "followup";
        followUpCount++;
      } else if (t.includes("ดี") || t.includes("ประทับใจ") || t.includes("ชอบ") || t.includes("เยี่ยม") || t.includes("ขอบคุณ")) {
        status = "positive";
        positiveCount++;
      } else {
        status = "general";
        generalCount++;
      }

      if (t.includes("บริการ") || t.includes("พนักงาน") || t.includes("ต้อนรับ") || t.includes("เจ้าหน้าที่")) {
        tag = "การให้บริการ";
        topicCounts["การให้บริการ"]++;
      } else if (t.includes("จอดรถ") || t.includes("สถานที่") || t.includes("ห้อง") || t.includes("แอร์") || t.includes("สะอาด")) {
        tag = "สิ่งแวดล้อม/สถานที่";
        topicCounts["สิ่งแวดล้อม/สถานที่"]++;
      } else if (t.includes("อุปกรณ์") || t.includes("สื่อ") || t.includes("ไมค์") || t.includes("สไลด์")) {
        tag = "อุปกรณ์/สื่อ";
        topicCounts["อุปกรณ์/สื่อ"]++;
      } else {
        tag = "กิจกรรม/การเรียนรู้";
        topicCounts["กิจกรรม/การเรียนรู้"]++;
      }

      return {
        ...item,
        status,
        tag,
      };
    });

    const maxTopicCount = Math.max(...Object.values(topicCounts), 1);

    return {
      total: rawFeedbacks.length,
      positiveCount,
      followUpCount,
      urgentCount,
      generalCount,
      topicCounts,
      maxTopicCount,
      latestList: parsedList.slice(0, 5),
    };
  }, [filteredData]);

  const getScoreBadge = (score: number) => {
    if (score >= 4.5) return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold font-mono border border-emerald-200">EXCELLENT</span>;
    if (score >= 3.5) return <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold font-mono border border-blue-200">GOOD</span>;
    if (score >= 2.5) return <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold font-mono border border-amber-200">FAIR</span>;
    return <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-bold font-mono border border-red-200">POOR</span>;
  };

  const renderPieChart = () => {
    if (affiliationBreakdown.length === 0) return null;

    let accumulatedPercent = 0;
    return (
      <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {affiliationBreakdown.map((item, idx) => {
            const strokeDasharray = `${item.percent} ${100 - item.percent}`;
            const strokeDashoffset = -accumulatedPercent;
            accumulatedPercent += item.percent;

            return (
              <circle
                key={idx}
                cx="18"
                cy="18"
                r="15.91549430918954"
                fill="transparent"
                stroke={item.color}
                strokeWidth="4.5"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute text-center pointer-events-none">
          <p className="text-2xl font-black text-blue-900 font-mono">{filteredData.length}</p>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">TOTAL_RESPONSES</p>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen text-slate-900 antialiased flex flex-col border-t-4 border-blue-900">
      
      {/* Header Bar */}
      <header className="w-full bg-white border-b border-slate-200 px-4 md:px-8 py-3.5 shadow-sm relative">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900" />
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-900 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs sm:text-sm text-blue-950 tracking-tight leading-none">
                MAHIDOL <span className="text-amber-500 font-mono text-[10px] sm:text-xs">[RESEARCH]</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-500">Analytics Console</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              to="/"
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-900 border border-slate-300 font-mono text-xs rounded font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> PORTAL
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-mono text-xs rounded font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-5 flex-1">
        
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg text-xs font-mono flex items-center gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Dashboard Banner */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-900" />
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center p-2 shadow-md shrink-0 border border-amber-400">
              <img
                src="/Mahidol_U.jpg"
                alt="Mahidol Logo"
                className="w-full h-full object-cover rounded"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[10px] font-bold">
                REALTIME_DATA_STREAM
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                พิธีเปิดห้องการเรียนรู้ครั่งครบวงจร
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                EXECUTIVE ANALYTICS & SATISFACTION INSIGHTS
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t border-slate-100 lg:border-t-0 pt-3 lg:pt-0 font-mono text-xs">
            <div className="text-left lg:text-right">
              <div className="flex items-center gap-1.5 lg:justify-end">
                <span className={`w-2 h-2 rounded-full ${loading ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`}></span>
                <span className={`font-bold ${loading ? "text-amber-600" : "text-emerald-600"}`}>
                  {loading ? "FETCHING..." : "LIVE_CONNECTED"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">LAST_UPDATED: {lastUpdated || "Syncing..."}</p>
            </div>

            <button
              onClick={fetchData}
              disabled={loading}
              className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> REFRESH
            </button>
          </div>
        </div>

        {/* Multi-Filter Bar */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-900" />
              <span className="font-mono font-bold text-blue-900 text-xs sm:text-sm">DATA_FILTER_CONTROL</span>
            </div>
            <button
              onClick={handleResetFilter}
              className="text-slate-500 hover:text-red-600 font-mono flex items-center gap-1 text-xs transition cursor-pointer bg-slate-50 hover:bg-red-50 px-2.5 py-1 rounded border border-slate-200 hover:border-red-200 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> RESET
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-xs focus-within:border-blue-900">
                <Calendar className="w-3.5 h-3.5 text-blue-900" />
                <span className="text-slate-500 font-bold">ปี:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setSelectedMonth("ALL");
                  }}
                  className="bg-transparent text-slate-900 font-bold outline-none cursor-pointer"
                >
                  <option value="ALL">ALL_YEARS</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {Number(year) + 543} ({year})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-xs focus-within:border-blue-900">
                <Calendar className="w-3.5 h-3.5 text-blue-900" />
                <span className="text-slate-500 font-bold">เดือน:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-transparent text-slate-900 font-bold outline-none cursor-pointer"
                >
                  <option value="ALL">ALL_MONTHS</option>
                  {availableMonths.map((mIdx) => (
                    <option key={mIdx} value={mIdx.toString()}>
                      {MONTH_NAMES[mIdx]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-xs focus-within:border-blue-900">
                <UserCheck className="w-3.5 h-3.5 text-blue-900" />
                <span className="text-slate-500 font-bold">อายุ:</span>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="bg-transparent text-slate-900 font-bold outline-none cursor-pointer"
                >
                  <option value="ALL">ALL_AGES</option>
                  {ageGroupList.map((age) => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-xs focus-within:border-blue-900">
                <Building2 className="w-3.5 h-3.5 text-blue-900" />
                <span className="text-slate-500 font-bold">สังกัด:</span>
                <select
                  value={selectedAffiliation}
                  onChange={(e) => setSelectedAffiliation(e.target.value)}
                  className="bg-transparent text-slate-900 font-bold outline-none cursor-pointer max-w-[140px] truncate"
                >
                  <option value="ALL">ALL_AFFILIATIONS</option>
                  {affiliationsList.map((aff) => (
                    <option key={aff} value={aff}>{aff}</option>
                  ))}
                </select>
              </div>

            </div>

            <div className="flex items-center justify-end gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 font-mono text-xs self-start md:self-auto">
              <span className="text-slate-500">FILTERED:</span>
              <span className="text-blue-900 font-black text-sm">{filteredData.length}</span>
              <span className="text-slate-400">/ {data.length}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        {cardMetrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-900" />
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-2 font-bold border border-blue-200">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-500 font-mono font-bold">RESPONSES</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-900 font-mono">{filteredData.length}</span>
                <span className="text-xs text-slate-400 font-mono">รายการ</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-1">TOTAL_RECORDS: {data.length}</p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 font-bold border border-amber-200">
                <Star className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-500 font-mono font-bold">OVERALL_SATISFACTION</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-amber-600 font-mono">{cardMetrics.grandAvgPercent}%</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-1">CALCULATED FROM {cardMetrics.totalQuestions} METRICS</p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 font-bold border border-emerald-200">
                <Trophy className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-500 font-mono font-bold">HIGHEST_METRIC</p>
              <p className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">{cardMetrics.highest.title}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-black text-emerald-700 font-mono">{cardMetrics.highest.avg.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-mono">/ 5.00</span>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2 font-bold border border-rose-200">
                <Wrench className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-500 font-mono font-bold">NEED_IMPROVEMENT</p>
              <p className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">{cardMetrics.lowest.title}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-black text-rose-600 font-mono">{cardMetrics.lowest.avg.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-mono">/ 5.00</span>
              </div>
            </div>

          </div>
        )}

        {/* Visual Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Category Scores */}
          <div className="lg:col-span-2 bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-mono font-bold text-blue-900 tracking-wider uppercase border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              CATEGORY_SCORES_BREAKDOWN [DESCENDING]
            </h2>
            
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {categoryGroupedScores.map((catGroup, groupIdx) => (
                <div key={catGroup.category} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
                  
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        ด้าน{catGroup.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs font-mono">
                      <span className="text-[10px] text-slate-400 font-bold">AVG:</span>
                      <span className="font-black text-amber-600 text-xs sm:text-sm">
                        {catGroup.avg.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pl-1">
                    {catGroup.items.map((item, itemIdx) => {
                      const globalIdx = groupIdx * 3 + itemIdx;
                      return (
                        <div key={item.key} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-800 truncate max-w-[65%] font-medium">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-slate-900">
                                {item.avg.toFixed(2)}
                              </span>
                              {getScoreBadge(item.avg)}
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${(item.avg / 5) * 100}%`,
                                backgroundColor: COLOR_PALETTE[globalIdx % COLOR_PALETTE.length],
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Affiliation Pie Chart */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-mono font-bold text-blue-900 tracking-wider uppercase border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
              <PieChartIcon className="w-4 h-4 text-amber-500" />
              AFFILIATION_DISTRIBUTION
            </h2>
            
            {renderPieChart()}

            <div className="space-y-2 pt-2 border-t border-slate-100 max-h-[180px] overflow-y-auto pr-1">
              {affiliationBreakdown.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 truncate max-w-[70%]">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-800 truncate font-medium">{item.name}</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px] shrink-0">{item.count} คน ({item.percent}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEEDBACK & SUGGESTIONS SECTION */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          
          <div className="flex justify-between items-start sm:items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-mono flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-900" />
                FEEDBACK & SUGGESTIONS_INSIGHTS
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">วิเคราะห์ประเด็นข้อเสนอแนะและข้อคิดเห็นจากผู้เข้าร่วม</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center">
              <p className="text-2xl font-black text-blue-900 font-mono">{feedbackAnalysis.total}</p>
              <p className="text-xs font-bold text-blue-900 mt-0.5 font-mono">TOTAL_COMMENTS</p>
              <p className="text-[10px] text-blue-700/80 mt-0.5 font-mono">ข้อคิดเห็นทั้งหมด</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-center">
              <p className="text-2xl font-black text-emerald-700 font-mono">{feedbackAnalysis.positiveCount}</p>
              <p className="text-xs font-bold text-emerald-900 mt-0.5 font-mono">POSITIVE / OK</p>
              <p className="text-[10px] text-emerald-700/80 mt-0.5 font-mono">คำชื่นชม/ปกติ</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-center">
              <p className="text-2xl font-black text-amber-700 font-mono">{feedbackAnalysis.followUpCount}</p>
              <p className="text-xs font-bold text-amber-900 mt-0.5 font-mono">SUGGESTION</p>
              <p className="text-[10px] text-amber-700/80 mt-0.5 font-mono">ควรพัฒนา/ติดตาม</p>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-center">
              <p className="text-2xl font-black text-rose-700 font-mono">{feedbackAnalysis.urgentCount}</p>
              <p className="text-xs font-bold text-rose-900 mt-0.5 font-mono">URGENT</p>
              <p className="text-[10px] text-rose-700/80 mt-0.5 font-mono">ควรแก้ไขทันที</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-mono font-bold text-blue-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Tag className="w-3.5 h-3.5 text-amber-500" />
                TOPIC_CATEGORIZATION
              </h3>
              
              <div className="space-y-3 pt-1">
                {Object.entries(feedbackAnalysis.topicCounts).map(([topic, count]) => {
                  const percent = Math.round((count / feedbackAnalysis.maxTopicCount) * 100);
                  return (
                    <div key={topic} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-800">{topic}</span>
                        <span className="font-mono font-bold text-slate-900">{count} เรื่อง</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-900 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-mono font-bold text-blue-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                LATEST_FEEDBACKS
              </h3>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {feedbackAnalysis.latestList.length === 0 ? (
                  <p className="text-xs text-slate-400 font-mono py-6 text-center">NO_FEEDBACK_AVAILABLE</p>
                ) : (
                  feedbackAnalysis.latestList.map((item, idx) => {
                    const statusBadges = {
                      positive: { bg: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3 text-emerald-600 inline mr-1" />, text: "POSITIVE" },
                      followup: { bg: "bg-amber-100 text-amber-800 border-amber-200", icon: <AlertTriangle className="w-3 h-3 text-amber-600 inline mr-1" />, text: "SUGGESTION" },
                      urgent: { bg: "bg-rose-100 text-rose-800 border-rose-200", icon: <AlertCircle className="w-3 h-3 text-rose-600 inline mr-1" />, text: "URGENT" },
                      general: { bg: "bg-blue-100 text-blue-800 border-blue-200", icon: <Search className="w-3 h-3 text-blue-600 inline mr-1" />, text: "GENERAL" },
                    };

                    const statusStyle = statusBadges[item.status];

                    return (
                      <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 text-xs space-y-1.5 shadow-2xs">
                        <p className="text-slate-800 font-medium leading-relaxed">"{item.text}"</p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                            [{item.tag}]
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${statusStyle.bg}`}>
                            {statusStyle.icon}
                            {statusStyle.text}
                          </span>
                          <span className="text-[10px] text-slate-400 ml-auto font-mono">
                            {item.affiliation}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer System Info */}
      <footer className="py-4 text-center border-t border-slate-200 font-mono text-[10px] text-slate-400 bg-white">
        MAHIDOL_SUSTAINABILITY_2026 // DASHBOARD_CONSOLE
      </footer>

    </div>
  );
}

export default DashboardPage;


