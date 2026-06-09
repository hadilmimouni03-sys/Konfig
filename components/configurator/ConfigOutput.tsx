"use client";

import { useMemo, useRef } from "react";
import { useConfigStore } from "@/lib/store/config-store";
import { generateKittyConf } from "@/lib/terminals/kitty/generator";
import { Copy, Download, Upload, FileDown } from "lucide-react";
import { toast } from "sonner";
import { saveAs } from "file-saver";

export default function ConfigOutput() {
  const { config, importConfig } = useConfigStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const configText = useMemo(() => generateKittyConf(config), [config]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configText);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownloadConf = () => {
    const blob = new Blob([configText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "kitty.conf");
    toast.success("Downloaded kitty.conf!");
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    saveAs(blob, "konfig-settings.json");
    toast.success("Settings exported!");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.colors && parsed.font && parsed.shortcuts) {
          importConfig(parsed);
          toast.success("Settings imported!");
        } else {
          toast.error("Invalid settings file");
        }
      } catch {
        toast.error("Failed to parse file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Simple syntax highlighting
  const highlightedLines = configText.split("\n").map((line, i) => {
    if (line.startsWith("#")) {
      return (
        <span key={i} className="text-[#555555]">
          {line}
          {"\n"}
        </span>
      );
    }
    const match = line.match(/^(\S+)\s+(.*)$/);
    if (match) {
      return (
        <span key={i}>
          <span className="text-[#7dcfff]">{match[1]}</span>
          <span className="text-[#e5e5e5]"> </span>
          <span className="text-[#9ece6a]">{match[2]}</span>
          {"\n"}
        </span>
      );
    }
    return (
      <span key={i}>
        {line}
        {"\n"}
      </span>
    );
  });

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs font-medium text-[#e5e5e5] hover:border-[#00ff9f]/50 hover:text-[#00ff9f] transition-all duration-150"
        >
          <Copy size={12} />
          Copy
        </button>
        <button
          onClick={handleDownloadConf}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#00ff9f] text-[#0d0d0d] rounded-lg text-xs font-semibold hover:bg-[#00e68a] transition-all duration-150"
        >
          <Download size={12} />
          Download kitty.conf
        </button>
        <button
          onClick={handleExportJSON}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs font-medium text-[#e5e5e5] hover:border-[#00ff9f]/50 hover:text-[#00ff9f] transition-all duration-150"
        >
          <FileDown size={12} />
          Export JSON
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs font-medium text-[#e5e5e5] hover:border-[#00ff9f]/50 hover:text-[#00ff9f] transition-all duration-150"
        >
          <Upload size={12} />
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          className="hidden"
        />
      </div>

      {/* Config preview */}
      <div className="rounded-xl bg-[#111111] border border-[#2a2a2a] overflow-hidden">
        <div className="px-4 py-2 border-b border-[#2a2a2a] flex items-center justify-between">
          <span className="text-xs text-[#555555] font-mono">kitty.conf</span>
        </div>
        <pre className="p-4 text-xs font-mono overflow-auto max-h-[400px] leading-relaxed">
          {highlightedLines}
        </pre>
      </div>
    </div>
  );
}
