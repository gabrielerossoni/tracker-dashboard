import React, { useState } from 'react';
import { TrendingUp, Minus, Square, Circle, Type, Trash2 } from 'lucide-react';

/**
 * Drawing tools stile TradingView:
 * - Trend lines
 * - Horizontal/Vertical lines
 * - Fibonacci retracements
 * - Rectangles, circles
 * - Text annotations
 */

const TOOLS = [
  { id: 'trendline', icon: TrendingUp, name: 'Trend Line' },
  { id: 'horizontal', icon: Minus, name: 'Horizontal Line' },
  { id: 'vertical', icon: Minus, name: 'Vertical Line', rotate: 90 },
  { id: 'rectangle', icon: Square, name: 'Rectangle' },
  { id: 'circle', icon: Circle, name: 'Circle' },
  { id: 'text', icon: Type, name: 'Text' }
];

const ChartTools = ({ theme, onToolSelect, onClearAll }) => {
  const [activeTool, setActiveTool] = useState(null);
  const [drawings, setDrawings] = useState([]);

  const handleToolSelect = (toolId) => {
    setActiveTool(toolId);
    onToolSelect(toolId);
  };

  return (
    <div style={{
      background: theme.bgPanel,
      border: `1px solid ${theme.border}`,
      borderRadius: '6px',
      padding: '8px',
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    }}>
      {TOOLS.map(tool => (
        <button
          key={tool.id}
          onClick={() => handleToolSelect(tool.id)}
          title={tool.name}
          style={{
            width: '32px',
            height: '32px',
            background: activeTool === tool.id ? theme.accent : 'transparent',
            border: `1px solid ${activeTool === tool.id ? theme.accent : theme.border}`,
            borderRadius: '4px',
            color: activeTool === tool.id ? theme.bg : theme.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          <tool.icon size={16} />
        </button>
      ))}

      <div style={{
        width: '1px',
        height: '24px',
        background: theme.border,
        margin: '0 4px'
      }} />

      <button
        onClick={onClearAll}
        title="Cancella tutto"
        style={{
          width: '32px',
          height: '32px',
          background: 'transparent',
          border: `1px solid ${theme.border}`,
          borderRadius: '4px',
          color: theme.negative,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default ChartTools;
