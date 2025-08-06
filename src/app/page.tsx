'use client';

import { useState, useEffect } from 'react';
import type { OS, Theme, Stats } from '@/components/dashboard';
import Dashboard from '@/components/dashboard';
import OsSelection from '@/components/os-selection';
import Visualizer from '@/components/visualizer';
import Results from '@/components/results';
import { type Locale } from '@/lib/i18n';


export default function Home() {
  const [step, setStep] = useState<'os-selection' | 'visualizer' | 'dashboard' | 'results'>('os-selection');
  const [os, setOs] = useState<OS | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [locale, setLocale] = useState<Locale>('id');
  const [lastStats, setLastStats] = useState<Stats | null>(null);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };
  
  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const handleOsSelect = (selectedOs: OS) => {
    setOs(selectedOs);
    setStep('visualizer');
  };
  
  const handleVisualizerContinue = () => {
    setStep('dashboard');
  }
  
  const handleCleaningComplete = (stats: Stats) => {
    setLastStats(stats);
    setStep('results');
  }

  const handleBackToDashboard = () => {
    setLastStats(null);
    setStep('dashboard');
  }
  
  const handleBackToOsSelection = () => {
    setOs(null);
    setStep('os-selection');
  }


  const renderStep = () => {
    switch(step) {
      case 'os-selection':
        return <OsSelection onSelect={handleOsSelect} theme={theme} onThemeChange={handleThemeChange} locale={locale} onLocaleChange={handleLocaleChange}/>;
      case 'visualizer':
        return <Visualizer os={os!} onContinue={handleVisualizerContinue} locale={locale} />;
      case 'dashboard':
        return <Dashboard os={os!} onBack={handleBackToOsSelection} theme={theme} onThemeChange={handleThemeChange} locale={locale} onCleaningComplete={handleCleaningComplete} />;
      case 'results':
        return <Results stats={lastStats!} onBack={handleBackToDashboard} locale={locale} />;
      default:
        return <OsSelection onSelect={handleOsSelect} theme={theme} onThemeChange={handleThemeChange} locale={locale} onLocaleChange={handleLocaleChange}/>;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      {renderStep()}
    </main>
  );
}
