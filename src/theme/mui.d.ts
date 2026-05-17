import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomPaletteColor {
    main: string;
    transparent: string;
  }

  interface Palette {
    critical: CustomPaletteColor;
    high: CustomPaletteColor;
    medium: CustomPaletteColor;
    low: CustomPaletteColor;
    filter: CustomPaletteColor;
  }

  interface PaletteOptions {
    critical?: CustomPaletteColor;
    high?: CustomPaletteColor;
    medium?: CustomPaletteColor;
    low?: CustomPaletteColor;
    filter?: CustomPaletteColor;
    selected?: string;
    hovered?: string;
  }
}
