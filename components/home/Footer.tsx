import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#00ff9f] font-bold text-lg font-mono">
            Konfig
          </span>
          <span className="text-[#888888] text-sm">
            — terminal config builder
          </span>
        </div>
        <a
          href="https://github.com/ChakerBelhadjAmor/Konfig"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#888888] hover:text-[#e5e5e5] transition-colors text-sm"
        >
          <Code2 size={16} />
          GitHub
        </a>
      </div>
      {/*
        REQUIRED BY LICENSE — DO NOT REMOVE OR MODIFY.
        See LICENSE file for full attribution requirements.
      */}
      <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-[#2a2a2a]">
        <p className="text-[#888888] text-sm text-center">
          © 2026 Konfig —{" "}
          <a
            href="https://konfig-alpha.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e5e5e5] transition-colors"
          >
            konfig.app
          </a>
        </p>
      </div>
    </footer>
  );
}
