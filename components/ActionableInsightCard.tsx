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
        borderRadius: '3rem',
        padding: '2.5rem 3rem',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          marginBottom: '1.75rem',
        }}
      >
        <div
          style={{
            fontSize: '2.75rem',
            backgroundColor: 'white',
            width: '4.5rem',
            height: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '1.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            flexShrink: 0,
          }}
        >
          {styles.icon}
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '0.6rem',
                height: '0.6rem',
                backgroundColor: styles.light,
                borderRadius: '50%',
                boxShadow: `0 0 8px ${styles.light}`,
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: styles.text,
              }}
            >
              {styles.label}
            </h3>
          </div>
          <div
            style={{
              marginTop: '0.35rem',
              fontSize: '0.9rem',
              color: '#475569',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {insight.level !== SignalLevel.NEUTRAL ? (
              <>
                <span style={{ textTransform: 'uppercase', opacity: 0.8 }}>
                  {insight.category}
                </span>
                <span style={{ opacity: 0.3 }}>•</span>
                <span
                  style={{ color: isHighRisk ? '#e11d48' : 'inherit' }}
                >
                  {Math.round(insight.probability * 100)}% Probability
                </span>
              </>
            ) : (
              <span style={{ opacity: 0.6 }}>No immediate action required</span>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: '1.35rem',
          lineHeight: 1.5,
          fontWeight: 500,
          color: '#1e293b',
          letterSpacing: '-0.01em',
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
