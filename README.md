# Konfig

A dark-themed visual config generator for the Kitty terminal emulator. Built for beginners.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /page.tsx                         — Landing / home page
  /configure/[terminal]/page.tsx    — Config builder (e.g., /configure/kitty)
/components
  /home/                            — Landing page sections
    Hero.tsx
    HowItWorks.tsx
    WhyKonfig.tsx
    TerminalGrid.tsx
    Footer.tsx
  /configurator/                    — Config builder components
    ColorsTab.tsx
    FontTab.tsx
    ShortcutsTab.tsx
    WindowTab.tsx
    PerformanceTab.tsx
    ShellTab.tsx
    TerminalPreview.tsx
    ConfigOutput.tsx
    SettingRow.tsx
    ColorPickerField.tsx
    NotFoundTerminal.tsx
  /ui/                              — shadcn/ui components
/lib
  /store/
    config-store.ts                 — Zustand store with localStorage persistence
  /terminals/
    kitty/
      schema.ts                     — Configurable options, defaults, descriptions
      generator.ts                  — Converts state → valid kitty.conf
      presets.ts                    — Built-in themes (Dracula, Nord, Tokyo Night, etc.)
  /types.ts                         — Shared TypeScript types
  /slider-utils.ts                  — Slider value extraction helper
```

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logoColor=white)
![next-themes](https://img.shields.io/badge/next--themes-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![file-saver](https://img.shields.io/badge/file--saver-2EA44F?style=for-the-badge&logoColor=white)

## Adding a New Terminal

1. Create a new directory under `lib/terminals/` (e.g., `lib/terminals/alacritty/`)
2. Add three files:
   - `schema.ts` — Define all configurable options with types, defaults, and descriptions
   - `generator.ts` — Convert form state to the terminal's config file format
   - `presets.ts` — Built-in theme presets
3. Create a new Zustand store or extend the existing one for the new terminal's state
4. Add the terminal to the `SUPPORTED_TERMINALS` array in `app/configure/[terminal]/page.tsx`
5. Update the `TerminalGrid.tsx` component to mark the terminal as available
6. Create tab components under `components/configurator/` specific to the new terminal

The dynamic route `[terminal]` already handles routing — just add the terminal ID and it will work.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is source-available under a custom license.
You may view and study the code, submit pull requests, and run it locally for personal use.
You may **not** redistribute, fork publicly, or deploy it as a service without explicit written permission.

See the [LICENSE](./LICENSE) file for the full terms.

© 2026 Konfig — Chaker Belhadj Amor
