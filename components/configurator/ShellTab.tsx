"use client";

import { useConfigStore } from "@/lib/store/config-store";
import {
  SHELL_OPTIONS,
  EDITOR_OPTIONS,
  SHELL_INTEGRATION_OPTIONS,
} from "@/lib/terminals/kitty/schema";
import SettingRow from "./SettingRow";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

export default function ShellTab() {
  const {
    config,
    setShell,
    setEditor,
    setShellIntegration,
    setStartupSession,
    setCloseOnChildDeath,
    resetSection,
    beginnerMode,
  } = useConfigStore();

  const toggleIntegrationFlag = (flag: string) => {
    const current = config.shell.shell_integration;
    if (current.includes(flag)) {
      setShellIntegration(current.filter((f) => f !== flag));
    } else {
      setShellIntegration([...current, flag]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Shell & Startup</h3>
        <button
          onClick={() => resetSection("shell")}
          className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#e5e5e5] transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <SettingRow label="Shell" settingKey="shell">
        <Select value={config.shell.shell} onValueChange={(v) => v && setShell(v)}>
          <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value=".">System Default</SelectItem>
            {SHELL_OPTIONS.map((shell) => (
              <SelectItem key={shell} value={shell}>
                {shell}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SettingRow>

      <SettingRow label="Editor" settingKey="editor">
        <Select value={config.shell.editor} onValueChange={(v) => v && setEditor(v)}>
          <SelectTrigger className="bg-[#111111] border-[#2a2a2a] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            <SelectItem value=".">System Default</SelectItem>
            {EDITOR_OPTIONS.map((editor) => (
              <SelectItem key={editor} value={editor}>
                {editor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SettingRow>

      {!beginnerMode && (
        <>
          <SettingRow
            label="Shell Integration (disable features)"
            settingKey="shell_integration"
          >
            <div className="grid grid-cols-2 gap-3">
              {SHELL_INTEGRATION_OPTIONS.map((flag) => (
                <div key={flag} className="flex items-center gap-2">
                  <Checkbox
                    id={`shell-int-${flag}`}
                    checked={config.shell.shell_integration.includes(flag)}
                    onCheckedChange={() => toggleIntegrationFlag(flag)}
                    className="border-[#2a2a2a] data-[state=checked]:bg-[#00ff9f] data-[state=checked]:border-[#00ff9f]"
                  />
                  <label
                    htmlFor={`shell-int-${flag}`}
                    className="text-sm text-[#cccccc] cursor-pointer"
                  >
                    {flag}
                  </label>
                </div>
              ))}
            </div>
          </SettingRow>

          <SettingRow label="Startup Session" settingKey="startup_session">
            <Input
              value={config.shell.startup_session}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\w./~-]/g, "");
                setStartupSession(val);
              }}
              placeholder="none"
              className="h-9 bg-[#111111] border-[#2a2a2a] text-sm font-mono"
            />
          </SettingRow>

          <SettingRow label="Close on Child Death" settingKey="close_on_child_death">
            <Switch
              checked={config.shell.close_on_child_death}
              onCheckedChange={setCloseOnChildDeath}
            />
          </SettingRow>
        </>
      )}
    </div>
  );
}
