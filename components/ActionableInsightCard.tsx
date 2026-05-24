import React from 'react';
import { ActionableInsight, SignalLevel } from '@/models/ActionableInsight';
import ReactMarkdown from 'react-markdown';

interface ActionableInsightCardProps {
  insight: ActionableInsight;
}

const ActionableInsightCard: React.FC<ActionableInsightCardProps> = ({
  insight,
}) => {
  const getStyles = (level: SignalLevel) => {
    switch (level) {
      case SignalLevel.CRITICAL:
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-700',
          accent: 'bg-red-600',
          icon: '🚨',
          label: 'Critical Action Required',
        };
      case SignalLevel.WARNING:
        return {
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-700',
          accent: 'bg-amber-500',
          icon: '⚠️',
          label: 'Warning',
        };
      case SignalLevel.ADVISORY:
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-700',
          accent: 'bg-blue-600',
          icon: 'ℹ️',
          label: 'Advisory',
        };
      case SignalLevel.NEUTRAL:
      default:
        return {
          bg: 'bg-slate-50 border-slate-200',
          text: 'text-slate-700',
          accent: 'bg-slate-500',
          icon: '💡',
          label: 'Insight',
        };
    }
  };

  const styles = getStyles(insight.level);

  return (
    <div
      className={`mb-10 overflow-hidden rounded-2xl border-2 shadow-sm ${styles.bg}`}
    >
      <div className="p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
              {styles.icon}
            </span>
            <div>
              <h3
                className={`text-xs font-bold uppercase tracking-widest ${styles.text}`}
              >
                {styles.label}
              </h3>
              <div className="mt-0.5 flex items-center gap-2 text-sm text-slate-500">
                <span>{insight.category}</span>
                <span>•</span>
                <span>{Math.round(insight.probability * 100)}% Probability</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full ${styles.accent} transition-all duration-1000`}
                style={{ width: `${insight.probability * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="text-xl font-medium leading-relaxed text-slate-800 md:text-2xl">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="m-0">{children}</p>,
              }}
            >
              {insight.conclusion}
            </ReactMarkdown>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 sm:hidden">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full ${styles.accent}`}
              style={{ width: `${insight.probability * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionableInsightCard;
