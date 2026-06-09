"use client";

import { useConfigStore } from "@/lib/store/config-store";
import { FONT_OPTIONS } from "@/lib/terminals/kitty/schema";
import { sliderValue } from "@/lib/slider-utils";
import SettingRow from "./SettingRow";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

export default function FontTab() {
  const {
    config,
    setFontFamily,
    setFontSize,
    setBoldFont,
    setItalicFont,
    setLineHeight,
    setColumnWidth,
    resetSection,
    beginnerMode,
  } = useConfigStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Font & Text</h3>
        <button
          onClick={() => resetSection("font")}
          className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#e5e5e5] transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <SettingRow label="Font Family" settingKey="font_family">
        <Select value={config.font.font_family} onValueChange={(v) => v && setFontFamily(v)}>
          <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SettingRow>

      <SettingRow label={`Font Size — ${config.font.font_size}pt`} settingKey="font_size">
        <Slider
          value={[config.font.font_size]}
          onValueChange={(v) => setFontSize(sliderValue(v))}
          min={8}
          max={32}
          step={1}
          className="w-full"
        />
      </SettingRow>

      <SettingRow label="Bold Font" settingKey="bold_font">
        <Select value={config.font.bold_font} onValueChange={(v) => v && setBoldFont(v)}>
          <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value="auto">Auto</SelectItem>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SettingRow>

      <SettingRow label="Italic Font" settingKey="italic_font">
        <Select value={config.font.italic_font} onValueChange={(v) => v && setItalicFont(v)}>
          <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value="auto">Auto</SelectItem>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SettingRow>

      <SettingRow
        label={`Line Height — ${config.font.adjust_line_height.toFixed(1)}`}
        settingKey="adjust_line_height"
      >
        <Slider
          value={[config.font.adjust_line_height]}
          onValueChange={(v) => setLineHeight(sliderValue(v))}
          min={0.8}
          max={2.0}
          step={0.1}
          className="w-full"
        />
      </SettingRow>

      {!beginnerMode && (
        <SettingRow
          label={`Letter Spacing — ${config.font.adjust_column_width}`}
          settingKey="adjust_column_width"
        >
          <Slider
            value={[config.font.adjust_column_width]}
            onValueChange={(v) => setColumnWidth(sliderValue(v))}
            min={-2}
            max={4}
            step={1}
            className="w-full"
          />
        </SettingRow>
      )}
    </div>
  );
}
