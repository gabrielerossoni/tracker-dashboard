import React from 'react';

const ExportButton = ({ purchases }) => {
  const exportCSV = () => {
    const csv = [
      ['Data', 'Prezzo', 'Importo', 'Quote'],
      ...purchases.map(p => [
        p.date.toLocaleDateString('it-IT'),
        p.price.toFixed(2),
        p.amount.toFixed(2),
        p.shares.toFixed(4)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pac-acquisti.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <button 
      onClick={exportCSV}
      style={{
        padding: '8px 16px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '16px'
      }}
    >
      Esporta CSV
    </button>
  );
};

export default ExportButton;
