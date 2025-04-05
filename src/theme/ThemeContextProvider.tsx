import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

export type ThemeMode = 'light' | 'dark';
export type ThemeVariant = 
  | 'default'
  | 'modern'
  | 'elegant'
  | 'nature'
  | 'ocean'
  | 'sunset'
  | 'tech'
  | 'minimal'
  | 'vibrant'
  | 'corporate'
  | 'cosmic'
  | 'forest'
  | 'candy'
  | 'midnight'
  | 'sunrise'
  | 'neon'
  | 'royal'
  | 'autumn'
  | 'winter'
  | 'spring';

interface ThemeContextType {
  toggleColorMode: () => void;
  setThemeVariant: (variant: ThemeVariant) => void;
  mode: ThemeMode;
  variant: ThemeVariant;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
  setThemeVariant: () => {},
  mode: 'light',
  variant: 'default'
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

const themeVariants: Record<ThemeVariant, { light: ThemeOptions; dark: ThemeOptions }> = {
  default: {
    light: {
      palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        background: { default: '#f5f5f5', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
        secondary: { main: '#ce93d8' },
        background: { default: '#121212', paper: '#1e1e1e' },
      }
    }
  },
  modern: {
    light: {
      palette: {
        primary: { main: '#2196f3' },
        secondary: { main: '#ff4081' },
        background: { default: '#f8f9fa', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#64b5f6' },
        secondary: { main: '#ff80ab' },
        background: { default: '#18191a', paper: '#242526' },
      }
    }
  },
  elegant: {
    light: {
      palette: {
        primary: { main: '#5c6bc0' },
        secondary: { main: '#8e24aa' },
        background: { default: '#f5f6fa', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#7986cb' },
        secondary: { main: '#ab47bc' },
        background: { default: '#1a1b1e', paper: '#2f3136' },
      }
    }
  },
  nature: {
    light: {
      palette: {
        primary: { main: '#43a047' },
        secondary: { main: '#ff9800' },
        background: { default: '#f1f8e9', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#66bb6a' },
        secondary: { main: '#ffa726' },
        background: { default: '#1b2419', paper: '#2a3626' },
      }
    }
  },
  ocean: {
    light: {
      palette: {
        primary: { main: '#0288d1' },
        secondary: { main: '#00acc1' },
        background: { default: '#e3f2fd', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#29b6f6' },
        secondary: { main: '#26c6da' },
        background: { default: '#102027', paper: '#1c313a' },
      }
    }
  },
  sunset: {
    light: {
      palette: {
        primary: { main: '#f57c00' },
        secondary: { main: '#d81b60' },
        background: { default: '#fff3e0', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#ff9800' },
        secondary: { main: '#ec407a' },
        background: { default: '#2d1c15', paper: '#3e2723' },
      }
    }
  },
  tech: {
    light: {
      palette: {
        primary: { main: '#3949ab' },
        secondary: { main: '#00897b' },
        background: { default: '#e8eaf6', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#5c6bc0' },
        secondary: { main: '#26a69a' },
        background: { default: '#1a237e', paper: '#283593' },
      }
    }
  },
  minimal: {
    light: {
      palette: {
        primary: { main: '#546e7a' },
        secondary: { main: '#78909c' },
        background: { default: '#eceff1', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#78909c' },
        secondary: { main: '#90a4ae' },
        background: { default: '#263238', paper: '#37474f' },
      }
    }
  },
  vibrant: {
    light: {
      palette: {
        primary: { main: '#6200ea' },
        secondary: { main: '#00bfa5' },
        background: { default: '#f3e5f5', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#7c4dff' },
        secondary: { main: '#1de9b6' },
        background: { default: '#1a0033', paper: '#2b0049' },
      }
    }
  },
  corporate: {
    light: {
      palette: {
        primary: { main: '#1565c0' },
        secondary: { main: '#283593' },
        background: { default: '#f5f5f5', paper: '#ffffff' },
      }
    },
    dark: {
      palette: {
        primary: { main: '#42a5f5' },
        secondary: { main: '#5c6bc0' },
        background: { default: '#0d1b2a', paper: '#1b2b3a' },
      }
    }
  },
  cosmic: {
    light: {
      palette: {
        primary: { main: '#6b3fa0' },
        secondary: { main: '#c431d9' },
        background: {
          default: '#f0f2ff',
          paper: 'linear-gradient(135deg, #ffffff 0%, #e8eaff 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#9d6fe7' },
        secondary: { main: '#d975e9' },
        background: {
          default: '#0a0a1a',
          paper: 'linear-gradient(135deg, #1a1a3a 0%, #0a0a1a 100%)',
        },
      }
    }
  },
  forest: {
    light: {
      palette: {
        primary: { main: '#2e7d32' },
        secondary: { main: '#795548' },
        background: {
          default: '#f1f8e9',
          paper: 'linear-gradient(120deg, #ffffff 0%, #e8f5e9 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#4caf50' },
        secondary: { main: '#8d6e63' },
        background: {
          default: '#1a231a',
          paper: 'linear-gradient(120deg, #243024 0%, #1a231a 100%)',
        },
      }
    }
  },
  candy: {
    light: {
      palette: {
        primary: { main: '#ec407a' },
        secondary: { main: '#ab47bc' },
        background: {
          default: '#fff0f7',
          paper: 'linear-gradient(45deg, #ffffff 0%, #fce4ec 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#f48fb1' },
        secondary: { main: '#ce93d8' },
        background: {
          default: '#2a1f24',
          paper: 'linear-gradient(45deg, #321f29 0%, #2a1f24 100%)',
        },
      }
    }
  },
  midnight: {
    light: {
      palette: {
        primary: { main: '#3949ab' },
        secondary: { main: '#283593' },
        background: {
          default: '#e8eaf6',
          paper: 'linear-gradient(150deg, #ffffff 0%, #e8eaf6 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#5c6bc0' },
        secondary: { main: '#3f51b5' },
        background: {
          default: '#0a0c1a',
          paper: 'linear-gradient(150deg, #1a1f3c 0%, #0a0c1a 100%)',
        },
      }
    }
  },
  sunrise: {
    light: {
      palette: {
        primary: { main: '#ff7043' },
        secondary: { main: '#ffa726' },
        background: {
          default: '#fff3e0',
          paper: 'linear-gradient(to right, #ffffff 0%, #fff3e0 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#ff8a65' },
        secondary: { main: '#ffb74d' },
        background: {
          default: '#2a1f1a',
          paper: 'linear-gradient(to right, #321f1a 0%, #2a1f1a 100%)',
        },
      }
    }
  },
  neon: {
    light: {
      palette: {
        primary: { main: '#00e5ff' },
        secondary: { main: '#00b0ff' },
        background: {
          default: '#e0f7fa',
          paper: 'linear-gradient(60deg, #ffffff 0%, #e0f7fa 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#18ffff' },
        secondary: { main: '#40c4ff' },
        background: {
          default: '#0a192f',
          paper: 'linear-gradient(60deg, #1a2f3c 0%, #0a192f 100%)',
        },
      }
    }
  },
  royal: {
    light: {
      palette: {
        primary: { main: '#8e24aa' },
        secondary: { main: '#6a1b9a' },
        background: {
          default: '#f3e5f5',
          paper: 'linear-gradient(135deg, #ffffff 0%, #f3e5f5 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#ab47bc' },
        secondary: { main: '#8e24aa' },
        background: {
          default: '#1a121f',
          paper: 'linear-gradient(135deg, #2a1f2f 0%, #1a121f 100%)',
        },
      }
    }
  },
  autumn: {
    light: {
      palette: {
        primary: { main: '#f57c00' },
        secondary: { main: '#d84315' },
        background: {
          default: '#fff3e0',
          paper: 'linear-gradient(30deg, #ffffff 0%, #fff3e0 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#ff9800' },
        secondary: { main: '#ff5722' },
        background: {
          default: '#2a1f1a',
          paper: 'linear-gradient(30deg, #2f241a 0%, #2a1f1a 100%)',
        },
      }
    }
  },
  winter: {
    light: {
      palette: {
        primary: { main: '#4fc3f7' },
        secondary: { main: '#29b6f6' },
        background: {
          default: '#e1f5fe',
          paper: 'linear-gradient(90deg, #ffffff 0%, #e1f5fe 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#81d4fa' },
        secondary: { main: '#4fc3f7' },
        background: {
          default: '#0a1a2a',
          paper: 'linear-gradient(90deg, #1a2a3a 0%, #0a1a2a 100%)',
        },
      }
    }
  },
  spring: {
    light: {
      palette: {
        primary: { main: '#66bb6a' },
        secondary: { main: '#26a69a' },
        background: {
          default: '#e8f5e9',
          paper: 'linear-gradient(120deg, #ffffff 0%, #e8f5e9 100%)',
        },
      }
    },
    dark: {
      palette: {
        primary: { main: '#81c784' },
        secondary: { main: '#4db6ac' },
        background: {
          default: '#1a2a1a',
          paper: 'linear-gradient(120deg, #1f2f1f 0%, #1a2a1a 100%)',
        },
      }
    }
  },
};

const baseThemeOptions: ThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        } as any,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        } as any,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        } as any,
      },
    },
  },
};

const getDesignTokens = (mode: ThemeMode, variant: ThemeVariant): ThemeOptions => {
  const variantTheme = themeVariants[variant][mode];
  return {
    ...baseThemeOptions,
    palette: {
      mode,
      ...variantTheme.palette,
    },
  };
};

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [variant, setVariant] = useState<ThemeVariant>('default');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setThemeVariant: (newVariant: ThemeVariant) => {
        setVariant(newVariant);
      },
      mode,
      variant,
    }),
    [mode, variant]
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(mode, variant),
        typography: {
          fontFamily: 'Inter, sans-serif',
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 700,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
          subtitle1: {
            fontWeight: 500,
          },
          subtitle2: {
            fontWeight: 500,
          },
          body1: {
            fontWeight: 400,
          },
          body2: {
            fontWeight: 400,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: '8px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '16px',
                boxShadow: mode === 'light' 
                  ? '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)'
                  : '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 12px 24px -4px rgba(0, 0, 0, 0.12)',
              },
            },
          },
        },
      }),
    [mode, variant]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
