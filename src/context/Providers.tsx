import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { getThemeConfig } from '@/theme/antd';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const queryClient = new QueryClient();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.body.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  if (!hydrated) {
    return <div className="min-h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <ConfigProvider theme={getThemeConfig(theme === 'dark')}>
      <QueryClientProvider client={queryClient}>
        <div
          className={`min-h-screen transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900'
          }`}
        >
          <div className="p-4">
            <button
              onClick={toggleTheme}
              className="py-3 px-5 dark:text-white  rounded-lg shadow-lg bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 font-semibold transition-transform duration-300 transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-teal-300"
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
          {children}
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default Providers;
