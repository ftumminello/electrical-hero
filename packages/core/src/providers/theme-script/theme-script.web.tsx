import { THEME_STORAGE_KEY } from "../theme-provider/theme-storage";

// Mirrors resolveScheme in theme-provider.web.tsx; runs before React hydrates.
const script = `(function(){try{var p=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var d=p==="dark"||(p!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var s=d?"dark":"light";var r=document.documentElement;r.dataset.theme=s;r.style.colorScheme=s;}catch(e){}})();`;

/** Sets `data-theme` on <html> before first paint so dark mode never flashes light. Render in <head>. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
