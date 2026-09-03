import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, ArrowLeft, GraduationCap, ShieldAlert, KeyRound } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ENLP2517") {
      sessionStorage.setItem("dashboard_auth", "true");
      navigate("/dashboard");
    } else {
      setError("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen text-slate-900 antialiased flex flex-col justify-between border-t-4 border-blue-900">
      
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
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-500">Sopprab-Phalat</span>
            </div>
          </div>

          <Link 
            to="/"
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-900 border border-slate-300 font-mono text-xs rounded font-semibold transition shadow-xs flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> MAIN_PORTAL
          </Link>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl max-w-md w-full space-y-6 relative overflow-hidden">
          
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-900" />

          {/* Header Tag & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 font-mono text-[11px] text-blue-900 font-bold shadow-xs">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              AUTHENTICATION_GATEWAY
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              เข้าสู่ระบบ Dashboard
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              กรุณากรอกรหัสผ่านเพื่อเข้าชมระบบสรุปผลข้อมูล
            </p>
          </div>

          {/* Form Area */}
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-blue-900 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                // ACCESS_CODE
              </label>
              <input
                type="password"
                placeholder="กรอกรหัสผ่านที่นี่..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-900 text-sm font-mono outline-none text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-sans bg-slate-50/50 focus:bg-white"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-xs font-mono font-semibold">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-amber-400 border border-blue-950 font-mono font-bold text-xs shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 fill-amber-400 text-amber-400" />
              VERIFY_CREDENTIALS
            </button>
          </form>

          {/* Back Navigation Footer */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-blue-900 font-semibold transition-colors py-1 px-2 rounded hover:bg-slate-50"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              RETURN_TO_HOMEPAGE
            </Link>
          </div>

        </div>
      </main>

      {/* Footer System Info */}
      <footer className="py-4 text-center border-t border-slate-100 font-mono text-[10px] text-slate-400">
        MAHIDOL_SUSTAINABILITY_2026 // SECURE_NODE
      </footer>

    </div>
  );
}

export default LoginPage;


