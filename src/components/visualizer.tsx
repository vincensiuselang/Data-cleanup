'use client';

import { i18n, type Locale } from '@/lib/i18n';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileCode, ImageIcon, Package, Trash2, ArrowRight } from 'lucide-react';
import type { OS } from './dashboard';

interface VisualizerProps {
    os: OS;
    onContinue: () => void;
    locale: Locale;
}

const JunkItem = ({ icon, label, size, count }: { icon: React.ReactNode, label: string, size: string, count: number }) => (
    <div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg animate-in fade-in-50 slide-in-from-bottom-5'>
        <div className='flex items-center gap-3'>
            <div className='text-primary'>{icon}</div>
            <div>
                <div className='font-semibold'>{label}</div>
                <div className='text-xs text-muted-foreground'>{count.toLocaleString()} Files</div>
            </div>
        </div>
        <div className='font-mono text-sm font-semibold'>{size}</div>
    </div>
)

export default function Visualizer({ os, onContinue, locale }: VisualizerProps) {
    const t = i18n[locale].visualizer;
    
    // Mock data for visualization, made more relevant to the OS
    const getJunkData = (os: OS) => {
        const commonJunk = [
            { id: 'imageCache', icon: <ImageIcon className="h-6 w-6" />, size: "256 MB", count: 1409 },
            { id: 'logFiles', icon: <FileCode className="h-6 w-6" />, size: "1.2 GB", count: 83 },
            { id: 'recycleBin', icon: <Trash2 className="h-6 w-6" />, size: "312 MB", count: 45 },
        ];
        if (os === 'Linux') {
            return [...commonJunk, { id: 'orphanPackages', icon: <Package className="h-6 w-6" />, size: "88 MB", count: 12 }];
        }
        if (os === 'macOS') {
            return [...commonJunk, { id: 'xcodeCache', icon: <Package className="h-6 w-6" />, size: "1.5 GB", count: 25 }];
        }
        // Windows default
        return [...commonJunk, { id: 'tempFiles', icon: <Package className="h-6 w-6" />, size: "450 MB", count: 2500 }];
    }

    const junkData = getJunkData(os).map(item => ({
        ...item,
        label: t.junkItems[item.id as keyof typeof t.junkItems]
    }));

    return (
        <Card className="w-full max-w-2xl shadow-lg animate-in fade-in zoom-in-95">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold tracking-tight">{t.title}</CardTitle>
                <CardDescription className="text-lg pt-2">
                    {t.description(os)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='space-y-3 my-4'>
                    {junkData.map((item) => (
                        <JunkItem key={item.id} {...item} />
                    ))}
                </div>
                 <div className="mt-8 text-center">
                    <Button onClick={onContinue} size="lg">
                        {t.continue}
                        <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
