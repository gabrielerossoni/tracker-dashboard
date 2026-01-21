import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from 'recharts';

const Chart = ({ chartData, purchasePoints, config, theme }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
          padding: '10px',
          borderRadius: '4px',
          color: theme.text
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{formatDate(label)}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '4px 0 0', color: entry.color }}>
              {entry.name}: €{Number(entry.value).toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      width: '100%',
      height: '400px',
      backgroundColor: theme.cardBg,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
      border: `1px solid ${theme.border}`,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {config.showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.grid} 
              vertical={false} 
            />
          )}
          
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke={theme.textSecondary}
            tick={{ fill: theme.textSecondary, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: theme.border }}
            minTickGap={30}
            type="number"
            domain={['dataMin', 'dataMax']}
          />
          
          <YAxis 
            domain={['auto', 'auto']}
            stroke={theme.textSecondary}
            tick={{ fill: theme.textSecondary, fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: theme.border }}
            tickFormatter={(val) => `€${val}`}
          />
          
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '10px' }}/>

          <Line 
            type="monotone" 
            dataKey="price" 
            name="Prezzo ETF" 
            stroke={theme.primary} 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
          />

          {config.showPMC && (
            <Line 
              type="stepAfter" 
              dataKey="pmc" 
              name="PMC" 
              stroke={theme.secondary} 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              dot={false} 
              isAnimationActive={true}
            />
          )}

          {config.showPurchaseMarkers && (
             <Scatter 
               data={purchasePoints} 
               name="Acquisti" 
               fill={theme.accent}
               line={false}
               shape="circle"
               style={{ fill: theme.accent }}
             />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
