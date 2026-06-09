"use client";

import Link from "next/link";

interface NotFoundTerminalProps {
  terminal: string;
}

export default function NotFoundTerminal({ terminal }: NotFoundTerminalProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold mb-4">
          Terminal not found
        </h1>
        <p className="text-[#888888] mb-2">
          We don&apos;t have a config builder for{" "}
          <span className="text-[#e5e5e5] font-mono">&quot;{terminal}&quot;</span> yet.
        </p>
        <p className="text-[#888888] mb-8">
          Right now we support <span className="text-[#00ff9f] font-semibold">Kitty</span>, with more terminals coming soon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/configure/kitty"
            className="px-6 py-3 bg-[#00ff9f] text-[#0d0d0d] font-semibold rounded-lg hover:bg-[#00e68a] transition-all text-sm"
          >
            Try Kitty Config Builder
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-[#2a2a2a] rounded-lg text-sm text-[#888888] hover:text-[#e5e5e5] hover:border-[#3a3a3a] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
