import React from 'react';

const MetricCard = ({ label, value, subtitle, color, theme }) => {
  return (
    <div style={{
      background: theme.bgCard,
      border: `1px solid ${theme.border}`,
      borderRadius: '6px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ 
        fontSize: '11px', 
        color: theme.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontWeight: 500
      }}>{label}</div>
      <div style={{ 
        fontSize: '28px', 
        fontWeight: 600,
        color: color || theme.text,
        fontFamily: 'monospace'
      }}>{value}</div>
      {subtitle && (
        <div style={{ fontSize: '12px', color: theme.textMuted, fontFamily: 'monospace' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default MetricCard;