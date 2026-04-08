import {
  ScanLine,
  ShieldCheck,
  Route,
  BadgeCheck,
  Building2,
  Link2,
  MapPin,
  FileText,
  Globe,
  Lock,
} from "lucide-react";
import { AnimatedGeometricBackground } from "./AnimatedGeometricBackground";

const features = [
  {
    icon: <ScanLine className="w-4 h-4 text-slate-600" />,
    title: "AI-powered ID scanning",
    description:
      "Scan government-issued IDs and automatically extract accurate visitor data without manual input.",
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-slate-600" />,
    title: "Identity verification",
    description:
      "Verify visitor identity instantly using ID scans, reducing impersonation risks and unauthorized access.",
  },
  {
    icon: <Route className="w-4 h-4 text-slate-600" />,
    title: "Customizable sign-in flows",
    description:
      "Create tailored check-in processes for different visitor types, departments, and security requirements.",
  },
  {
    icon: <BadgeCheck className="w-4 h-4 text-slate-600" />,
    title: "Branded visitor badges",
    description:
      "Automatically print badges with visitor photo, host details, time-in, and optional QR codes.",
  },
  {
    icon: <Building2 className="w-4 h-4 text-slate-600" />,
    title: "Department-based access control",
    description:
      "Each department manages its visitors independently with strict data separation and controlled visibility.",
  },
  {
    icon: <Link2 className="w-4 h-4 text-slate-600" />,
    title: "Security Integrations",
    description:
      "Integrate with access control systems, QR scanners, and smart entry points for seamless facility security.",
  },
  {
    icon: <MapPin className="w-4 h-4 text-slate-600" />,
    title: "Real-time visitor tracking",
    description:
      "Track who is currently in your building, their location, and total visit duration in real time.",
  },
  {
    icon: <FileText className="w-4 h-4 text-slate-600" />,
    title: "Visitor audit trail",
    description:
      "Maintain structured, searchable visitor logs with accurate timestamps for audits, reviews, and investigations.",
  },
  {
    icon: <Globe className="w-4 h-4 text-slate-600" />,
    title: "Multi-branch management",
    description:
      "Manage visitor activity across multiple locations with centralized control and branch-level visibility.",
  },
  {
    icon: <Lock className="w-4 h-4 text-slate-600" />,
    title: "Compliance & NDPR",
    description:
      "Built with NDPR-aware data handling, encrypted storage, and configurable retention for regulatory compliance.",
  },
];

export function EnterpriseFeaturesSection() {
  return (
    <section
      id="features"
      className="bg-white relative overflow-hidden border-y border-[#e8e8e8]"
    >
      <AnimatedGeometricBackground />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative z-10">
        <div className="max-w-xl mb-24">
          <p className="text-sm text-slate-500 mb-6 font-medium">
            VisiChek Enterprise Features
          </p>
          <h2 className="font-serif text-4xl md:text-[44px] leading-tight mb-12 text-[#4a4a4a]">
            VisiChek enterprise-level features to keep your workplace secure
          </h2>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-sm">
            Say goodbye to your manual logbook and hello a new way of managing
            visitors in your building.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-start group"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#f8f9fa] border border-slate-100 flex items-center justify-center mb-5 shadow-sm transition-transform group-hover:scale-105">
                {feature.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-slate-800 mb-2.5">
                {feature.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed pr-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
