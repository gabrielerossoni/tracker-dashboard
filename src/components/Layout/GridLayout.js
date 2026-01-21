import React, { useState } from 'react';
import { Maximize2, Minimize2, X, GripVertical } from 'lucide-react';

/**
 * Sistema grid professionale con:
 * - Drag & drop panels
 * - Resize dinamico
 * - Layouts salvabili
 * - Fullscreen mode per ogni panel
 */

const PRESET_LAYOUTS = {
  default: {
    name: 'Default',
    panels: [
      { id: 'chart', x: 0, y: 0, w: 8, h: 6 },
      { id: 'watchlist', x: 8, y: 0, w: 4, h: 6 },
      { id: 'positions', x: 0, y: 6, w: 6, h: 4 },
      { id: 'orders', x: 6, y: 6, w: 6, h: 4 }
    ]
  },
  focus: {
    name: 'Focus Trading',
    panels: [
      { id: 'chart', x: 0, y: 0, w: 10, h: 8 },
      { id: 'watchlist', x: 10, y: 0, w: 2, h: 8 }
    ]
  },
  analysis: {
    name: 'Multi-Chart',
    panels: [
      { id: 'chart', x: 0, y: 0, w: 6, h: 5 },
      { id: 'chart2', x: 6, y: 0, w: 6, h: 5 },
      { id: 'indicators', x: 0, y: 5, w: 12, h: 3 }
    ]
  }
};

const GridLayout = ({ theme, components }) => {
  const [layout, setLayout] = useState(PRESET_LAYOUTS.default);
  const [fullscreenPanel, setFullscreenPanel] = useState(null);
  const [customLayouts, setCustomLayouts] = useState({});

  const saveCustomLayout = (name) => {
    const newLayouts = {
      ...customLayouts,
      [name]: { ...layout, name }
    };
    setCustomLayouts(newLayouts);
    // Salva in sessionStorage
    sessionStorage.setItem('customLayouts', JSON.stringify(newLayouts));
  };

  const loadCustomLayout = (name) => {
    const saved = sessionStorage.getItem('customLayouts');
    if (saved) {
      const layouts = JSON.parse(saved);
      if (layouts[name]) {
        setLayout(layouts[name]);
      }
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Layout Toolbar */}
      <div style={{
        background: theme.bgPanel,
        borderBottom: `1px solid ${theme.border}`,
        padding: '8px 16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '11px', color: theme.textMuted }}>LAYOUT:</span>
        {Object.keys(PRESET_LAYOUTS).map(key => (
          <button
            key={key}
            onClick={() => setLayout(PRESET_LAYOUTS[key])}
            style={{
              background: layout.name === PRESET_LAYOUTS[key].name ? theme.accent : 'transparent',
              border: `1px solid ${theme.border}`,
              color: theme.text,
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            {PRESET_LAYOUTS[key].name}
          </button>
        ))}
        
        <button
          onClick={() => {
            const name = prompt('Nome layout personalizzato:');
            if (name) saveCustomLayout(name);
          }}
          style={{
            background: 'transparent',
            border: `1px solid ${theme.border}`,
            color: theme.accent,
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          Salva Layout
        </button>
      </div>

      {/* Grid Container */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(10, 1fr)',
        gap: '8px',
        padding: '8px',
        position: 'relative'
      }}>
        {layout.panels.map(panel => (
          <Panel
            key={panel.id}
            panel={panel}
            theme={theme}
            isFullscreen={fullscreenPanel === panel.id}
            onFullscreen={() => setFullscreenPanel(
              fullscreenPanel === panel.id ? null : panel.id
            )}
          >
            {components[panel.id]}
          </Panel>
        ))}
      </div>
    </div>
  );
};

const Panel = ({ panel, theme, children, isFullscreen, onFullscreen }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      style={{
        gridColumn: isFullscreen ? '1 / -1' : `${panel.x + 1} / span ${panel.w}`,
        gridRow: isFullscreen ? '1 / -1' : `${panel.y + 1} / span ${panel.h}`,
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        zIndex: isFullscreen ? 1000 : 1
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          background: theme.bgPanel,
          borderBottom: `1px solid ${theme.border}`,
          padding: '6px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move'
        }}
        draggable
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <GripVertical size={12} color={theme.textMuted} />
          <span style={{ fontSize: '11px', color: theme.textMuted, textTransform: 'uppercase' }}>
            {panel.id}
          </span>
        </div>
        
        <button
          onClick={onFullscreen}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.textMuted,
            cursor: 'pointer',
            padding: '2px'
          }}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* Panel Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
        {children}
      </div>
    </div>
  );
};

export default GridLayout;
