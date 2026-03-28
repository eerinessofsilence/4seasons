import Benefits from "@/components/home/Benefits";
import Coverage from "@/components/home/Coverage";
import Hero from "@/components/home/Hero";
import Network from "@/components/home/Network";
import Plans from "@/components/home/Plans";
import Support from "@/components/home/Support";

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,oklch(100%_0_0/0.085),transparent_22%),radial-gradient(circle_at_82%_28%,oklch(58%_0_0/0.12),transparent_24%),radial-gradient(circle_at_68%_72%,oklch(100%_0_0/0.06),transparent_26%),radial-gradient(circle_at_24%_88%,oklch(46%_0_0/0.08),transparent_24%)]" />
        <div className="absolute -top-40 -left-32 h-112 w-md rounded-full bg-[radial-gradient(circle,oklch(100%_0_0/0.12)_0%,transparent_72%)] blur-[110px]" />
        <div className="absolute top-136 -right-40 h-120 w-120 rounded-full bg-[radial-gradient(circle,oklch(58%_0_0/0.12)_0%,transparent_70%)] blur-[120px]" />
        <div className="absolute bottom-56 left-1/2 h-136 w-136 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(100%_0_0/0.08)_0%,transparent_74%)] blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Network />
        <Benefits />
        <Plans />
        <Coverage />
        <Support />
      </div>
    </div>
  );
}
