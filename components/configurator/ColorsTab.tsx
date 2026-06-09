"use client";

import { useConfigStore } from "@/lib/store/config-store";
import { presets } from "@/lib/terminals/kitty/presets";
import { ANSI_COLOR_LABELS, BEGINNER_HIDDEN_SETTINGS } from "@/lib/terminals/kitty/schema";
import { KittyColors } from "@/lib/types";
import ColorPickerField from "./ColorPickerField";
import SettingRow from "./SettingRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

export default function ColorsTab() {
  const {
    config,
    setColor,
    setCursorStyle,
    applyPreset,
    resetSection,
    beginnerMode,
  } = useConfigStore();

  const normalColors = ["color0", "color1", "color2", "color3", "color4", "color5", "color6", "color7"] as const;
  const brightColors = ["color8", "color9", "color10", "color11", "color12", "color13", "color14", "color15"] as const;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Colors & Theme</h3>
        <button
          onClick={() => resetSection("colors")}
          className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#e5e5e5] transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Preset selector */}
      <SettingRow label="Theme Preset">
        <div className="grid grid-cols-3 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150 ${
                config.activePreset === preset.id
                  ? "border-[#00ff9f] bg-[#00ff9f]/10 text-[#00ff9f]"
                  : "border-[#2a2a2a] bg-[#111111] text-[#888888] hover:border-[#3a3a3a] hover:text-[#e5e5e5]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full border border-[#2a2a2a]"
                  style={{ backgroundColor: preset.colors.background }}
                />
                <div
                  className="w-3 h-3 rounded-full border border-[#2a2a2a]"
                  style={{ backgroundColor: preset.colors.color4 }}
                />
                <div
                  className="w-3 h-3 rounded-full border border-[#2a2a2a]"
                  style={{ backgroundColor: preset.colors.color2 }}
                />
              </div>
              {preset.name}
            </button>
          ))}
          <button
            onClick={() =>
              useConfigStore.setState((s) => ({
                config: { ...s.config, activePreset: "custom" },
              }))
            }
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150 ${
              config.activePreset === "custom"
                ? "border-[#00ff9f] bg-[#00ff9f]/10 text-[#00ff9f]"
                : "border-[#2a2a2a] bg-[#111111] text-[#888888] hover:border-[#3a3a3a] hover:text-[#e5e5e5]"
            }`}
          >
            Custom
          </button>
        </div>
      </SettingRow>

      {/* Main colors */}
      <div className="grid grid-cols-2 gap-4">
        <ColorPickerField
          label="Background"
          settingKey="background"
          value={config.colors.background}
          onChange={(v) => setColor("background", v)}
        />
        <ColorPickerField
          label="Foreground"
          settingKey="foreground"
          value={config.colors.foreground}
          onChange={(v) => setColor("foreground", v)}
        />
      </div>

      {/* Cursor */}
      <div className="grid grid-cols-2 gap-4">
        <ColorPickerField
          label="Cursor"
          settingKey="cursor"
          value={config.colors.cursor}
          onChange={(v) => setColor("cursor", v)}
        />
        <SettingRow label="Cursor Style" settingKey="cursor_style">
          <Select
            value={config.cursor_style}
            onValueChange={(v) => v && setCursorStyle(v as "block" | "beam" | "underline")}
          >
            <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
              <SelectItem value="block">Block</SelectItem>
              <SelectItem value="beam">Beam</SelectItem>
              <SelectItem value="underline">Underline</SelectItem>
            </SelectContent>
          </Select>
        </SettingRow>
      </div>

      {/* Selection & URL (hidden in beginner mode) */}
      {(!beginnerMode || !BEGINNER_HIDDEN_SETTINGS.includes("selection_foreground")) && (
        <>
          {!beginnerMode && (
            <div className="grid grid-cols-2 gap-4">
              <ColorPickerField
                label="Selection FG"
                settingKey="selection_foreground"
                value={config.colors.selection_foreground}
                onChange={(v) => setColor("selection_foreground", v)}
              />
              <ColorPickerField
                label="Selection BG"
                settingKey="selection_background"
                value={config.colors.selection_background}
                onChange={(v) => setColor("selection_background", v)}
              />
            </div>
          )}
          {!beginnerMode && (
            <div className="grid grid-cols-2 gap-4">
              <ColorPickerField
                label="Cursor Text"
                settingKey="cursor_text_color"
                value={config.colors.cursor_text_color}
                onChange={(v) => setColor("cursor_text_color", v)}
              />
              <ColorPickerField
                label="URL Color"
                settingKey="url_color"
                value={config.colors.url_color}
                onChange={(v) => setColor("url_color", v)}
              />
            </div>
          )}
        </>
      )}

      {/* ANSI Colors Grid */}
      <div>
        <h4 className="text-sm font-medium text-[#888888] mb-4">Normal Colors</h4>
        <div className="grid grid-cols-4 gap-3">
          {normalColors.map((key) => (
            <ColorPickerField
              key={key}
              label={ANSI_COLOR_LABELS[key]}
              value={config.colors[key as keyof KittyColors]}
              onChange={(v) => setColor(key as keyof KittyColors, v)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[#888888] mb-4">Bright Colors</h4>
        <div className="grid grid-cols-4 gap-3">
          {brightColors.map((key) => (
            <ColorPickerField
              key={key}
              label={ANSI_COLOR_LABELS[key]}
              value={config.colors[key as keyof KittyColors]}
              onChange={(v) => setColor(key as keyof KittyColors, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
