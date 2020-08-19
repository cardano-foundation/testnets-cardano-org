import { extendDefaultTheme } from '@input-output-hk/front-end-themes/themes/defaultTheme'

const commonTheme = {
  typography: {
    baseFontSize: 20,
    lineHeight: 1.6,
    fontWeight: 400,
    fontFamily: 'Chivo, sans-serif',
    googleFontsURL: 'https://fonts.googleapis.com/css?family=Chivo:300,400,700',
    h1: {
      fontSize: 3.4,
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: 0,
      textTransform: 'capitalize'
    },
    h2: {
      fontSize: 1.8,
      fontWeight: 700,
      letterSpacing: 0.05,
      lineHeight: 1.2,
      textTransform: 'capitalize'
    },
    h3: {
      fontSize: 1.44,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: 0.05,
      textTransform: 'capitalize'
    },
    h4: {
      fontSize: 1.1,
      fontWeight: 700,
      letterSpacing: 0.05,
      lineHeight: 1.2,
      textTransform: 'capitalize'
    },
    h5: {
      fontSize: 0.7,
      fontWeight: 700,
      letterSpacing: 0.15,
      lineHeight: 1.4,
      textTransform: 'uppercase'
    },
    h6: {
      fontSize: 0.6,
      fontWeight: 700,
      lineHeight: 1.4,
      textTransform: 'uppercase'
    },
    body: {
      fontSize: 1,
      fontWeight: 300,
      letterSpacing: 0.05,
      lineHeight: 1.7
    },
    small: {
      fontSize: 0.75,
      fontWeight: 400,
      letterSpacing: 0.05,
      lineHeight: 1.7,
      '@media (min-width:2049px)': {
        fontSize: 0.8,
        lineHeight: 1.8
      }
    },
    button: {
      fontSize: 0.75,
      fontWeight: 400,
      letterSpacing: 0.1,
      lineHeight: 1.7,
      textTransform: 'none',
      borderRadius: 'none'
    },
    body1: {
      fontSize: 1.8
    },
    body2: {
      fontSize: 1.6
    }
  }
}

function getLightTheme () {
  const primary = {
    main: '#0033ad',
    light: '#3b5fb7',
    dark: '#0a38a6',
    contrastText: '#fff'
  }

  const secondary = {
    main: '#5281f7',
    light: '#ccd6ee',
    dark: '#335cbe',
    contrastText: '#fff'
  }

  const text = {
    primary: '#1d1e21',
    disabled: '#bbb',
    hint: '#eee'
  }

  const background = {
    default: '#fdfdfb',
    primary: '#000'
  }

  return extendDefaultTheme({
    ...commonTheme,
    type: 'light',
    name: 'Cardano Light',
    overrides: {
      MuiButton: {
        root: {
          padding: '1.4rem 4rem',
          '&:hover': {
            color: '#000'
          }
        },
        colorInherit: {
          '&:hover': {
            color: 'currentColor'
          }
        },
        containedPrimary: {
          '&:hover': {
            color: primary.contrastText
          }
        },
        containedSecondary: {
          '&:hover': {
            color: secondary.contrastText
          }
        },
        outlinedPrimary: {
          '&:hover': {
            color: primary.dark
          }
        },
        outlinedSecondary: {
          '&:hover': {
            color: secondary.dark
          }
        }
      },
      MuiIconButton: {
        root: {
          color: 'black'
        }
      }
    },
    colors: {
      primary,
      secondary,
      text,
      background
    }
  })
}

function getDarkTheme () {
  const primary = {
    main: '#adc5ff',
    light: '#d1dfff',
    dark: '#94b3ff',
    contrastText: '#000'
  }

  const secondary = {
    main: '#d9e4ff',
    light: '#e8efff',
    dark: '#ccdaff',
    contrastText: '#000'
  }

  const text = {
    primary: '#ffffff',
    disabled: '#eee',
    hint: '#ddd'
  }

  const background = {
    default: '#080808'
  }

  return extendDefaultTheme({
    ...commonTheme,
    type: 'dark',
    name: 'Cardano Dark',
    overrides: {
      MuiButton: {
        root: {
          padding: '1.4rem 4rem',
          '&:hover': {
            color: '#fff'
          }
        },
        colorInherit: {
          '&:hover': {
            color: 'currentColor'
          }
        },
        containedPrimary: {
          '&:hover': {
            color: primary.contrastText
          }
        },
        containedSecondary: {
          '&:hover': {
            color: secondary.contrastText
          }
        },
        outlinedPrimary: {
          '&:hover': {
            color: primary.dark
          }
        },
        outlinedSecondary: {
          '&:hover': {
            color: secondary.dark
          }
        }
      },
      MuiIconButton: {
        root: {
          color: 'white'
        }
      }
    },
    colors: {
      primary,
      secondary,
      text,
      background
    }
  })
}

export const getThemes = () => [
  {
    key: 'cardano',
    config: getLightTheme()
  },
  {
    key: 'cardano-dark',
    config: getDarkTheme()
  }
]
