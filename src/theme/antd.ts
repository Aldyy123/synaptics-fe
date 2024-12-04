import { theme as antdTheme, ThemeConfig } from 'antd';
import { paginationLightThemeConfig, paginationDarkThemeConfig } from './components/pagination';
import { cardDarkThemeConfig, cardLightThemeConfig } from './components/card';
import { buttonDarkTheme, buttonLightTheme } from './components/button';

const baseThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#4a90e2',
    colorLink: '#4a90e2',
    colorSuccess: '#28a745',
    colorWarning: '#ffc107',
    colorError: '#dc3545',
    colorText: 'rgba(0, 0, 0, 0.85)',
    colorTextDisabled: 'rgba(0, 0, 0, 0.3)',
    colorTextPlaceholder: 'rgba(0, 0, 0, 0.4)',
    colorTextSecondary: '#6c757d',
    colorBorder: '#ced4da',
    colorBgContainer: '#f8f9fa',
    colorBgContainerDisabled: 'rgba(0, 0, 0, 0.05)',
    colorBgTextActive: 'rgba(0, 0, 0, 0.1)',
    colorBgTextHover: 'rgba(0, 0, 0, 0.08)',
  },
  algorithm: [antdTheme.defaultAlgorithm],
  components: {
    Pagination: paginationLightThemeConfig,
    Card: cardLightThemeConfig,
    Checkbox: {
      colorPrimary: '#4a90e2',
    },
    Button: buttonLightTheme
  }
};

const darkThemeConfig: ThemeConfig = {
  ...baseThemeConfig,
  token: {
    ...baseThemeConfig.token,
    colorBgContainer: '#2b2b2b',
    colorPrimary: '#1f1f1f',
    colorLink: '#9ecfff',
    colorText: '#e0e0e0',
    colorTextDisabled: 'rgba(255, 255, 255, 0.3)',
    colorTextPlaceholder: 'rgba(255, 255, 255, 0.4)',
    colorTextSecondary: '#b0b0b0',
    colorBorder: '#444',
  },
  components: {
    Pagination: paginationDarkThemeConfig,
    Card: cardDarkThemeConfig,
    Checkbox: {
      colorPrimary: '#9ecfff',
    },
    Button: buttonDarkTheme
  },
  algorithm: [antdTheme.darkAlgorithm],
};

const getThemeConfig = (isDark: boolean) => {
  return isDark ? darkThemeConfig : baseThemeConfig;
};

export { getThemeConfig };