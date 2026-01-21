import React from 'react';

const PurchaseTable = ({ purchases, theme }) => {
  if (purchases.length === 0) return null;

  return (
    <div style={{
      background: theme.bgCard,
      border: `1px solid ${theme.border}`,
      borderRadius: '6px',
      padding: '20px'
    }}>
      <h3 style={{ 
        margin: '0 0 16px 0', 
        fontSize: '13px', 
        fontWeight: 600,
        color: theme.text,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>Storico acquisti</h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
              <th style={{ padding: '8px', textAlign: 'left', color: theme.textMuted, fontWeight: 500 }}>Data</th>
              <th style={{ padding: '8px', textAlign: 'right', color: theme.textMuted, fontWeight: 500 }}>Prezzo</th>
              <th style={{ padding: '8px', textAlign: 'right', color: theme.textMuted, fontWeight: 500 }}>Importo</th>
              <th style={{ padding: '8px', textAlign: 'right', color: theme.textMuted, fontWeight: 500 }}>Quote</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: '8px', color: theme.text }}>
                  {p.date.toLocaleDateString('it-IT')}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: theme.text }}>
                  €{p.price.toFixed(2)}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: theme.text }}>
                  €{p.amount.toFixed(2)}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: theme.text }}>
                  {p.shares.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseTable;