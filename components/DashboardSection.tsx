import GBPOptimizationSequence from "./DashboardVisual";

export default function DashboardSection() {
  return (
    <section className="bg-[#000f1d] py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
            What Optimization Looks Like
          </h2>

          {/* Subhead */}
          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed max-w-2xl">
            Here&apos;s exactly what we do when we take over a Google Business Profile:
            four concrete improvements that move the needle on local rankings.
          </p>
        </div>

        <GBPOptimizationSequence />
      </div>
    </section>
  );
}
