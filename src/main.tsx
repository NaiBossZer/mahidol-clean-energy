import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import { CleanEnergyPortal } from "./routes/index";
import { LoginPage } from "./routes/login";
import { DashboardPage } from "./routes/dashboard";
import { SurveyPage } from "./routes/survey";
import EVGuideAndBookingPage from "./routes/ev";
function App() { return <BrowserRouter><Routes><Route path="/" element={<CleanEnergyPortal />} /><Route path="/login" element={<LoginPage />} /><Route path="/dashboard" element={<DashboardPage />} /><Route path="/survey" element={<SurveyPage />} /><Route path="/ev" element={<EVGuideAndBookingPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter>; }
createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);

