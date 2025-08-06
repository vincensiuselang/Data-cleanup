'use client';

import { useState, useEffect } from 'react';
import { Apple, Bot, Info, Moon, Paintbrush, Sun, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { OS, Theme } from './dashboard';
import Link from 'next/link';
import { i18n, type Locale } from '@/lib/i18n';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface OsSelectionProps {
  onSelect: (os: OS) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const WindowsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <path d="M3 3H11V11H3V3Z"/>
        <path d="M13 3H21V11H13V3Z"/>
        <path d="M3 13H11V21H3V13Z"/>
        <path d="M13 13H21V21H13V13Z"/>
    </svg>
);

const LinuxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,20c-1.66,0-3-1.34-3-3s1.34-3,3-3s3,1.34,3,3 S12.66,20,11,20z M12,12c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4S14.21,12,12,12z M18,16c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S19.1,16,18,16z"/>
    </svg>
);


const osOptions: { name: OS; icon: React.ReactNode }[] = [
  { name: 'Windows', icon: <WindowsIcon /> },
  { name: 'macOS', icon: <Apple className="h-10 w-10" /> },
  { name: 'Linux', icon: <LinuxIcon /> },
];

export default function OsSelection({ onSelect, theme, onThemeChange, locale, onLocaleChange }: OsSelectionProps) {
  const [detectedOs, setDetectedOs] = useState<OS | null>(null);
  const t = i18n[locale].osSelection;

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase();
    if (platform.includes('win')) {
      setDetectedOs('Windows');
    } else if (platform.includes('mac')) {
      setDetectedOs('macOS');
    } else if (platform.includes('linux')) {
      setDetectedOs('Linux');
    }
  }, []);

  return (
    <Card className="w-full max-w-2xl shadow-lg animate-in fade-in zoom-in-95">
      <CardHeader className="text-center relative">
        <div className='flex justify-end gap-2 absolute top-0 right-4'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Languages className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onLocaleChange('id')} disabled={locale === 'id'}>
                        Bahasa Indonesia
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onLocaleChange('en')} disabled={locale === 'en'}>
                        English
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={theme === 'light' ? 'secondary' : 'ghost'} size="icon" onClick={() => onThemeChange('light')}>
                <Sun className="h-5 w-5" />
            </Button>
            <Button variant={theme === 'dark' ? 'secondary' : 'ghost'} size="icon" onClick={() => onThemeChange('dark')}>
                <Moon className="h-5 w-5" />
            </Button>
            <Button variant={theme === 'dark-pink' ? 'secondary' : 'ghost'} size="icon" onClick={() => onThemeChange('dark-pink')}>
                <Paintbrush className="h-5 w-5" />
            </Button>
        </div>
        <div className="flex justify-center items-center gap-2 pt-12">
            <Bot className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold tracking-tight">CleanSweep X Pro</CardTitle>
        </div>
        <CardDescription className="text-lg pt-2">
          {detectedOs ? t.detectedOS(detectedOs) : t.selectOS}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {osOptions.map((os) => {
            const isDisabled = detectedOs !== null && detectedOs !== os.name;
            return (
                <Button
                    key={os.name}
                    variant="outline"
                    className="h-32 flex flex-col gap-2 rounded-lg shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => onSelect(os.name)}
                    disabled={isDisabled}
                    aria-disabled={isDisabled}
                    title={isDisabled ? t.notYourOS(os.name) : t.select(os.name)}
                >
                    {os.icon}
                    <span className="text-lg font-semibold">{os.name}</span>
                </Button>
            )
          })}
        </div>
        <div className="mt-6 text-center">
            <Button asChild variant="link">
                <Link href="/about">
                    <Info className="mr-2 h-4 w-4"/>
                    {t.learnMore}
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
