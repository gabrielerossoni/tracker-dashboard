import React from 'react';

const TIMEFRAMES = [
  { id: '1m', label: '1m', seconds: 60 },
  { id: '5m', label: '5m', seconds: 300 },
  { id: '15m', label: '15m', seconds: 900 },
  { id: '1h', label: '1H', seconds: 3600 },
  { id: '4h', label: '4H', seconds: 14400 },
  { id: '1d', label: '1D', seconds: 86400 },
  { id: '1w', label: '1W', seconds: 604800 },
  { id: '1M', label: '1M', seconds: 2592000 }
];

const TimeframeSelector = ({ theme, activeTimeframe, onSelect }) => {
  return (
    <div style={{
      background: theme.bgPanel,
      border: `1px solid ${theme.border}`,
      borderRadius: '6px',
      padding: '4px',
      display: 'flex',
      gap: '2px'
    }}>
      {TIMEFRAMES.map(tf => (
        <button
          key={tf.id}
          onClick={() => onSelect(tf.id)}
          style={{
            background: activeTimeframe === tf.id ? theme.accent : 'transparent',
            border: 'none',
            color: activeTimeframe === tf.id ? theme.bg : theme.text,
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'monospace',
            transition: 'all 0.2s'
          }}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
