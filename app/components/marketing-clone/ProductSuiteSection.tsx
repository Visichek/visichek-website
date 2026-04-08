import { cn } from "@/lib/utils";

interface UserRole {
  title: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
}

const roles: UserRole[] = [
  {
    title: "Receptionists",
    description: "Check visitors in faster with automatic ID capture",
    bullets: [
      "AI scans Nigerian IDs in 5 seconds",
      "Auto-fills name, photo",
      "Prints temporary badge instantly",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A9615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Department Admins",
    description: "Know when expected visitors arrive instantly",
    bullets: [
      "Real-time arrival notifications",
      "Pre-log expected appointments",
      "View department visitor history",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A9615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Security Teams",
    description: "Track movement and confirm exit across the facility",
    bullets: [
      "See who is inside in real time",
      "Track check-in to check-out time",
      "Flag unverified or overstay visitors",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A9615" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 6v6c0 5.52 3.42 10.44 8 12 4.58-1.56 8-6.48 8-12V6l-8-4Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function RoleCard({ role }: { role: UserRole }) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-[#3A9615]/20 bg-white p-6",
        "transition-transform duration-200 hover:scale-[1.02]"
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#3A9615]/30">
        {role.icon}
      </div>
      <h3 className="text-lg font-bold text-[#222222]">{role.title}</h3>
      <p className="mt-1 text-sm text-[#6B7280]">{role.description}</p>
      <ul className="mt-4 space-y-2">
        {role.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-[#4B5563]">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-[#3A9615]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductSuiteSection() {
  return (
    <section className="bg-transparent px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <RoleCard key={role.title} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
