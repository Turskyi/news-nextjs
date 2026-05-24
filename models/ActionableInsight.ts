export enum SignalLevel {
  NEUTRAL = 'NEUTRAL',
  ADVISORY = 'ADVISORY',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export enum InsightCategory {
  SAFETY = 'SAFETY',
  FINANCE = 'FINANCE',
  HEALTH = 'HEALTH',
  TRAVEL = 'TRAVEL',
  LIFESTYLE = 'LIFESTYLE',
  GENERAL = 'GENERAL',
}

export interface ActionableInsight {
  conclusion: string;
  level: SignalLevel;
  probability: number; // 0 to 1
  category: InsightCategory;
}
