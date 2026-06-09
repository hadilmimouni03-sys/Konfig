import Link from "next/link";

export default function Hero() {
  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,159,0.05)_0%,transparent_70%)]" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <p
          className="text-4xl md:text-5xl font-bold font-mono mb-4 tracking-widest"
          style={{
            background: "linear-gradient(to right, rgba(229, 229, 229, 0.75) 0%, rgba(229, 229, 229, 0.75) 40%, rgba(0, 255, 159, 0.75) 69%, rgba(0, 255, 159, 0.75) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Konfig
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Terminal configs,{" "}
          <span className="text-[#00ff9f]">made simple.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#888888] max-w-2xl mx-auto mb-10 leading-relaxed">
          Konfig is a visual config builder for your terminal. Pick your colors,
          fonts, shortcuts, and settings — then download a ready-to-use config
          file in seconds. No docs, no guesswork.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/configure/kitty"
            className="px-8 py-3.5 bg-[#00ff9f] text-[#0d0d0d] font-semibold rounded-lg hover:bg-[#00e68a] transition-all duration-150 glow-accent-hover text-base"
          >
            Start Building
          </Link>
          <button
            onClick={scrollToHowItWorks}
            className="px-8 py-3.5 border border-[#2a2a2a] text-[#e5e5e5] font-medium rounded-lg hover:border-[#00ff9f]/50 hover:text-[#00ff9f] transition-all duration-150 text-base"
          >
            See how it works
          </button>
        </div>
      </div>
    </section>
  );
}
