import { cn } from "@/lib/utils";

interface BenefitCard {
  metric: string;
  icon: React.ReactNode;
}

const benefits: BenefitCard[] = [
  {
    metric: "Instant export for NDPR and internal compliance reviews",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3A9615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M12 18v-6" />
        <path d="M9 15l3 3 3-3" />
      </svg>
    ),
  },
  {
    metric: "100% searchable visitor records",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3A9615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    metric: "Faster front-desk screening with fewer manual handoffs",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3A9615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 6v6c0 5.52 3.42 10.44 8 12 4.58-1.56 8-6.48 8-12V6l-8-4Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[#3A9615]">
            Measured operational improvements
          </p>
          <h2 className="font-sans text-[32px] md:text-[40px] font-bold leading-tight text-[#222222]">
            What changes when you use VisiChek
          </h2>
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.metric}
              className={cn(
                "relative overflow-hidden rounded-2xl bg-[#EDF4EF] p-8",
                "transition-transform duration-200 hover:scale-[1.02]"
              )}
            >
              <div className="mb-6">
                {benefit.icon}
              </div>
              <p className="text-xl font-bold leading-snug text-[#222222]">
                {benefit.metric}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
