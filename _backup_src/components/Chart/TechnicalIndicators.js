import React, { useState } from 'react';

/**
 * Indicatori tecnici professionali:
 * - RSI, MACD, Bollinger Bands
 * - Moving Averages (SMA, EMA)
 * - Volume Profile
 * - Fibonacci Retracements
 */

export const calculateRSI = (prices, period = 14) => {
  const rsi = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;

    if (i >= period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgGain / avgLoss;
      rsi.push(100 - (100 / (1 + rs)));

      const oldChange = prices[i - period + 1] - prices[i - period];
      if (oldChange > 0) gains -= oldChange;
      else losses += oldChange;
    }
  }

  return rsi;
};

export const calculateSMA = (prices, period) => {
  const sma = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
};

export const calculateEMA = (prices, period) => {
  const ema = [];
  const multiplier = 2 / (period + 1);
  let prevEMA = prices[0];

  ema.push(prevEMA);

  for (let i = 1; i < prices.length; i++) {
    const currentEMA = (prices[i] - prevEMA) * multiplier + prevEMA;
    ema.push(currentEMA);
    prevEMA = currentEMA;
  }

  return ema;
};

export const calculateMACD = (prices) => {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  
  const macdLine = ema12.map((val, i) => val - ema26[i]);
  const signalLine = calculateEMA(macdLine, 9);
  const histogram = macdLine.map((val, i) => val - signalLine[i]);

  return { macdLine, signalLine, histogram };
};

export const calculateBollingerBands = (prices, period = 20, stdDev = 2) => {
  const sma = calculateSMA(prices, period);
  const bands = { upper: [], middle: [], lower: [] };

  for (let i = period - 1; i < prices.length; i++) {
    const slice = prices.slice(i - period + 1, i + 1);
    const mean = sma[i - period + 1];
    const variance = slice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / period;
    const std = Math.sqrt(variance);

    bands.middle.push(mean);
    bands.upper.push(mean + stdDev * std);
    bands.lower.push(mean - stdDev * std);
  }

  return bands;
};

const IndicatorPanel = ({ theme, priceData, onAddIndicator }) => {
  const [selectedIndicators, setSelectedIndicators] = useState(['SMA_20']);
  const [settings, setSettings] = useState({
    SMA_20: { period: 20, color: '#58a6ff' },
    EMA_12: { period: 12, color: '#f0ad4e' },
    RSI: { period: 14, overbought: 70, oversold: 30 },
    MACD: { fast: 12, slow: 26, signal: 9 }
  });

  const indicators = [
    { id: 'SMA_20', name: 'SMA 20', category: 'Moving Averages' },
    { id: 'SMA_50', name: 'SMA 50', category: 'Moving Averages' },
    { id: 'EMA_12', name: 'EMA 12', category: 'Moving Averages' },
    { id: 'RSI', name: 'RSI', category: 'Momentum' },
    { id: 'MACD', name: 'MACD', category: 'Momentum' },
    { id: 'BB', name: 'Bollinger Bands', category: 'Volatility' }
  ];

  return (
    <div style={{
      background: theme.bgCard,
      border: `1px solid ${theme.border}`,
      borderRadius: '6px',
      padding: '16px'
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '13px',
        fontWeight: 600,
        color: theme.text,
        textTransform: 'uppercase'
      }}>Indicatori Tecnici</h3>

      {indicators.map(indicator => (
        <div
          key={indicator.id}
          style={{
            padding: '8px',
            marginBottom: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = theme.bg}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selectedIndicators.includes(indicator.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedIndicators([...selectedIndicators, indicator.id]);
                  onAddIndicator(indicator.id);
                } else {
                  setSelectedIndicators(selectedIndicators.filter(id => id !== indicator.id));
                }
              }}
            />
            <span style={{ fontSize: '12px', color: theme.text }}>
              {indicator.name}
            </span>
          </label>
          <span style={{ fontSize: '10px', color: theme.textMuted }}>
            {indicator.category}
          </span>
        </div>
      ))}
    </div>
  );
};

export default IndicatorPanel;
