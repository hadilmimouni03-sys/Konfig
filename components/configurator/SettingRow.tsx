"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { SETTING_DESCRIPTIONS } from "@/lib/terminals/kitty/schema";

interface SettingRowProps {
  label: string;
  settingKey?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SettingRow({
  label,
  settingKey,
  description,
  children,
  className = "",
}: SettingRowProps) {
  const tooltip = description || (settingKey && SETTING_DESCRIPTIONS[settingKey]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-[#e5e5e5]">{label}</label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger
              render={<Info size={14} className="text-[#555555] hover:text-[#888888] cursor-help transition-colors" />}
            />
            <TooltipContent
              side="top"
              className="max-w-xs bg-[#1a1a1a] border-[#2a2a2a] text-[#cccccc] text-xs"
            >
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}
