import { BookOpen, Eye, Sparkles, Save } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "No more digging through docs",
    description:
      "Every setting is explained in plain English, right next to the control.",
  },
  {
    icon: Eye,
    title: "Live preview",
    description:
      "See exactly how your terminal will look before you commit to anything.",
  },
  {
    icon: Sparkles,
    title: "Beginner friendly",
    description:
      "Sensible defaults, tooltips on everything, and a beginner mode that hides the complex stuff.",
  },
  {
    icon: Save,
    title: "Your work is saved",
    description:
      "Settings persist in your browser automatically. Export them as JSON anytime.",
  },
];

export default function WhyKonfig() {
  return (
    <section className="py-24 px-6 bg-[#111111]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Konfig?
        </h2>
        <p className="text-[#888888] text-center mb-16 text-lg">
          Built for people who want things to just work.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00ff9f]/30 transition-all duration-150 group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00ff9f]/10 text-[#00ff9f] mb-4 group-hover:bg-[#00ff9f]/20 transition-all duration-150">
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-[#888888] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
