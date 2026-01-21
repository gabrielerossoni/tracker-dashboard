import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ConfigPanel = ({ config, setConfig, isOpen, setIsOpen, theme }) => {
  return (
    <>
      <div 
        style={{
          width: isOpen ? '280px' : '0',
          height: '100%',
          background: theme.bgPanel,
          borderRight: `1px solid ${theme.border}`,
          transition: 'width 0.2s',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <h3 style={{ 
            margin: '0 0 24px 0', 
            fontSize: '13px', 
            fontWeight: 600,
            color: theme.text,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>Configurazione</h3>
          
          {/* DATA INIZIO */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '11px', 
              color: theme.textMuted,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Data inizio PAC</label>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Giorno</label>
                <input 
                  type="number"
                  min="1"
                  max="28"
                  value={config.startDay}
                  onChange={(e) => setConfig({...config, startDay: parseInt(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '13px',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Mese</label>
                <select
                  value={config.startMonth}
                  onChange={(e) => setConfig({...config, startMonth: parseInt(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '13px'
                  }}
                >
                  {Array.from({length: 12}, (_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Anno</label>
                <input 
                  type="number"
                  value={config.startYear}
                  onChange={(e) => setConfig({...config, startYear: parseInt(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '13px',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* IMPORTO MENSILE */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '11px', 
              color: theme.textMuted,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Importo mensile</label>
            <input 
              type="range"
              min="10"
              max="500"
              value={config.monthlyAmount}
              onChange={(e) => setConfig({...config, monthlyAmount: parseInt(e.target.value)})}
              style={{ width: '100%', marginBottom: '8px' }}
            />
            <input 
              type="number"
              value={config.monthlyAmount}
              onChange={(e) => setConfig({...config, monthlyAmount: parseInt(e.target.value)})}
              style={{
                width: '100%',
                padding: '6px 8px',
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: '4px',
                color: theme.text,
                fontSize: '13px',
                fontFamily: 'monospace'
              }}
            />
          </div>
          
          {/* GIORNO ACQUISTO */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '11px', 
              color: theme.textMuted,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Giorno acquisto</label>
            <input 
              type="range"
              min="1"
              max="28"
              value={config.purchaseDay}
              onChange={(e) => setConfig({...config, purchaseDay: parseInt(e.target.value)})}
              style={{ width: '100%', marginBottom: '8px' }}
            />
            <input 
              type="number"
              min="1"
              max="28"
              value={config.purchaseDay}
              onChange={(e) => setConfig({...config, purchaseDay: parseInt(e.target.value)})}
              style={{
                width: '100%',
                padding: '6px 8px',
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: '4px',
                color: theme.text,
                fontSize: '13px',
                fontFamily: 'monospace'
              }}
            />
          </div>
          
          {/* TEMA */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '11px', 
              color: theme.textMuted,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Tema</label>
            {['dark-steel', 'dark-charcoal', 'dark-navy'].map(themeName => (
              <label key={themeName} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio"
                  checked={config.theme === themeName}
                  onChange={() => setConfig({...config, theme: themeName})}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ color: theme.text, fontSize: '13px' }}>
                  {themeName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </label>
            ))}
          </div>
          
          {/* ELEMENTI GRAFICO */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '11px', 
              color: theme.textMuted,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Elementi grafico</label>
            <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={config.showPMC}
                onChange={(e) => setConfig({...config, showPMC: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <span style={{ color: theme.text, fontSize: '13px' }}>Linea PMC</span>
            </label>
            <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={config.showPurchaseMarkers}
                onChange={(e) => setConfig({...config, showPurchaseMarkers: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <span style={{ color: theme.text, fontSize: '13px' }}>Marker acquisti</span>
            </label>
            <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={config.showGrid}
                onChange={(e) => setConfig({...config, showGrid: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <span style={{ color: theme.text, fontSize: '13px' }}>Griglia secondaria</span>
            </label>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          left: isOpen ? '280px' : '0',
          top: '70px',
          width: '32px',
          height: '40px',
          background: theme.bgPanel,
          border: `1px solid ${theme.border}`,
          borderLeft: isOpen ? 'none' : `1px solid ${theme.border}`,
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.textMuted,
          transition: 'left 0.2s',
          zIndex: 10
        }}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </>
  );
};

export default ConfigPanel;