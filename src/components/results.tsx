'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, FileText, HardDrive, Sparkles, Files, Trash2, ChevronLeft, PieChart } from 'lucide-react';
import type { Stats } from './dashboard';
import { i18n, type Locale } from '@/lib/i18n';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Pie, Cell, ResponsiveContainer, PieChart as RechartsPieChart, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegend } from './ui/chart';

interface ResultsProps {
  stats: Stats;
  onBack: () => void;
  locale: Locale;
}

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
    <div className="flex items-center gap-4">
        <div className="text-primary">{icon}</div>
        <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    </div>
);


export default function Results({ stats, onBack, locale }: ResultsProps) {
    const t = i18n[locale].statusConsole;
    const tResults = i18n[locale].results;
  
  return (
    <div className="w-full max-w-4xl animate-in fade-in-50">
        <header className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-4">
            <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{t.resultsFor(stats.featureTitle!)}</h1>
        </header>
      <Card className="w-full shadow-lg">
        <CardContent className='pt-6'>
            <div className="animate-in fade-in-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatItem icon={<FileText className="h-8 w-8" />} value={stats.filesDeleted?.toLocaleString() ?? 'N/A'} label={t.filesIdentified} />
                <StatItem icon={<HardDrive className="h-8 w-8" />} value={stats.spaceCleared ?? 'N/A'} label={t.spaceCleared} />
                <StatItem icon={<Clock className="h-8 w-8" />} value={stats.timeTaken ?? 'N/A'} label={t.timeTaken} />
            </div>

            {stats.cleanedData && (
                 <>
                    <Separator className="my-6" />
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><PieChart className="h-5 w-5"/> {t.cleanedDataBreakdown}</h3>
                        <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                            <RechartsPieChart>
                                <Tooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel nameKey="name" formatter={(value, name) => `${name}: ${value} MB`} />}
                                />
                                <Legend content={<ChartLegend />} />
                                <Pie data={stats.cleanedData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} strokeWidth={2}>
                                {stats.cleanedData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                                </Pie>
                            </RechartsPieChart>
                        </ChartContainer>
                    </div>
                </>
            )}
            
            {stats.aiReasoning && (
                <>
                    <Separator className="my-6" />
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{t.aiReasoning}</h3>
                        <p className="text-muted-foreground bg-muted p-4 rounded-md">{stats.aiReasoning}</p>
                    </div>
                </>
            )}

            {stats.filesAnalyzed && stats.suggestedFiles && (
                <>
                <Separator className="my-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Files className="h-5 w-5"/> {t.filesAnalyzed} ({stats.filesAnalyzed.length})</h3>
                    <ScrollArea className="h-48 rounded-md border bg-muted">
                        <div className="p-4 text-sm font-mono">
                        {stats.filesAnalyzed.map((file, i) => <div key={i}>{file}</div>)}
                        </div>
                    </ScrollArea>
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Trash2 className="h-5 w-5 text-destructive" /> {t.filesForDeletion} ({stats.suggestedFiles.length})</h3>
                    <ScrollArea className="h-48 rounded-md border bg-muted">
                        <div className="p-4 text-sm font-mono text-destructive">
                        {stats.suggestedFiles.map((file, i) => <div key={i}>{file}</div>)}
                        </div>
                    </ScrollArea>
                    </div>
                </div>
                </>
            )}

                {stats.moodBoost && (
                <>
                <Separator className="my-6" />
                <div className="flex items-center justify-center text-center gap-3 text-lg text-primary italic">
                    <Sparkles className="h-6 w-6" />
                    <p>{stats.moodBoost}</p>
                </div>
                </>
            )}
            </div>
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
            <Button onClick={onBack}>
                <ChevronLeft className="mr-2 h-4 w-4"/>
                {tResults.back}
            </Button>
        </div>
    </div>
  );
}
