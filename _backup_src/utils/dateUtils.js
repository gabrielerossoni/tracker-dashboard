export const getNextTradingDay = (date, etfData) => {
  let checkDate = new Date(date);
  
  for (let i = 0; i < 10; i++) {
    const found = etfData.find(d => 
      d.date.getDate() === checkDate.getDate() &&
      d.date.getMonth() === checkDate.getMonth() &&
      d.date.getFullYear() === checkDate.getFullYear()
    );
    
    if (found) return found;
    checkDate.setDate(checkDate.getDate() + 1);
  }
  
  return null;
};

export const getNextPurchaseDate = (config) => {
  const today = new Date();
  const currentMonth = new Date(
    today.getFullYear(), 
    today.getMonth(), 
    config.purchaseDay
  );
  
  if (currentMonth > today) {
    return currentMonth;
  } else {
    return new Date(
      today.getFullYear(), 
      today.getMonth() + 1, 
      config.purchaseDay
    );
  }
};