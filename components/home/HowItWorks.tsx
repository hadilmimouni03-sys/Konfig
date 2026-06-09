import { Monitor, Palette, Download } from "lucide-react";

const steps = [
  {
    icon: Monitor,
    title: "Choose your terminal",
    description:
      "Select the terminal you use. We support Kitty now, with more coming soon.",
  },
  {
    icon: Palette,
    title: "Customize visually",
    description:
      "Tweak colors, fonts, shortcuts and behavior using simple controls. See your changes live as you make them.",
  },
  {
    icon: Download,
    title: "Download your config",
    description:
      "Hit download and get a clean, ready-to-use config file. Drop it in the right folder and you're done.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How it works
        </h2>
        <p className="text-[#888888] text-center mb-16 text-lg">
          Three steps. No terminal experience required.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative p-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00ff9f]/30 transition-all duration-150 group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#00ff9f]/10 text-[#00ff9f] mb-5 group-hover:bg-[#00ff9f]/20 transition-all duration-150">
                <step.icon size={24} />
              </div>
              <span className="absolute top-6 right-6 text-5xl font-bold text-[#1a1a1a] group-hover:text-[#222222] transition-colors">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-[#888888] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
