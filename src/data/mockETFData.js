// SOSTITUIRE CON API REALE O CSV IMPORT
export const generateMockETFData = () => {
  const data = [];
  const startDate = new Date(2025, 10, 1); // Nov 2025
  const endDate = new Date(2026, 2, 1); // Mar 2026
  let currentDate = new Date(startDate);
  let price = 100;
  
  while (currentDate <= endDate) {
    // Skip weekends
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      price += (Math.random() - 0.48) * 2;
      data.push({
        date: new Date(currentDate),
        price: parseFloat(price.toFixed(2))
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

// Per usare dati reali, importa da CSV o API:
// import Papa from 'papaparse';
// export const loadETFData = async (ticker) => {
//   const response = await fetch(`/api/etf/${ticker}`);
//   return response.json();
// };