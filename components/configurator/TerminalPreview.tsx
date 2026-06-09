"use client";

import { useConfigStore } from "@/lib/store/config-store";

export default function TerminalPreview() {
  const { config } = useConfigStore();
  const { colors, cursor_style, font, window: win } = config;

  const bgColor = colors.background;
  const fgColor = colors.foreground;
  const padding = win.window_padding_width;
  const opacity = win.background_opacity;

  // Parse hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const cursorElement = () => {
    const cursorColor = colors.cursor;
    switch (cursor_style) {
      case "block":
        return (
          <span
            className="cursor-blink inline-block"
            style={{
              backgroundColor: cursorColor,
              width: "0.6em",
              height: "1.15em",
              verticalAlign: "text-bottom",
            }}
          />
        );
      case "beam":
        return (
          <span
            className="cursor-blink inline-block"
            style={{
              backgroundColor: cursorColor,
              width: "2px",
              height: "1.15em",
              verticalAlign: "text-bottom",
            }}
          />
        );
      case "underline":
        return (
          <span
            className="cursor-blink inline-block"
            style={{
              backgroundColor: cursorColor,
              width: "0.6em",
              height: "2px",
              verticalAlign: "text-bottom",
            }}
          />
        );
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a2a2a] shadow-2xl">
      {/* Title bar */}
      <div
        className="flex items-center px-4 py-2.5"
        style={{ backgroundColor: colors.color0 || "#1a1a1a" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span
          className="flex-1 text-center text-xs font-mono"
          style={{ color: colors.color8 || "#666666" }}
        >
          kitty — bash
        </span>
        <div className="w-[52px]" />
      </div>

      {/* Terminal body */}
      <div
        className="overflow-hidden"
        style={{
          backgroundColor: hexToRgba(bgColor, opacity),
          padding: `${padding}px`,
          fontFamily: `"${font.font_family}", monospace`,
          fontSize: `${font.font_size}px`,
          letterSpacing: font.adjust_column_width ? `${font.adjust_column_width}px` : undefined,
          color: fgColor,
          minHeight: "260px",
        }}
      >
        <pre className="whitespace-pre-wrap text-[0.85em]" style={{ fontFamily: "inherit", lineHeight: font.adjust_line_height }}>
          <span style={{ color: colors.color2 }}>user@hostname</span>
          <span style={{ color: fgColor }}> </span>
          <span style={{ color: colors.color3 }}>~</span>
          <span style={{ color: fgColor }}> $ </span>
          <span style={{ color: fgColor }}>ls -la</span>
          {"\n"}
          <span style={{ color: fgColor }}>drwxr-xr-x  5 user staff   160 Mar 12 14:22 </span>
          <span style={{ color: colors.color4 }}>.</span>
          {"\n"}
          <span style={{ color: fgColor }}>drwxr-xr-x  8 user staff   256 Mar 10 09:15 </span>
          <span style={{ color: colors.color4 }}>..</span>
          {"\n"}
          <span style={{ color: fgColor }}>-rw-r--r--  1 user staff  1234 Mar 11 18:43 </span>
          <span style={{ color: colors.color8 }}>.zshrc</span>
          {"\n"}
          <span style={{ color: fgColor }}>drwxr-xr-x  3 user staff    96 Mar 12 14:21 </span>
          <span style={{ color: colors.color4 }}>Documents</span>
          {"\n"}
          <span style={{ color: fgColor }}>drwxr-xr-x  2 user staff    64 Mar 08 11:30 </span>
          <span style={{ color: colors.color4 }}>Downloads</span>
          {"\n"}
          <span style={{ color: colors.color2 }}>user@hostname</span>
          <span style={{ color: fgColor }}> </span>
          <span style={{ color: colors.color3 }}>~</span>
          <span style={{ color: fgColor }}> $ </span>
          <span style={{ color: fgColor }}>echo &quot;Hello from Konfig!&quot;</span>
          {"\n"}
          <span style={{ color: colors.color2 }}>Hello from Konfig!</span>
          {"\n"}
          <span style={{ color: colors.color2 }}>user@hostname</span>
          <span style={{ color: fgColor }}> </span>
          <span style={{ color: colors.color3 }}>~</span>
          <span style={{ color: fgColor }}> $ </span>
          {cursorElement()}
        </pre>
      </div>
    </div>
  );
}
