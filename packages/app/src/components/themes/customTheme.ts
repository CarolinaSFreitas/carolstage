import {
  createBaseThemeOptions,
  createUnifiedTheme,
  defaultTypography,
  palettes,
  genPageTheme,
} from '@backstage/theme';

export const carolstageTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.dark,

      primary: {
        main: '#1DB954',
        light: '#1ED760',
        dark: '#14833B',
        contrastText: '#000000',
      },

      secondary: {
        main: '#1ED760',
        light: '#3BE477',
        dark: '#14833B',
        contrastText: '#000000',
      },

      background: {
        default: '#121212',
        paper: '#181818',
      },

      error: { main: '#E22134' },
      warning: { main: '#F59E0B' },
      info: { main: '#3EA6FF' },
      success: { main: '#1DB954' },

      text: {
        primary: '#FFFFFF',
        secondary: '#B3B3B3',
      },
    },

    typography: {
      ...defaultTypography,
      fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
      h1: {
        ...defaultTypography.h1,
        fontWeight: 700,
        fontSize: '2.2rem',
        marginBottom: 16,
      },
      h2: {
        ...defaultTypography.h2,
        fontWeight: 600,
        fontSize: '1.8rem',
        marginBottom: 12,
      },
    },
  }),

  pageTheme: {
    home: genPageTheme({
      colors: ['#1F1F1F', '#121212'],
      shape: 'round',
    }),
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 700,
        },
        containedPrimary: {
          boxShadow: 'none',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#181818',
          border: '1px solid #282828',
        },
      },
    },
  },
});
