import { getNextTradingDay } from './dateUtils';

export const calculatePACData = (config, etfData) => {
  const startDate = new Date(config.startYear, config.startMonth - 1, config.startDay);
  const today = new Date();
  const purchases = [];
  let totalInvested = 0;
  let totalShares = 0;
  
  let currentMonth = new Date(startDate);
  
  while (currentMonth <= today) {
    if (currentMonth >= startDate) {
      const purchaseDate = new Date(
        currentMonth.getFullYear(), 
        currentMonth.getMonth(), 
        config.purchaseDay
      );
      
      if (purchaseDate <= today) {
        const tradingDay = getNextTradingDay(purchaseDate, etfData);
        
        if (tradingDay) {
          const shares = config.monthlyAmount / tradingDay.price;
          totalShares += shares;
          totalInvested += config.monthlyAmount;
          
          purchases.push({
            date: new Date(tradingDay.date),
            price: tradingDay.price,
            amount: config.monthlyAmount,
            shares: shares
          });
        }
      }
    }
    
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }
  
  const currentPrice = etfData[etfData.length - 1]?.price || 0;
  const currentValue = totalShares * currentPrice;
  const pmc = totalInvested > 0 ? totalInvested / totalShares : 0;
  const profit = currentValue - totalInvested;
  const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
  
  return {
    purchases,
    totalInvested,
    totalShares,
    pmc,
    currentValue,
    currentPrice,
    profit,
    profitPercent
  };
};

export const getPACStatus = (config, purchases) => {
  const startDate = new Date(config.startYear, config.startMonth - 1, config.startDay);
  const today = new Date();
  
  if (startDate > today) return 'FUTURO';
  if (purchases.length === 0) return 'IN ATTESA';
  return 'ATTIVO';
};