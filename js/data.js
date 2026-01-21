
// Generate Mock Data for Chart
export const generateMockData = () => {
    const data = [];
    // Generate 2 years of data
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 2);
    
    let price = 80;
    const now = new Date();
    
    // Loop day by day
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
        // Skip weekends
        if (d.getDay() === 0 || d.getDay() === 6) continue;
        
        // Random walk
        const change = (Math.random() - 0.48) * 2; // Slight upward bias
        price += change;
        
        data.push({
            time: d.toISOString().split('T')[0], // yyyy-mm-dd
            value: parseFloat(price.toFixed(2))
        });
    }
    
    return data;
};

// Calculate PAC Logic
export const calculatePAC = (config, data) => {
    const purchases = [];
    let totalInvested = 0;
    let totalShares = 0;
    
    // Start from data start or config start? Let's say data start for simplicity or filtered
    // For this mock, we assume PAC started at the beginning of the data
    
    let nextPurchaseMonth = new Date(data[0].time);
    nextPurchaseMonth.setDate(config.purchaseDay);
    
    // If start day is past, move to next month
    if (nextPurchaseMonth < new Date(data[0].time)) {
        nextPurchaseMonth.setMonth(nextPurchaseMonth.getMonth() + 1);
    }
    
    const reversedData = [...data]; // Chronological
    
    // Find purchases
    reversedData.forEach(day => {
        const date = new Date(day.time);
        
        // Check if we hit a purchase date (or passed it closest available)
        // Simplified: if month matches nextPurchaseMonth and day >= purchaseDay and not already purchased this month
        if (date.getFullYear() === nextPurchaseMonth.getFullYear() && 
            date.getMonth() === nextPurchaseMonth.getMonth() &&
            date.getDate() >= config.purchaseDay) {
            
            // Execute Purchase
            const amount = config.monthlyAmount;
            const price = day.value;
            const shares = amount / price;
            
            purchases.push({
                date: day.time,
                price: price,
                amount: amount,
                shares: shares
            });
            
            totalInvested += amount;
            totalShares += shares;
            
            // Increment next purchase date
            nextPurchaseMonth.setMonth(nextPurchaseMonth.getMonth() + 1);
        }
    });

    const currentPrice = data[data.length - 1].value;
    const currentValue = totalShares * currentPrice;
    const profit = currentValue - totalInvested;
    const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
    const pmc = totalInvested > 0 ? totalInvested / totalShares : 0;

    return {
        purchases,
        totalInvested,
        totalShares,
        currentValue,
        profit,
        profitPercent,
        pmc,
        currentPrice
    };
};
