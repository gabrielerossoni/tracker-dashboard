import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const HeaderBar = ({ status, purchaseCount, nextPurchase, positionStatus, profitPercent, theme }) => {
  const statusColors = {
    'ATTIVO': theme.positive,
    'IN ATTESA': '#f0ad4e',
    'FUTURO': theme.neutral
  };
  
  return (
    <div style={{
      height: '60px',
      background: theme.bgPanel,
      borderBottom: `1px solid ${theme.border}`,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '48px',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: statusColors[status]
        }} />
        <span style={{ 
          color: theme.text, 
          fontSize: '13px', 
          fontWeight: 500,
          fontFamily: 'monospace'
        }}>{status}</span>
      </div>
      
      <div>
        <span style={{ color: theme.textMuted, fontSize: '11px', marginRight: '6px' }}>ACQUISTI</span>
        <span style={{ color: theme.text, fontSize: '13px', fontWeight: 500, fontFamily: 'monospace' }}>
          {purchaseCount}
        </span>
      </div>
      
      <div>
        <span style={{ color: theme.textMuted, fontSize: '11px', marginRight: '6px' }}>PROSSIMO</span>
        <span style={{ color: theme.text, fontSize: '13px', fontWeight: 500, fontFamily: 'monospace' }}>
          {nextPurchase.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: theme.textMuted, fontSize: '11px' }}>POSIZIONE</span>
        <span style={{ 
          color: positionStatus === 'SOPRA' ? theme.positive : positionStatus === 'SOTTO' ? theme.negative : theme.neutral,
          fontSize: '13px',
          fontWeight: 500,
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {positionStatus === 'SOPRA' ? <TrendingUp size={14} /> : positionStatus === 'SOTTO' ? <TrendingDown size={14} /> : null}
          {positionStatus}
          {profitPercent !== 0 && ` (${profitPercent > 0 ? '+' : ''}${profitPercent.toFixed(2)}%)`}
        </span>
      </div>
    </div>
  );
};

export default HeaderBar;