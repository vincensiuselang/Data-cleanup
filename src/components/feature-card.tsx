'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Feature } from '@/lib/features';
import { i18n, type Locale } from '@/lib/i18n';

interface FeatureCardProps {
  feature: Feature;
  onClick: () => void;
  disabled: boolean;
  locale: Locale;
}

export default function FeatureCard({ feature, onClick, disabled, locale }: FeatureCardProps) {
  const t = i18n[locale].features;
  return (
    <Card
      onClick={!disabled ? onClick : undefined}
      className={cn(
        'group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        disabled ? 'cursor-not-allowed bg-card/60' : 'hover:border-primary'
      )}
      role="button"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardHeader className="items-center text-center">
        <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
          {feature.icon}
        </div>
        <CardTitle className="text-xl">{t[feature.title]}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center h-10">
          {t[feature.subtitle]}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
