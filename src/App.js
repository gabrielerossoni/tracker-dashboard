import React, { useState, useEffect } from 'react';
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
import ExportButton from './components/ExportButton';

// New Components
import GridLayout from './components/Layout/GridLayout';
import WatchlistPanel from './components/Watchlist/WatchlistPanel';
import IndicatorPanel from './components/Chart/TechnicalIndicators';
import ChartTools from './components/Chart/ChartTools';
import TimeframeSelector from './components/Chart/TimeframeSelector';
import { loadPrivateData, getWatchlists, isPrivateMode } from './utils/dataLoader';

const MOCK_ETF_DATA = generateMockETFData();

const App = () => {
  const [config, setConfig] = useState(() => {
    try {
      const saved = sessionStorage.getItem('pacConfig');
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  });

  const [watchlists, setWatchlists] = useState({});
  const [privateMode, setPrivateMode] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('1d');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Initialize Data
  useEffect(() => {
    const init = async () => {
      const userData = await loadPrivateData();
      const lists = await getWatchlists();
      setWatchlists(lists);
      setPrivateMode(userData !== null);
      
      // If private data exists, utilize the first PAC config
      if (userData && userData.pacs && userData.pacs.length > 0) {
        const activePac = userData.pacs[0];
        setConfig(prev => ({
          ...prev,
          monthlyAmount: activePac.monthlyAmount,
          purchaseDay: activePac.purchaseDay,
          // merge other fields as necessary
        }));
      }
    };
    init();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('pacConfig', JSON.stringify(config));
  }, [config]);

  const theme = THEMES[config.theme];
  
  // Calculate PAC Data
  const pacData = calculatePACData(config, MOCK_ETF_DATA);
  const nextPurchase = getNextPurchaseDate(config);
  const status = getPACStatus(config, pacData.purchases);
  const positionStatus = pacData.profitPercent > 0 ? 'SOPRA' : pacData.profitPercent < 0 ? 'SOTTO' : 'NEUTRO';
  
  const chartData = MOCK_ETF_DATA.map(d => ({
    date: d.date.getTime(),
    price: d.price,
    pmc: pacData.pmc
  }));
  
  const purchasePoints = pacData.purchases.map(p => ({
    date: p.date.getTime(),
    price: p.price
  }));

  // Define Layout Components
  const layoutComponents = {
    chart: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: `1px solid ${theme.border}` }}>
          <TimeframeSelector theme={theme} activeTimeframe={activeTimeframe} onSelect={setActiveTimeframe} />
          <ChartTools theme={theme} onToolSelect={() => {}} onClearAll={() => {}} />
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
           <Chart 
            chartData={chartData}
            purchasePoints={purchasePoints}
            config={config}
            theme={theme}
          />
        </div>
      </div>
    ),
    watchlist: (
      <WatchlistPanel 
        theme={theme} 
        watchlists={watchlists} 
        onSelectAsset={(asset) => console.log('Select:', asset)} 
      />
    ),
    indicators: (
      <IndicatorPanel 
        theme={theme} 
        priceData={chartData} 
        onAddIndicator={() => {}} 
      />
    ),
    positions: (
      <div style={{ height: '100%', overflow: 'auto' }}>
        <div style={{ padding: '8px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'flex-end' }}>
             <ExportButton purchases={pacData.purchases} />
        </div>
        <PurchaseTable purchases={pacData.purchases} theme={theme} />
      </div>
    ),
    metrics: (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '8px',
            padding: '8px' 
        }}>
            <MetricCard 
              label="Investito" 
              value={`€${pacData.totalInvested.toFixed(0)}`}
              theme={theme}
            />
            <MetricCard 
              label="Valore" 
              value={`€${pacData.currentValue.toFixed(0)}`}
              theme={theme}
            />
             <MetricCard 
                label="Risultato"
                value={`€${pacData.profit.toFixed(0)}`}
                subtitle={`${pacData.profitPercent.toFixed(2)}%`}
                color={pacData.profit > 0 ? theme.positive : pacData.profit < 0 ? theme.negative : theme.neutral}
                theme={theme}
              />
        </div>
    ),
    config: (
         <ConfigPanel 
           config={config}
           setConfig={setConfig}
           isOpen={true} // Always open in panel
           setIsOpen={() => {}} // No toggle needed
           theme={theme}
           embedded={true} // Hint to style for embedding
         />
    )
  };

  // Enhance layouts with extra panels
  // We can inject these into the GridLayout default layouts or create a specific one for this app
  // For now, let's just assume the user can arrange them or we provide a default that uses them.
  // The provided GridLayout has 'default', 'focus', 'analysis' presets.
  // 'default' uses: chart, watchlist, positions, orders.
  // We don't have 'orders' -> let's map 'orders' to 'metrics' or 'config' in the rendering logic below or modify GridLayout defaults if accessible.
  // But GridLayout defines its own presets internally in the component. 
  // To avoid modifying GridLayout presets which are hardcoded, we will map our components to the IDs expected there.
  // IDs: chart, watchlist, positions, orders, chart2, indicators.
  
  const mappedComponents = {
      ...layoutComponents,
      orders: layoutComponents.metrics, // Reuse metrics for orders slot
      chart2: layoutComponents.config // Use config for chart2 slot in analysis mode
  };

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
      
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <GridLayout theme={theme} components={mappedComponents} />
      </div>
    </div>
  );
};

export default App;