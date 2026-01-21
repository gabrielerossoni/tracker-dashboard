/**
 * ISTRUZIONI SETUP:
 * 1. Copia questo file in src/private/userConfig.js
 * 2. Inserisci i tuoi dati reali
 * 3. NON committare mai src/private/ su GitHub
 */

export const USER_CONFIG = {
  // PAC Settings
  pacs: [
    {
      id: 'pac_1',
      name: 'PAC ETF World',
      ticker: 'VWCE.MI',
      startDate: '2024-01-15',
      monthlyAmount: 500,
      purchaseDay: 22,
      broker: 'Degiro',
      active: true
    }
    // Aggiungi i tuoi PAC qui
  ],
  
  // API Keys (opzionale)
  apis: {
    alphavantage: 'YOUR_API_KEY',
    finnhub: 'YOUR_API_KEY',
    twelvedata: 'YOUR_API_KEY'
  },
  
  // Broker Credentials (solo se necessario)
  brokers: {
    // NON inserire password reali, solo token API
  }
};
