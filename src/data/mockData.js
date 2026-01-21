import { generateMockETFData } from './mockETFData';

export const MOCK_USER_CONFIG = {
  pacs: [
    {
      id: 'mock_pac',
      name: 'PAC Demo World',
      ticker: 'VWCE.MI',
      startDate: '2023-01-01',
      monthlyAmount: 300,
      purchaseDay: 1,
      broker: 'DemoBroker',
      active: true
    }
  ],
  apis: {},
  brokers: {}
};

export const MOCK_WATCHLISTS = {
  main: {
    name: 'Demo Watchlist',
    assets: [
      { ticker: 'SWDA.MI', type: 'ETF', shares: 0 },
      { ticker: 'EIMI.MI', type: 'ETF', shares: 0 },
      { ticker: 'BTC-USD', type: 'CRYPTO', shares: 0 }
    ]
  }
};
