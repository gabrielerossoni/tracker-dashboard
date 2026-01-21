import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Plus, Edit, Trash2, RefreshCw } from 'lucide-react';

const WatchlistPanel = ({ theme, watchlists, onSelectAsset }) => {
  const [activeList, setActiveList] = useState('main');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, change, volume
  const [editMode, setEditMode] = useState(false);

  return (
    <div style={{
      background: theme.bgCard,
      border: `1px solid ${theme.border}`,
      borderRadius: '6px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <select
          value={activeList}
          onChange={(e) => setActiveList(e.target.value)}
          style={{
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            color: theme.text,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          {Object.keys(watchlists).map(key => (
            <option key={key} value={key}>
              {watchlists[key].name}
            </option>
          ))}
        </select>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.textMuted,
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <Edit size={14} />
          </button>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.accent,
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '8px 16px' }}>
        <input
          type="text"
          placeholder="Cerca ticker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            color: theme.text,
            padding: '6px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        />
      </div>

      {/* Sort Options */}
      <div style={{
        padding: '4px 16px',
        display: 'flex',
        gap: '8px',
        borderBottom: `1px solid ${theme.border}`
      }}>
        {['Nome', 'Var%', 'Volume'].map(label => (
          <button
            key={label}
            onClick={() => setSortBy(label.toLowerCase())}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.textMuted,
              fontSize: '10px',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {watchlists[activeList]?.assets.map((asset, i) => (
          <WatchlistItem
            key={i}
            asset={asset}
            theme={theme}
            editMode={editMode}
            onClick={() => onSelectAsset(asset)}
          />
        ))}
      </div>
    </div>
  );
};

const WatchlistItem = ({ asset, theme, editMode, onClick }) => {
  const [data, setData] = useState(null);
  
  // Mock live data - sostituire con API reale
  useEffect(() => {
    const mockPrice = 100 + Math.random() * 20;
    const mockChange = (Math.random() - 0.5) * 5;
    setData({
      price: mockPrice,
      change: mockChange,
      changePercent: mockChange / mockPrice * 100
    });
  }, []);

  const isPositive = data?.change >= 0;

  return (
    <div
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderBottom: `1px solid ${theme.border}`,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = theme.bg}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: theme.text,
          fontFamily: 'monospace'
        }}>
          {asset.ticker}
        </div>
        <div style={{
          fontSize: '10px',
          color: theme.textMuted
        }}>
          {asset.type}
        </div>
      </div>

      {data && (
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 500,
            color: theme.text,
            fontFamily: 'monospace'
          }}>
            €{data.price.toFixed(2)}
          </div>
          <div style={{
            fontSize: '11px',
            color: isPositive ? theme.positive : theme.negative,
            fontFamily: 'monospace'
          }}>
            {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
          </div>
        </div>
      )}

      {editMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle remove
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.negative,
            cursor: 'pointer'
          }}
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
};

export default WatchlistPanel;
