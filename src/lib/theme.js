export const THEME_STORAGE_KEY = "theme";
export const THEME_MODES = ["light", "dark", "system"];

export function resolveTheme(mode) {
  if (mode === "system" || !mode) {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return mode;
}

// html의 data-theme를 그리기 전에 동기적으로 설정해 테마 깜빡임(FOUC)을 막는다.
// 문자열로 인라인 삽입되므로 외부 변수를 참조하지 않는다.
export const THEME_INIT_SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var m=localStorage.getItem(k)||"system";var d=m==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):m;document.documentElement.setAttribute("data-theme",d);document.documentElement.setAttribute("data-theme-mode",m);}catch(e){}})();`;
