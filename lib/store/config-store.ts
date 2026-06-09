"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KittyConfig, KittyColors, KittyShortcut, CursorStyle } from "@/lib/types";
import { defaultConfig } from "@/lib/terminals/kitty/schema";
import { getPresetById } from "@/lib/terminals/kitty/presets";

interface ConfigStore {
  config: KittyConfig;
  beginnerMode: boolean;

  // Color actions
  setColor: (key: keyof KittyColors, value: string) => void;
  setAllColors: (colors: KittyColors) => void;
  setCursorStyle: (style: CursorStyle) => void;

  // Font actions
  setFontFamily: (family: string) => void;
  setFontSize: (size: number) => void;
  setBoldFont: (font: string) => void;
  setItalicFont: (font: string) => void;
  setLineHeight: (height: number) => void;
  setColumnWidth: (width: number) => void;
  setBoxDrawingScale: (scale: string) => void;

  // Shortcut actions
  setShortcutKey: (id: string, key: string) => void;
  addShortcut: (shortcut: KittyShortcut) => void;
  removeShortcut: (id: string) => void;
  resetShortcut: (id: string) => void;

  // Window actions
  setWindowPadding: (value: number) => void;
  setWindowMargin: (value: number) => void;
  setBackgroundOpacity: (value: number) => void;
  setWindowDecorations: (value: string) => void;
  setInitialWidth: (value: number) => void;
  setInitialHeight: (value: number) => void;
  setResizeDebounce: (value: number) => void;
  setHideDecorationsOnTile: (value: boolean) => void;

  // Performance actions
  setRepaintDelay: (value: number) => void;
  setInputDelay: (value: number) => void;
  setSyncToMonitor: (value: boolean) => void;
  setEnableAudioBell: (value: boolean) => void;
  setVisualBellDuration: (value: number) => void;
  setMouseHideWait: (value: number) => void;
  setCopyOnSelect: (value: boolean) => void;
  setFocusFollowsMouse: (value: boolean) => void;
  setScrollbackLines: (value: number) => void;
  setOpenUrlWith: (value: string) => void;

  // Shell actions
  setShell: (value: string) => void;
  setEditor: (value: string) => void;
  setShellIntegration: (flags: string[]) => void;
  setStartupSession: (value: string) => void;
  setCloseOnChildDeath: (value: boolean) => void;

  // Preset actions
  applyPreset: (presetId: string) => void;

  // Global actions
  setBeginnerMode: (value: boolean) => void;
  resetToDefaults: () => void;
  resetSection: (section: string) => void;
  importConfig: (config: KittyConfig) => void;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      config: { ...defaultConfig },
      beginnerMode: true,

      // Colors
      setColor: (key, value) =>
        set((state) => ({
          config: {
            ...state.config,
            colors: { ...state.config.colors, [key]: value },
            activePreset: "custom",
          },
        })),
      setAllColors: (colors) =>
        set((state) => ({
          config: { ...state.config, colors },
        })),
      setCursorStyle: (style) =>
        set((state) => ({
          config: { ...state.config, cursor_style: style },
        })),

      // Font
      setFontFamily: (family) =>
        set((state) => ({
          config: {
            ...state.config,
            font: { ...state.config.font, font_family: family },
          },
        })),
      setFontSize: (size) =>
        set((state) => ({
          config: {
            ...state.config,
            font: { ...state.config.font, font_size: size },
          },
        })),
      setBoldFont: (font) =>
        set((state) => ({
          config: {
            ...state.config,
            font: { ...state.config.font, bold_font: font },
          },
        })),
      setItalicFont: (font) =>
        set((state) => ({
          config: {
            ...state.config,
            font: { ...state.config.font, italic_font: font },
          },
        })),
      setLineHeight: (height) =>
        set((state) => ({
          config: {
            ...state.config,
            font: { ...state.config.font, adjust_line_height: height },
          },
        })),
      setColumnWidth: (width) =>
        set((state) => ({
          config: {
            ...state.config,
            font: { ...state.config.font, adjust_column_width: width },
          },
        })),
      setBoxDrawingScale: (scale) =>
        set((state) => ({
          config: {
            ...state.config,
            font: { ...state.config.font, box_drawing_scale: scale },
          },
        })),

