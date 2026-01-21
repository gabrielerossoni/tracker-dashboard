import React, { useState } from 'react';
import { DEFAULT_CONFIG } from './config/defaultConfig';
import { THEMES } from './themes/themes';
import { generateMockETFData } from './data/mockETFData';
import { calculatePACData, getPACStatus } from './utils/calculations';
import { getNextPurchaseDate } from './utils/dateUtils';
import ConfigPanel from './components/ConfigPanel';
import HeaderBar from './components/HeaderBar';
import MetricCard from './components/MetricCard';
import Chart from './components/Chart';
import PurchaseTable from './components/PurchaseTable';

const ETF_DATA = generateMockETFData();

const App = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const theme = THEMES[config.theme];
  
  const pacData = calculatePACData(config, ETF_DATA);
  const nextPurchase = getNextPurchaseDate(config);
  const status = getPACStatus(config, pacData.purchases);
  const positionStatus = pacData.profitPercent > 0 ? 'SOPRA' : pacData.profitPercent < 0 ? 'SOTTO' : 'NEUTRO';
  
  // Prepara dati per il grafico
  const chartData = ETF_DATA.map(d => ({
    date: d.date.getTime(),
    price: d.price,
    pmc: pacData.pmc
  }));
  
  const purchasePoints = pacData.purchases.map(p => ({
    date: p.date.getTime(),
    price: p.price
  }));
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <HeaderBar 
        status={status}
        purchaseCount={pacData.purchases.length}
        nextPurchase={nextPurchase}
        positionStatus={positionStatus}
        profitPercent={pacData.profitPercent}
        theme={theme}
      />
      
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        <ConfigPanel 
          config={config}
          setConfig={setConfig}
          isOpen={isPanelOpen}
          setIsOpen={setIsPanelOpen}
          theme={theme}
        />
        
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto'
        }}>
          {/* METRICHE PRINCIPALI */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {config.visibleMetrics.totalInvested && (
              <MetricCard 
                label="Totale investito"
                value={`€${pacData.totalInvested.toFixed(2)}`}
                subtitle={`${pacData.purchases.length} acquisti`}
                theme={theme}
              />
            )}
            {config.visibleMetrics.currentValue && (
              <MetricCard 
                label="Valore attuale"
                value={`€${pacData.currentValue.toFixed(2)}`}
                subtitle={`${pacData.totalShares.toFixed(4)} quote`}
                theme={theme}
              />
            )}
            {config.visibleMetrics.pmc && (
              <MetricCard 
                label="PMC"
                value={`€${pacData.pmc.toFixed(2)}`}
                subtitle={`Prezzo attuale: €${pacData.currentPrice.toFixed(2)}`}
                theme={theme}
              />
            )}
            {config.visibleMetrics.result && (
              <MetricCard 
                label="Risultato"
                value={`€${pacData.profit >= 0 ? '+' : ''}${pacData.profit.toFixed(2)}`}
                subtitle={`${pacData.profitPercent >= 0 ? '+' : ''}${pacData.profitPercent.toFixed(2)}%`}
                color={pacData.profit > 0 ? theme.positive : pacData.profit < 0 ? theme.negative : theme.neutral}
                theme={theme}
              />
            )}
          </div>
          
          {/* GRAFICO */}
          <Chart 
            chartData={chartData}
            purchasePoints={purchasePoints}
            config={config}
            pacData={pacData}
            theme={theme}
          />
          
          {/* TABELLA ACQUISTI */}
          <PurchaseTable purchases={pacData.purchases} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default App;