import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      main: string;
      error: {
        light: string;
        main: string;
        dark: string;
      };
      success: {
        light: string;
        main: string;
        dark: string;
      };
      disabled: string;
      white: string;
      black: string;
      grey: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        1000: string;
      };
    };
    spacing: (factor: number) => string;
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
