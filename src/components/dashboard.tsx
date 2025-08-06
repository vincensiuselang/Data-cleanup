'use client';

import { useState } from 'react';
import { suggestFilesToClean, type SuggestFilesToCleanOutput } from '@/ai/flows/suggest-files-to-clean';
import {
  ChevronLeft,
  Moon,
  Sun,
  Paintbrush,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from './feature-card';
import { useToast } from '@/hooks/use-toast';
import { features, type Feature } from '@/lib/features';
import { i18n, type Locale } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';


export type OS = 'Windows' | 'Linux' | 'macOS';
export type Theme = 'light' | 'dark' | 'dark-pink';

export interface Stats extends Partial<SuggestFilesToCleanOutput> {
  filesDeleted: number | null;
  spaceCleared: string | null;
  timeTaken: string | null;
  aiReasoning: string | null;
  featureTitle: string | null;
  moodBoost: string | null;
  filesAnalyzed?: string[];
  cleanedData?: { name: string; value: number, fill: string }[];
}

interface DashboardProps {
  os: OS;
  onBack: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  locale: Locale;
  onCleaningComplete: (stats: Stats) => void;
}

const mockFiles = [
  'C:\\Windows\\Temp\\log.txt',
  'C:\\Users\\user\\Downloads\\old_archive.zip',
  'C:\\Users\\user\\Documents\\temp_project\\file.js',
  'C:\\Users\\user\\AppData\\Local\\Temp\\tmp_file.tmp',
  '/home/user/.cache/app/some.cache',
  '/var/log/sys.log.1',
  '/tmp/tempfile',
  '~/Library/Caches/com.apple.Safari/Cache.db',
  '~/Downloads/unpacked_archive/duplicate_file.txt',
  '~/Documents/duplicate_file.txt'
];


export default function Dashboard({ os, onBack, theme, onThemeChange, locale, onCleaningComplete }: DashboardProps) {
  const t = i18n[locale];
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleaningTitle, setCleaningTitle] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFeatureClick = async (feature: Feature) => {
    const featureTitle = t.features[feature.title];
    if (feature.id === 'visualizer' || feature.id === 'mood') {
        toast({
            title: featureTitle,
            description: t.dashboard.featureInProgress,
        });
        return;
    }

    setIsCleaning(true);
    setCleaningTitle(featureTitle);
    const startTime = Date.now();

    try {
      let stats: Stats;
      if (feature.id === 'ai') {
        const result = await suggestFilesToClean({ filePaths: mockFiles, osType: os });
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        const spaceCleared = (result.suggestedFiles.length * (Math.random() * 50 + 10)).toFixed(2);
        stats = {
            filesDeleted: result.suggestedFiles.length,
            spaceCleared: `${spaceCleared} MB`,
            timeTaken: `${duration}s`,
            aiReasoning: result.reasoning,
            featureTitle: featureTitle,
            moodBoost: t.moodBoostQuotes[Math.floor(Math.random() * t.moodBoostQuotes.length)],
            filesAnalyzed: mockFiles,
            suggestedFiles: result.suggestedFiles,
        };
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        // Simulate data breakdown for charts
        const cacheCleaned = Math.random() * 200 + 50;
        const tempCleaned = Math.random() * 200 + 50;
        const logsCleaned = Math.random() * 100;
        const totalCleaned = cacheCleaned + tempCleaned + logsCleaned;
        
        const cleanedData = [
            { name: "Cache", value: parseFloat(cacheCleaned.toFixed(2)), fill: "hsl(var(--chart-1))" },
            { name: "Temp Files", value: parseFloat(tempCleaned.toFixed(2)), fill: "hsl(var(--chart-2))" },
            { name: "Log Files", value: parseFloat(logsCleaned.toFixed(2)), fill: "hsl(var(--chart-3))" },
        ];
        
        stats = {
            filesDeleted: Math.floor(Math.random() * 2000) + 500,
            spaceCleared: `${totalCleaned.toFixed(2)} MB`,
            timeTaken: `${duration}s`,
            aiReasoning: null,
            featureTitle: featureTitle,
            moodBoost: t.moodBoostQuotes[Math.floor(Math.random() * t.moodBoostQuotes.length)],
            cleanedData: cleanedData
        };
      }
      onCleaningComplete(stats);
    } catch (error) {
        console.error(`${featureTitle} failed:`, error);
        toast({
          variant: "destructive",
          title: t.dashboard.cleaningErrorTitle(featureTitle),
          description: t.dashboard.cleaningError,
        });
    } finally {
        setIsCleaning(false);
        setCleaningTitle(null);
    }
  };

  if (isCleaning) {
    return (
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg animate-in fade-in-50">
          <CardHeader>
            <CardTitle>{t.statusConsole.running(cleaningTitle!)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-lg">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <span className='mt-4'>{t.statusConsole.scanning}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl animate-in fade-in-50">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">CleanSweep X Pro</h1>
        <span className="ml-4 rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary-foreground" style={{backgroundColor: 'hsl(var(--primary)/.2)', color: 'hsl(var(--primary))'}}>{os}</span>
        <div className="ml-auto flex items-center gap-2">
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
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} onClick={() => handleFeatureClick(feature)} disabled={isCleaning} locale={locale}/>
        ))}
      </div>
    </div>
  );
}
