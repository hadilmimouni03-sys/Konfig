export interface KittyColors {
  foreground: string;
  background: string;
  selection_foreground: string;
  selection_background: string;
  cursor: string;
  cursor_text_color: string;
  url_color: string;
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color13: string;
  color14: string;
  color15: string;
}

export type CursorStyle = "block" | "beam" | "underline";

export interface KittyFontSettings {
  font_family: string;
  font_size: number;
  bold_font: string;
  italic_font: string;
  bold_italic_font: string;
  disable_ligatures: "never" | "cursor" | "always";
  adjust_line_height: number;
  adjust_column_width: number;
  box_drawing_scale: string;
}

export interface KittyShortcut {
  id: string;
  action: string;
  key: string;
  isCustom?: boolean;
}

export interface KittyWindowSettings {
  window_padding_width: number;
  window_margin_width: number;
  background_opacity: number;
  window_decorations: "full" | "titlebar-only" | "none" | "no-titlebar";
  initial_window_width: number;
  initial_window_height: number;
  resize_debounce_time: number;
  hide_window_decorations_on_tile: boolean;
}

export interface KittyPerformanceSettings {
  repaint_delay: number;
  input_delay: number;
  sync_to_monitor: boolean;
  enable_audio_bell: boolean;
  visual_bell_duration: number;
  mouse_hide_wait: number;
  copy_on_select: boolean;
  focus_follows_mouse: boolean;
  scrollback_lines: number;
  open_url_with: string;
}

export interface KittyShellSettings {
  shell: string;
  editor: string;
  shell_integration: string[];
  startup_session: string;
  close_on_child_death: boolean;
}

export interface KittyConfig {
  colors: KittyColors;
  cursor_style: CursorStyle;
  font: KittyFontSettings;
  shortcuts: KittyShortcut[];
  window: KittyWindowSettings;
  performance: KittyPerformanceSettings;
  shell: KittyShellSettings;
  activePreset: string;
}

export interface TerminalInfo {
  id: string;
  name: string;
  description: string;
  available: boolean;
  icon: string;
}