      // Shortcuts
      setShortcutKey: (id, key) =>
        set((state) => ({
          config: {
            ...state.config,
            shortcuts: state.config.shortcuts.map((s) =>
              s.id === id ? { ...s, key } : s
            ),
          },
        })),
      addShortcut: (shortcut) =>
        set((state) => ({
          config: {
            ...state.config,
            shortcuts: [...state.config.shortcuts, shortcut],
          },
        })),
      removeShortcut: (id) =>
        set((state) => ({
          config: {
            ...state.config,
            shortcuts: state.config.shortcuts.filter((s) => s.id !== id),
          },
        })),
      resetShortcut: (id) => {
        const defaultShortcut = defaultConfig.shortcuts.find((s) => s.id === id);
        if (defaultShortcut) {
          set((state) => ({
            config: {
              ...state.config,
              shortcuts: state.config.shortcuts.map((s) =>
                s.id === id ? { ...defaultShortcut } : s
              ),
            },
          }));
        }
      },

      // Window
      setWindowPadding: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: { ...state.config.window, window_padding_width: value },
          },
        })),
      setWindowMargin: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: { ...state.config.window, window_margin_width: value },
          },
        })),
      setBackgroundOpacity: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: { ...state.config.window, background_opacity: value },
          },
        })),
      setWindowDecorations: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: {
              ...state.config.window,
              window_decorations: value as KittyConfig["window"]["window_decorations"],
            },
          },
        })),
      setInitialWidth: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: { ...state.config.window, initial_window_width: value },
          },
        })),
      setInitialHeight: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: { ...state.config.window, initial_window_height: value },
          },
        })),
      setResizeDebounce: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: { ...state.config.window, resize_debounce_time: value },
          },
        })),
      setHideDecorationsOnTile: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            window: { ...state.config.window, hide_window_decorations_on_tile: value },
          },
        })),

      // Performance
      setRepaintDelay: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, repaint_delay: value },
          },
        })),
      setInputDelay: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, input_delay: value },
          },
        })),
      setSyncToMonitor: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, sync_to_monitor: value },
          },
        })),
      setEnableAudioBell: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, enable_audio_bell: value },
          },
        })),
      setVisualBellDuration: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, visual_bell_duration: value },
          },
        })),
      setMouseHideWait: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, mouse_hide_wait: value },
          },
        })),
      setCopyOnSelect: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, copy_on_select: value },
          },
        })),
      setFocusFollowsMouse: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, focus_follows_mouse: value },
          },
        })),
      setScrollbackLines: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, scrollback_lines: value },
          },
        })),
      setOpenUrlWith: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            performance: { ...state.config.performance, open_url_with: value },
          },
        })),

      // Shell
      setShell: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            shell: { ...state.config.shell, shell: value },
          },
        })),
      setEditor: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            shell: { ...state.config.shell, editor: value },
          },
        })),
      setShellIntegration: (flags) =>
        set((state) => ({
          config: {
            ...state.config,
            shell: { ...state.config.shell, shell_integration: flags },
          },
        })),
      setStartupSession: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            shell: { ...state.config.shell, startup_session: value },
          },
        })),
      setCloseOnChildDeath: (value) =>
        set((state) => ({
          config: {
            ...state.config,
            shell: { ...state.config.shell, close_on_child_death: value },
          },
        })),

      // Presets
      applyPreset: (presetId) => {
        const preset = getPresetById(presetId);
        if (preset) {
          set((state) => ({
            config: {
              ...state.config,
              colors: { ...preset.colors },
              activePreset: presetId,
            },
          }));
        }
      },

      // Global
      setBeginnerMode: (value) => set({ beginnerMode: value }),
      resetToDefaults: () =>
        set({ config: { ...defaultConfig, shortcuts: [...defaultConfig.shortcuts] } }),
      resetSection: (section) => {
        const current = get().config;
        switch (section) {
          case "colors":
            set({
              config: {
                ...current,
                colors: { ...defaultConfig.colors },
                cursor_style: defaultConfig.cursor_style,
                activePreset: defaultConfig.activePreset,
              },
            });
            break;
          case "font":
            set({ config: { ...current, font: { ...defaultConfig.font } } });
            break;
          case "shortcuts":
            set({
              config: {
                ...current,
                shortcuts: [...defaultConfig.shortcuts],
              },
            });
            break;
          case "window":
            set({
              config: { ...current, window: { ...defaultConfig.window } },
            });
            break;
          case "performance":
            set({
              config: {
                ...current,
                performance: { ...defaultConfig.performance },
              },
            });
            break;
          case "shell":
            set({
              config: { ...current, shell: { ...defaultConfig.shell } },
            });
            break;
        }
      },
      importConfig: (config) => set({ config }),
    }),
    {
      name: "konfig-kitty-config",
    }
  )
);
