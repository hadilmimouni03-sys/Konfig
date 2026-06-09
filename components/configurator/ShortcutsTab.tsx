"use client";

import { useState } from "react";
import { useConfigStore } from "@/lib/store/config-store";
import { DEFAULT_SHORTCUTS } from "@/lib/terminals/kitty/schema";
import { RotateCcw, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const SHORTCUT_REGEX = /^[a-z0-9_+]+$/i;

export default function ShortcutsTab() {
  const { config, setShortcutKey, addShortcut, removeShortcut, resetShortcut, resetSection } =
    useConfigStore();
  const [newAction, setNewAction] = useState("");
  const [newKey, setNewKey] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const handleAddShortcut = () => {
    const cleanAction = newAction.replace(/[^\w\s-]/g, "").trim();
    const cleanKey = newKey.replace(/[^\w+]/g, "").trim();
    if (!cleanAction || !cleanKey) return;
    if (!SHORTCUT_REGEX.test(cleanKey)) return;

    addShortcut({
      id: `custom_${Date.now()}`,
      action: cleanAction,
      key: cleanKey,
      isCustom: true,
    });
    setNewAction("");
    setNewKey("");
    setShowAdd(false);
  };

  const handleKeyEdit = (id: string, value: string) => {
    const clean = value.replace(/[^\w+]/g, "");
    setShortcutKey(id, clean);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
        <button
          onClick={() => resetSection("shortcuts")}
          className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#e5e5e5] transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 px-3 py-2 text-xs text-[#555555] font-medium">
          <span>Action</span>
          <span>Shortcut</span>
          <span className="w-16" />
        </div>

        {/* Shortcuts */}
        {config.shortcuts.map((shortcut) => {
          const isDefault = DEFAULT_SHORTCUTS.find((d) => d.id === shortcut.id);
          const isModified =
            isDefault && isDefault.key !== shortcut.key;

          return (
            <div
              key={shortcut.id}
              className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center px-3 py-2 rounded-lg hover:bg-[#111111] transition-colors group"
            >
              <span className="text-sm text-[#cccccc]">{shortcut.action}</span>
              <Input
                value={shortcut.key}
                onChange={(e) => handleKeyEdit(shortcut.id, e.target.value)}
                className={`h-8 bg-[#111111] border-[#2a2a2a] text-sm font-mono focus:border-[#00ff9f]/50 ${
                  isModified ? "text-[#00ff9f]" : "text-[#e5e5e5]"
                }`}
                spellCheck={false}
              />
              <div className="flex items-center gap-1 w-16">
                {isDefault && isModified && (
                  <button
                    onClick={() => resetShortcut(shortcut.id)}
                    className="p-1 text-[#555555] hover:text-[#e5e5e5] transition-colors"
                    title="Reset to default"
                  >
                    <RotateCcw size={12} />
                  </button>
                )}
                {shortcut.isCustom && (
                  <button
                    onClick={() => removeShortcut(shortcut.id)}
                    className="p-1 text-[#555555] hover:text-[#ff4444] transition-colors"
                    title="Remove shortcut"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add custom shortcut */}
      {showAdd ? (
        <div className="p-4 rounded-lg bg-[#111111] border border-[#2a2a2a] space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#888888] mb-1 block">Action name</label>
              <Input
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g. Open editor"
                className="h-8 bg-[#0d0d0d] border-[#2a2a2a] text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-[#888888] mb-1 block">Key combo</label>
              <Input
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="e.g. ctrl+shift+e"
                className="h-8 bg-[#0d0d0d] border-[#2a2a2a] text-sm font-mono"
                spellCheck={false}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddShortcut}
              className="px-3 py-1.5 bg-[#00ff9f] text-[#0d0d0d] text-xs font-medium rounded-md hover:bg-[#00e68a] transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAdd(false);
                setNewAction("");
                setNewKey("");
              }}
              className="px-3 py-1.5 text-[#888888] text-xs hover:text-[#e5e5e5] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 text-sm text-[#00ff9f] hover:text-[#00e68a] transition-colors"
        >
          <Plus size={14} />
          Add custom shortcut
        </button>
      )}
    </div>
  );
}
