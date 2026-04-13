"use client";

import Link from "next/link";
import { RevealWrapper } from "./BillingAutomationSection";
import CardSwap, { Card } from "@/components/ui/card-swap";

/* ─── Data ─── */

interface VisitorRow {
  initials: string;
  name: string;
  company: string;
  duration: string;
  status: "Active" | "Departed" | "Expected";
  color: string;
}

const liveVisitors: VisitorRow[] = [
  { initials: "AO", name: "Adebayo Oluwaseun", company: "Tech Solutions Ltd", duration: "1h 20m", status: "Active", color: "bg-blue-100 text-blue-700" },
  { initials: "CS", name: "Chioma Solesi", company: "Rubix Consulting", duration: "2h 19m", status: "Active", color: "bg-purple-100 text-purple-700" },
  { initials: "OB", name: "Oletus Balogun", company: "Net-Serve Solutions", duration: "3h 15m", status: "Departed", color: "bg-green-100 text-green-700" },
  { initials: "FA", name: "Fatima Abubakar", company: "Industrial Petroleum", duration: "—", status: "Expected", color: "bg-orange-100 text-orange-700" },
];

const auditRows = [
  { time: "2:45 PM", event: "Check-out", visitor: "O. Balogun", dept: "HR", method: "Manual" },
  { time: "2:15 PM", event: "Check-in", visitor: "A. Oluwaseun", dept: "Marketing", method: "QR Scan" },
  { time: "1:30 PM", event: "Check-in", visitor: "C. Solesi", dept: "Security", method: "ID Scan" },
  { time: "11:25 AM", event: "Check-in", visitor: "O. Balogun", dept: "HR", method: "QR Scan" },
  { time: "10:00 AM", event: "Check-out", visitor: "K. Musa", dept: "IT", method: "Auto" },
];

const departmentStats = [
  { dept: "Marketing", active: 3, today: 12, avg: "45m" },
  { dept: "HR", active: 1, today: 8, avg: "1h 10m" },
  { dept: "Legal", active: 0, today: 4, avg: "2h 05m" },
  { dept: "Security", active: 2, today: 15, avg: "30m" },
  { dept: "Finance", active: 0, today: 6, avg: "55m" },
];

/* ─── Mini cards ─── */

function StatusBadge({ status }: { status: VisitorRow["status"] }) {
  const s = { Active: "text-green-700 bg-green-100", Departed: "text-gray-500 bg-gray-100", Expected: "text-amber-700 bg-amber-100" };
  return <span className={`text-[10px] font-semibold px-2 py-[2px] rounded-full whitespace-nowrap ${s[status]}`}>{status}</span>;
}

