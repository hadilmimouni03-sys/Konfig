"use client";

import { use, useState } from "react";
import { useConfigStore } from "@/lib/store/config-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import ColorsTab from "@/components/configurator/ColorsTab";
import FontTab from "@/components/configurator/FontTab";
import ShortcutsTab from "@/components/configurator/ShortcutsTab";
import WindowTab from "@/components/configurator/WindowTab";
import PerformanceTab from "@/components/configurator/PerformanceTab";
import ShellTab from "@/components/configurator/ShellTab";
import TerminalPreview from "@/components/configurator/TerminalPreview";
import ConfigOutput from "@/components/configurator/ConfigOutput";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Eye } from "lucide-react";
import { toast } from "sonner";
import NotFoundTerminal from "@/components/configurator/NotFoundTerminal";

const SUPPORTED_TERMINALS = ["kitty"];

export default function ConfigurePage({
  params,
}: {
  params: Promise<{ terminal: string }>;
}) {
  const { terminal } = use(params);
  const { resetToDefaults, beginnerMode, setBeginnerMode } = useConfigStore();
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  if (!SUPPORTED_TERMINALS.includes(terminal)) {
    return <NotFoundTerminal terminal={terminal} />;
  }

  const handleReset = () => {
    resetToDefaults();
    toast.success("Reset to defaults!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#888888] hover:text-[#e5e5e5] transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-5 w-px bg-[#2a2a2a]" />
            <h1 className="text-sm font-mono">
              <span className="text-[#00ff9f] font-bold">Konfig</span>
              <span className="text-[#555555] mx-1">/</span>
              <span className="text-[#e5e5e5]">{terminal}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888888]">Beginner</span>
              <Switch
                checked={beginnerMode}
                onCheckedChange={setBeginnerMode}
                className="data-[state=checked]:bg-[#00ff9f]"
              />
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#888888] hover:text-[#e5e5e5] border border-[#2a2a2a] rounded-lg hover:border-[#3a3a3a] transition-all"
            >
              <RotateCcw size={12} />
              Reset All
            </button>
            {/* Mobile preview toggle */}
            <button
              onClick={() => setShowPreviewMobile(!showPreviewMobile)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#00ff9f] border border-[#00ff9f]/30 rounded-lg hover:bg-[#00ff9f]/10 transition-all"
            >
              <Eye size={12} />
              Preview
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] mx-auto w-full">
        {/* Left: Settings panel */}
        <div
          className={`w-full md:w-1/2 lg:w-[55%] overflow-y-auto border-r border-[#2a2a2a] ${
            showPreviewMobile ? "hidden md:block" : ""
          }`}
          style={{ maxHeight: "calc(100vh - 57px)" }}
        >
          <div className="p-6">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="w-full bg-transparent border-b border-[#2a2a2a] rounded-none h-auto p-0 mb-8 flex flex-wrap gap-0">
                {[
                  { value: "colors", label: "Colors" },
                  { value: "font", label: "Font" },
                  { value: "shortcuts", label: "Shortcuts" },
                  { value: "window", label: "Window" },
                  { value: "performance", label: "Performance" },
                  { value: "shell", label: "Shell" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm text-[#888888] data-[state=active]:text-[#00ff9f] data-[state=active]:border-[#00ff9f] data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-[#e5e5e5] transition-all"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="colors"><ColorsTab /></TabsContent>
              <TabsContent value="font"><FontTab /></TabsContent>
              <TabsContent value="shortcuts"><ShortcutsTab /></TabsContent>
              <TabsContent value="window"><WindowTab /></TabsContent>
              <TabsContent value="performance"><PerformanceTab /></TabsContent>
              <TabsContent value="shell"><ShellTab /></TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right: Preview panel */}
        <div
          className={`w-full md:w-1/2 lg:w-[45%] overflow-y-auto ${
            !showPreviewMobile ? "hidden md:block" : ""
          }`}
          style={{ maxHeight: "calc(100vh - 57px)" }}
        >
          <div className="sticky top-0 p-6 space-y-6">
            <TerminalPreview />
            <ConfigOutput />
          </div>
        </div>
      </div>
    </div>
  );
}
