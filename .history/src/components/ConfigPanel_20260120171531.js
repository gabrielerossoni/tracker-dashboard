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