function LiveVisitorsCard() {
  return (
    <div className="h-full w-full bg-white rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8e8]">
        <p className="font-semibold text-[13px] text-[#2a2a2a]">Live Visitors</p>
        <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-[2px] rounded-full">3 Active</span>
      </div>
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-[#fafafa]">
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Visitor</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Company</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Duration</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {liveVisitors.map((v) => (
            <tr key={v.name}>
              <td className="px-3 py-2 border-b border-gray-50">
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0 ${v.color}`}>{v.initials}</div>
                  <span className="text-[10px] font-medium text-[#2a2a2a] truncate max-w-[100px]">{v.name}</span>
                </div>
              </td>
              <td className="px-3 py-2 border-b border-gray-50 text-[#6a6a6a] text-[10px] truncate max-w-[90px]">{v.company}</td>
              <td className="px-3 py-2 border-b border-gray-50 text-[#6a6a6a] text-[10px]">{v.duration}</td>
              <td className="px-3 py-2 border-b border-gray-50"><StatusBadge status={v.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AuditLogCard() {
  return (
    <div className="h-full w-full bg-white rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8e8]">
        <p className="font-semibold text-[13px] text-[#2a2a2a]">Activity Log</p>
        <button className="text-[10px] font-medium bg-gray-100 text-[#4a4a4a] px-2.5 py-1 rounded-full">Export CSV</button>
      </div>
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-[#fafafa]">
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Time</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Event</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Visitor</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Dept</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Method</th>
          </tr>
        </thead>
        <tbody>
          {auditRows.map((r, i) => (
            <tr key={i}>
              <td className="px-3 py-2 border-b border-gray-50 text-[#6a6a6a] text-[10px]">{r.time}</td>
              <td className="px-3 py-2 border-b border-gray-50">
                <span className={`text-[9px] font-semibold px-1.5 py-[2px] rounded-full ${r.event === "Check-in" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{r.event}</span>
              </td>
              <td className="px-3 py-2 border-b border-gray-50 font-medium text-[#2a2a2a] text-[10px]">{r.visitor}</td>
              <td className="px-3 py-2 border-b border-gray-50 text-[#6a6a6a] text-[10px]">{r.dept}</td>
              <td className="px-3 py-2 border-b border-gray-50 text-[#6a6a6a] text-[10px]">{r.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DepartmentOverviewCard() {
  return (
    <div className="h-full w-full bg-white rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8e8]">
        <p className="font-semibold text-[13px] text-[#2a2a2a]">Department Overview</p>
        <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-[2px] rounded-full">Today</span>
      </div>
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-[#fafafa]">
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Department</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Active</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Total</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-400">Avg. Stay</th>
          </tr>
        </thead>
        <tbody>
          {departmentStats.map((d) => (
            <tr key={d.dept}>
              <td className="px-3 py-2.5 border-b border-gray-50 font-medium text-[#2a2a2a] text-[10px]">{d.dept}</td>
              <td className="px-3 py-2.5 border-b border-gray-50">
                {d.active > 0
                  ? <span className="text-[9px] font-semibold bg-green-100 text-green-700 px-1.5 py-[2px] rounded-full">{d.active}</span>
                  : <span className="text-[10px] text-gray-400">0</span>}
              </td>
              <td className="px-3 py-2.5 border-b border-gray-50 text-[#6a6a6a] text-[10px]">{d.today}</td>
              <td className="px-3 py-2.5 border-b border-gray-50 text-[#6a6a6a] text-[10px]">{d.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Section ─── */

export function InvoicingSection() {
  return (
    <div className="feature-block bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <RevealWrapper>
          <p className="text-xs font-semibold text-[#6a6a6a] tracking-[0.05em]">
            Live presence tracking
          </p>
          <h2 className="font-serif text-4xl md:text-[42px] leading-tight tracking-[-0.02em] text-[#2a2a2a] mt-3 mb-5">
            See who is inside your
            <br />
            building at any moment
          </h2>
          <p className="text-[15px] text-[#6a6a6a] leading-relaxed mb-6">
            Track visitor sessions from entry to exit with searchable logs
            designed for security reviews and operational reporting.
          </p>
          <ul className="space-y-2.5 mb-8">
            {[
              "Monitor active visitors currently inside your facility",
              "Review complete visit histories when needed",
              "Export visitor activity for audits or investigations",
              "Maintain structured records aligned with compliance expectations",
            ].map((item) => (
              <li
                key={item}
                className="relative pl-5 text-sm text-[#4a4a4a] leading-relaxed before:content-['\2013'] before:absolute before:left-0 before:text-green-600 before:font-bold"
              >
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-1.5 bg-green-700 text-white text-[13.5px] font-semibold px-[22px] py-2.5 rounded-[20px] hover:bg-green-800 active:scale-[0.97] transition-all duration-150"
          >
            Join waitlist
          </Link>
        </RevealWrapper>

        <RevealWrapper delay={100} className="hidden md:block">
          <div className="relative hidden md:block h-[420px] w-full">
            <CardSwap
              width={420}
              height={320}
              cardDistance={40}
              verticalDistance={50}
              delay={4000}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
            >
              <Card customClass="!bg-white !border-[#e8e8e8] p-0 overflow-hidden">
                <LiveVisitorsCard />
              </Card>
              <Card customClass="!bg-white !border-[#e8e8e8] p-0 overflow-hidden">
                <AuditLogCard />
              </Card>
              <Card customClass="!bg-white !border-[#e8e8e8] p-0 overflow-hidden">
                <DepartmentOverviewCard />
              </Card>
            </CardSwap>
          </div>
        </RevealWrapper>
      </div>
    </div>
  );
}
