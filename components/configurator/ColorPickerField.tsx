"use client";

import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import SettingRow from "./SettingRow";

interface ColorPickerFieldProps {
  label: string;
  settingKey?: string;
  value: string;
  onChange: (value: string) => void;
}

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

export default function ColorPickerField({
  label,
  settingKey,
  value,
  onChange,
}: ColorPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(value);
  const popoverRef = useRef<HTMLDivElement>(null);
  const swatchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHexInput(value);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        swatchRef.current &&
        !swatchRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleHexChange = (newVal: string) => {
    setHexInput(newVal);
    if (HEX_REGEX.test(newVal)) onChange(newVal);
  };

  return (
    <SettingRow label={label} settingKey={settingKey}>
      <div className="relative flex items-center gap-3">
        <button
          ref={swatchRef}
          onClick={() => setOpen((o) => !o)}
          className="w-8 h-8 rounded-md border border-[#2a2a2a] cursor-pointer shrink-0 transition-all hover:border-[#00ff9f]/50 hover:scale-105"
          style={{ backgroundColor: value }}
          aria-label="Pick color"
        />
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          onBlur={() => {
            if (!HEX_REGEX.test(hexInput)) setHexInput(value);
          }}
          className="w-24 px-2 py-1.5 bg-[#111111] border border-[#2a2a2a] rounded text-sm font-mono text-[#e5e5e5] focus:border-[#00ff9f]/50 focus:outline-none transition-colors"
          maxLength={7}
          spellCheck={false}
        />

        {open && (
          <div
            ref={popoverRef}
            className="absolute left-0 top-10 z-50 flex flex-col gap-3 p-3 rounded-xl border border-[#2a2a2a] bg-[#111111] shadow-2xl"
          >
            <style>{`
              .react-colorful { width: 200px !important; }
              .react-colorful__saturation { border-radius: 8px 8px 0 0 !important; height: 150px !important; }
              .react-colorful__hue { height: 12px !important; border-radius: 6px !important; margin-top: 10px; }
              .react-colorful__saturation-pointer,
              .react-colorful__hue-pointer { width: 16px !important; height: 16px !important; border: 2px solid #fff !important; box-shadow: 0 0 0 1px rgba(0,0,0,0.4) !important; }
            `}</style>
            <HexColorPicker color={value} onChange={onChange} />
            <div className="flex items-center gap-2 pt-1 border-t border-[#2a2a2a]">
              <div
                className="w-6 h-6 rounded shrink-0 border border-[#2a2a2a]"
                style={{ backgroundColor: value }}
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                onBlur={() => {
                  if (!HEX_REGEX.test(hexInput)) setHexInput(value);
                }}
                className="flex-1 px-2 py-1 bg-[#0d0d0d] border border-[#2a2a2a] rounded text-sm font-mono text-[#e5e5e5] focus:border-[#00ff9f]/50 focus:outline-none transition-colors"
                maxLength={7}
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>
    </SettingRow>
  );
}
