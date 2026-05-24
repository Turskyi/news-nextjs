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
          bg: '#fef2f2',
          border: '#fecaca',
          text: '#b91c1c',
          light: '#ef4444',
          icon: '🚨',
          label: 'Critical Action',
        };
      case SignalLevel.WARNING:
        return {
          bg: '#fffbeb',
          border: '#fde68a',
          text: '#b45309',
          light: '#f59e0b',
          icon: '⚠️',
          label: 'Warning',
        };
      case SignalLevel.ADVISORY:
        return {
          bg: '#eff6ff',
          border: '#bfdbfe',
          text: '#1d4ed8',
          light: '#3b82f6',
          icon: 'ℹ️',
          label: 'Advisory',
        };
      case SignalLevel.NEUTRAL:
      default:
        return {
          bg: '#ecfdf5',
          border: '#a7f3d0',
          text: '#047857',
          light: '#10b981',
          icon: '✅',
          label: 'All Clear',
        };
    }
  };

  const styles = getStyles(insight.level);
  const isHighRisk =
    insight.level !== SignalLevel.NEUTRAL && insight.probability >= 0.8;

  return (
    <div
      style={{
        backgroundColor: styles.bg,
        border: `2px solid ${styles.border}`,
        borderRadius: '4rem',
        padding: '3rem 4rem',
        marginBottom: '2rem',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '3.5rem',
            backgroundColor: 'white',
            width: '5rem',
            height: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {styles.icon}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '0.75rem',
                height: '0.75rem',
                backgroundColor: styles.light,
                borderRadius: '50%',
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: '0.875rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: styles.text,
              }}
            >
              {styles.label}
            </h3>
          </div>
          <div
            style={{
              marginTop: '0.25rem',
              fontSize: '1rem',
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            <span style={{ textTransform: 'uppercase' }}>
              {insight.category}
            </span>
            <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>•</span>
            <span style={{ color: isHighRisk ? '#dc2626' : 'inherit', fontWeight: isHighRisk ? 700 : 500 }}>
              {Math.round(insight.probability * 100)}% Probability
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: '1.5rem',
          lineHeight: 1.6,
          fontWeight: 500,
          color: '#1e293b',
        }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <p style={{ margin: 0 }}>{children}</p>,
          }}
        >
          {insight.conclusion}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ActionableInsightCard;
