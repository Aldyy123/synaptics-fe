import { ComponentToken } from 'antd/es/pagination/style';

const paginationLightThemeConfig: ComponentToken = {
  itemActiveBg: '#4a91e21a',
  itemBg: '#f8f9fa',
  itemLinkBg: '#e6f7ff',
  itemActiveBgDisabled: '#ced4da',
  itemActiveColorDisabled: '#6c757d',
  itemInputBg: '#ffffff',
  itemSize: 36,
  miniOptionsSizeChangerTop: 28,
  itemSizeSM: 28,
};

const paginationDarkThemeConfig: ComponentToken = {
  itemActiveBg: '#ffffffff',
  itemBg: '#2b2b2b',
  itemLinkBg: '#444',
  itemActiveBgDisabled: '#444',
  itemActiveColorDisabled: '#b0b0b0',
  itemInputBg: '#2b2b2b',
  itemSize: 36,
  itemSizeSM: 28,
  miniOptionsSizeChangerTop: 28,
};

export { paginationLightThemeConfig, paginationDarkThemeConfig };
