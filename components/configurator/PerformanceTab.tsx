"use client";

import { useConfigStore } from "@/lib/store/config-store";
import { sliderValue } from "@/lib/slider-utils";
import SettingRow from "./SettingRow";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

export default function PerformanceTab() {
  const {
    config,
    setRepaintDelay,
    setInputDelay,
    setSyncToMonitor,
    setEnableAudioBell,
    setVisualBellDuration,
    setMouseHideWait,
    setCopyOnSelect,
    setFocusFollowsMouse,
    setScrollbackLines,
    setOpenUrlWith,
    resetSection,
    beginnerMode,
  } = useConfigStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Performance & Behavior</h3>
        <button
          onClick={() => resetSection("performance")}
          className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#e5e5e5] transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {!beginnerMode && (
        <>
          <SettingRow
            label={`Repaint Delay — ${config.performance.repaint_delay}ms`}
            settingKey="repaint_delay"
          >
            <Slider
              value={[config.performance.repaint_delay]}
              onValueChange={(v) => setRepaintDelay(sliderValue(v))}
              min={2}
              max={100}
              step={1}
              className="w-full"
            />
          </SettingRow>

          <SettingRow
            label={`Input Delay — ${config.performance.input_delay}ms`}
            settingKey="input_delay"
          >
            <Slider
              value={[config.performance.input_delay]}
              onValueChange={(v) => setInputDelay(sliderValue(v))}
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
          </SettingRow>

          <SettingRow label="Sync to Monitor" settingKey="sync_to_monitor">
            <Switch
              checked={config.performance.sync_to_monitor}
              onCheckedChange={setSyncToMonitor}
            />
          </SettingRow>
        </>
      )}

      <SettingRow label="Audio Bell" settingKey="enable_audio_bell">
        <Switch
          checked={config.performance.enable_audio_bell}
          onCheckedChange={setEnableAudioBell}
        />
      </SettingRow>

      {!beginnerMode && (
        <SettingRow
          label={`Visual Bell Duration — ${config.performance.visual_bell_duration.toFixed(1)}s`}
          settingKey="visual_bell_duration"
        >
          <Slider
            value={[config.performance.visual_bell_duration]}
            onValueChange={(v) => setVisualBellDuration(sliderValue(v))}
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
        </SettingRow>
      )}

      {!beginnerMode && (
        <SettingRow
          label={`Mouse Hide Wait — ${config.performance.mouse_hide_wait.toFixed(1)}s`}
          settingKey="mouse_hide_wait"
        >
          <Slider
            value={[config.performance.mouse_hide_wait]}
            onValueChange={(v) => setMouseHideWait(sliderValue(v))}
            min={0}
            max={10}
            step={0.5}
            className="w-full"
          />
        </SettingRow>
      )}

      <SettingRow label="Copy on Select" settingKey="copy_on_select">
        <Switch
          checked={config.performance.copy_on_select}
          onCheckedChange={setCopyOnSelect}
        />
      </SettingRow>

      {!beginnerMode && (
        <SettingRow label="Focus Follows Mouse" settingKey="focus_follows_mouse">
          <Switch
            checked={config.performance.focus_follows_mouse}
            onCheckedChange={setFocusFollowsMouse}
          />
        </SettingRow>
      )}

      <SettingRow
        label={`Scrollback Lines — ${config.performance.scrollback_lines.toLocaleString()}`}
        settingKey="scrollback_lines"
      >
        <Slider
          value={[config.performance.scrollback_lines]}
          onValueChange={(v) => setScrollbackLines(sliderValue(v))}
          min={100}
          max={100000}
          step={100}
          className="w-full"
        />
      </SettingRow>

      {!beginnerMode && (
        <SettingRow label="URL Open Action" settingKey="open_url_with">
          <Select
            value={config.performance.open_url_with}
            onValueChange={(v) => v && setOpenUrlWith(v)}
          >
            <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
              <SelectItem value="default">Default Browser</SelectItem>
              <SelectItem value="xdg-open">xdg-open</SelectItem>
              <SelectItem value="open">open (macOS)</SelectItem>
            </SelectContent>
          </Select>
        </SettingRow>
      )}
    </div>
  );
}
