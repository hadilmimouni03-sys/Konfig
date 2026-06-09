"use client";

import { useConfigStore } from "@/lib/store/config-store";
import { sliderValue } from "@/lib/slider-utils";
import SettingRow from "./SettingRow";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

export default function WindowTab() {
  const {
    config,
    setWindowPadding,
    setWindowMargin,
    setBackgroundOpacity,
    setWindowDecorations,
    setInitialWidth,
    setInitialHeight,
    setResizeDebounce,
    setHideDecorationsOnTile,
    resetSection,
    beginnerMode,
  } = useConfigStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Window & Layout</h3>
        <button
          onClick={() => resetSection("window")}
          className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#e5e5e5] transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <SettingRow
        label={`Window Padding — ${config.window.window_padding_width}px`}
        settingKey="window_padding_width"
      >
        <Slider
          value={[config.window.window_padding_width]}
          onValueChange={(v) => setWindowPadding(sliderValue(v))}
          min={0}
          max={40}
          step={1}
          className="w-full"
        />
      </SettingRow>

      {!beginnerMode && (
        <SettingRow
          label={`Window Margin — ${config.window.window_margin_width}px`}
          settingKey="window_margin_width"
        >
          <Slider
            value={[config.window.window_margin_width]}
            onValueChange={(v) => setWindowMargin(sliderValue(v))}
            min={0}
            max={40}
            step={1}
            className="w-full"
          />
        </SettingRow>
      )}

      <SettingRow
        label={`Background Opacity — ${config.window.background_opacity.toFixed(2)}`}
        settingKey="background_opacity"
      >
        <Slider
          value={[config.window.background_opacity]}
          onValueChange={(v) => setBackgroundOpacity(sliderValue(v))}
          min={0.1}
          max={1.0}
          step={0.05}
          className="w-full"
        />
      </SettingRow>

      <SettingRow label="Window Decorations" settingKey="window_decorations">
        <Select
          value={config.window.window_decorations}
          onValueChange={(v) => v && setWindowDecorations(v)}
        >
          <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value="full">Full</SelectItem>
            <SelectItem value="titlebar-only">Titlebar Only</SelectItem>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="no-titlebar">No Titlebar</SelectItem>
          </SelectContent>
        </Select>
      </SettingRow>

      <div className="grid grid-cols-2 gap-4">
        <SettingRow label="Initial Width (cols)" settingKey="initial_window_width">
          <Input
            type="number"
            value={config.window.initial_window_width}
            onChange={(e) => setInitialWidth(Number(e.target.value) || 80)}
            min={40}
            max={500}
            className="h-9 bg-[#111111] border-[#2a2a2a] text-sm"
          />
        </SettingRow>
        <SettingRow label="Initial Height (rows)" settingKey="initial_window_height">
          <Input
            type="number"
            value={config.window.initial_window_height}
            onChange={(e) => setInitialHeight(Number(e.target.value) || 24)}
            min={10}
            max={200}
            className="h-9 bg-[#111111] border-[#2a2a2a] text-sm"
          />
        </SettingRow>
      </div>

      {!beginnerMode && (
        <>
          <SettingRow
            label={`Resize Debounce — ${config.window.resize_debounce_time}ms`}
            settingKey="resize_debounce_time"
          >
            <Slider
              value={[config.window.resize_debounce_time]}
              onValueChange={(v) => setResizeDebounce(sliderValue(v))}
              min={0}
              max={500}
              step={10}
              className="w-full"
            />
          </SettingRow>

          <SettingRow
            label="Hide decorations when tiled"
            settingKey="hide_window_decorations_on_tile"
          >
            <Switch
              checked={config.window.hide_window_decorations_on_tile}
              onCheckedChange={setHideDecorationsOnTile}
            />
          </SettingRow>
        </>
      )}
    </div>
  );
}
