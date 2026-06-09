import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TerminalInfo } from "@/lib/types";

const terminals: TerminalInfo[] = [
  {
    id: "kitty",
    name: "Kitty",
    description:
      "GPU-accelerated terminal emulator with advanced features and extensive customization.",
    available: true,
    icon: "🐱",
  },
  {
    id: "alacritty",
    name: "Alacritty",
    description:
      "A fast, cross-platform, OpenGL terminal emulator focused on simplicity and performance.",
    available: false,
    icon: "🚀",
  },
  {
    id: "wezterm",
    name: "WezTerm",
    description:
      "GPU-accelerated terminal with Lua configuration and multiplexing built-in.",
    available: false,
    icon: "⚡",
  },
  {
    id: "ghostty",
    name: "Ghostty",
    description:
      "A fast, feature-rich terminal emulator that uses platform-native UI.",
    available: false,
    icon: "👻",
  },
];

export default function TerminalGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Pick your terminal
        </h2>
        <p className="text-[#888888] text-center mb-16 text-lg">
          Select the terminal you want to configure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {terminals.map((terminal) =>
            terminal.available ? (
              <Link
                key={terminal.id}
                href={`/configure/${terminal.id}`}
                className="group p-6 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00ff9f]/50 transition-all duration-150 glow-accent-hover cursor-pointer"
              >
                <span className="text-4xl mb-4 block">{terminal.icon}</span>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00ff9f] transition-colors">
                  {terminal.name}
                </h3>
                <p className="text-sm text-[#888888] mb-4 leading-relaxed">
                  {terminal.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-[#00ff9f]">
                  Build Config →
                </span>
              </Link>
            ) : (
              <div
                key={terminal.id}
                className="p-6 rounded-xl bg-[#1a1a1a]/50 border border-[#2a2a2a]/50 opacity-60 cursor-not-allowed"
              >
                <span className="text-4xl mb-4 block grayscale">
                  {terminal.icon}
                </span>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#666666]">
                    {terminal.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-[#2a2a2a] text-[#666666] border-none"
                  >
                    Coming Soon
                  </Badge>
                </div>
                <p className="text-sm text-[#555555] leading-relaxed">
                  {terminal.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
