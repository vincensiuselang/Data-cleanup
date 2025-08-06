import { ReactNode } from "react";
import {
    BrainCircuit,
    Brush,
    Gamepad2,
    PackageX,
    Rocket,
    Sparkles,
    ShieldCheck,
    Timer,
    Dna,
    Wind
} from 'lucide-react';
import { type Locale, type i18n } from "./i18n";

export interface Feature {
    id: string;
    title: keyof (typeof i18n)[Locale]['features'];
    subtitle: keyof (typeof i18n)[Locale]['features'];
    description: keyof (typeof i18n)[Locale]['features'];
    icon: ReactNode;
}
  
export const features: Feature[] = [
    { 
        id: 'auto', 
        title: 'autoCleanTitle', 
        subtitle: 'autoCleanSubtitle', 
        icon: <Sparkles className="h-10 w-10" />,
        description: 'autoCleanDescription'
    },
    { 
        id: 'ai', 
        title: 'aiSmartCleanerTitle', 
        subtitle: 'aiSmartCleanerSubtitle', 
        icon: <BrainCircuit className="h-10 w-10" />,
        description: 'aiSmartCleanerDescription'
    },
    { 
        id: 'bloatware', 
        title: 'deepBloatwareAnalyzerTitle', 
        subtitle: 'deepBloatwareAnalyzerSubtitle', 
        icon: <PackageX className="h-10 w-10" />,
        description: 'deepBloatwareAnalyzerDescription'
    },
    { 
        id: 'game', 
        title: 'gameModeCleanerTitle', 
        subtitle: 'gameModeCleanerSubtitle', 
        icon: <Gamepad2 className="h-10 w-10" />,
        description: 'gameModeCleanerDescription'
    },
    { 
        id: 'creative', 
        title: 'creativeSpaceCleanerTitle', 
        subtitle: 'creativeSpaceCleanerSubtitle', 
        icon: <Brush className="h-10 w-10" />,
        description: 'creativeSpaceCleanerDescription'
    },
    { 
        id: 'privacy', 
        title: 'privacyCleanerTitle', 
        subtitle: 'privacyCleanerSubtitle', 
        icon: <ShieldCheck className="h-10 w-10" />,
        description: 'privacyCleanerDescription'
    },
    { 
        id: 'monitor', 
        title: 'realTimeMonitorTitle', 
        subtitle: 'realTimeMonitorSubtitle', 
        icon: <Timer className="h-10 w-10" />,
        description: 'realTimeMonitorDescription'
    },
    {
        id: 'visualizer',
        title: 'systemHealthVisualizerTitle',
        subtitle: 'systemHealthVisualizerSubtitle',
        icon: <Dna className="h-10 w-10" />,
        description: 'systemHealthVisualizerDescription'
    },
    {
        id: 'mood',
        title: 'postCleanMoodBoosterTitle',
        subtitle: 'postCleanMoodBoosterSubtitle',
        icon: <Wind className="h-10 w-10" />,
        description: 'postCleanMoodBoosterDescription'
    },
    { 
        id: 'full', 
        title: 'fullAutoCleanTitle', 
        subtitle: 'fullAutoCleanSubtitle', 
        icon: <Rocket className="h-10 w-10" />,
        description: 'fullAutoCleanDescription'
    },
];
