/**
 * Carica dati privati se disponibili, altrimenti usa mock
 * Funziona sia in dev che in produzione (GitHub Pages)
 */

let privateData = null;

export const loadPrivateData = async () => {
  try {
    // Prova a caricare dati privati (solo in dev locale)
    const module = await import('../private/userConfig.js');
    privateData = module.USER_CONFIG;
    console.log('✅ Dati privati caricati');
    return privateData;
  } catch (error) {
    // Fallback a dati mock (su GitHub Pages)
    console.log('ℹ️ Uso dati mock (modalità demo)');
    // Potremmo dover creare un mockData.js più completo se non esiste
    try {
        const mockModule = await import('../data/mockData.js');
        return mockModule.MOCK_USER_CONFIG || null;
    } catch (e) {
        console.warn('Nessun dato mock trovato');
        return null;
    }
  }
};

export const getWatchlists = async () => {
  try {
    const module = await import('../private/watchlists.js');
    return module.WATCHLISTS;
  } catch {
    try {
        const mockModule = await import('../data/mockData.js');
        return mockModule.MOCK_WATCHLISTS || {};
    } catch (e) {
        return {};
    }
  }
};

export const isPrivateMode = () => privateData !== null;
