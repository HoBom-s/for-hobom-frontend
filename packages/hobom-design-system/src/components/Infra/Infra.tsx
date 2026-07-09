const BASELINE_CSS = `
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  font-family: 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--hb-color-canvas);
  color: var(--hb-color-text-primary);
}
`;

interface CssBaselineProps {
  /** Opt the document into light+dark form controls. */
  enableColorScheme?: boolean;
}

/** Minimal document reset + base typography, themed by the `--hb-*` vars. */
export const CssBaseline = ({ enableColorScheme = false }: CssBaselineProps) => (
  <style
    dangerouslySetInnerHTML={{
      __html: enableColorScheme ? `:root{color-scheme:light dark;}${BASELINE_CSS}` : BASELINE_CSS,
    }}
  />
);

interface GlobalStylesProps {
  /** A raw CSS string injected once at the document level. */
  styles: string;
}

/** Injects a global stylesheet from a plain CSS string. */
export const GlobalStyles = ({ styles }: GlobalStylesProps) => (
  <style dangerouslySetInnerHTML={{ __html: styles }} />
);
