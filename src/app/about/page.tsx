// This component should be a client component to access language context if we add it.
// For now, we pass locale as a search param as a workaround for this example.
'use client';

import { features } from '@/lib/features';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bot } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { i18n, type Locale } from '@/lib/i18n';
import { useEffect, useState } from 'react';


export default function AboutPage() {
    
    // A bit of a hack to get locale in a server component context for this example
    // In a real app, this would likely come from a context provider or middleware.
    const [locale, setLocale] = useState<Locale>('id');
    
    useEffect(() => {
        const lang = document.documentElement.lang as Locale;
        if(lang) {
            setLocale(lang);
        }
    }, [])

    const t = i18n[locale];

    // Filter out features that might not need a detailed description page
    const featuresToShow = features.filter(f => f.id !== 'full' && f.id !== 'mood');

    return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-4xl animate-in fade-in-50">
            <header className="relative flex flex-col items-center justify-center mb-8 text-center">
                <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Bot className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold tracking-tight">{t.about.title}</h1>
                </div>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                    {t.about.description}
                </p>
            </header>

            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center">{t.about.featuresTitle}</h2>
                {featuresToShow.map((feature) => (
                    <Card key={feature.id} className="transition-all hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <div className="text-primary">{feature.icon}</div>
                            <div>
                                <CardTitle className="text-2xl">{t.features[feature.title]}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-base">{t.features[feature.description]}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <footer className="mt-12 text-center text-muted-foreground space-y-2">
                <p>{t.about.footerLine1(new Date().getFullYear())}</p>
                <p>{t.about.footerLine2} <span className="font-semibold text-primary">vincen.pkl</span>, {t.about.footerLine3} <span className="italic">{t.about.footerLine4}</span>.</p>
            </footer>
        </div>
        </main>
    );
}
