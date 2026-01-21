# PAC ETF Dashboard - Professional Trading Platform

Piattaforma avanzata per il monitoraggio PAC e Trading, trasformata in una dashboard professionale stile Bloomberg/TradingView.

![PAC Dashboard Screenshot](assets/dashboard-preview.png)

## 🚀 Nuove Features "Pro"

- **Sicurezza Dati**: Separazione totale tra codice pubblico e dati privati (`src/private/` gitignored).
- **Layout Modulare**: Sistema Drag & Drop per personalizzare l'interfaccia.
- **Watchlist Multi-Asset**: Monitoraggio di più ETF/Azioni con liste personalizzabili.
- **Analisi Tecnica**:
  - Indicatori: RSI, MACD, Bollinger Bands, SMA/EMA.
  - Drawing Tools: Trendlines, Fibonacci, annotazioni.
- **Multi-Timeframe**: Selettore timeframe (1m, 5m, 1H, 1D, etc).
- **Grid System**: Layout predefiniti (Default, Focus Trading, Multi-Chart) e salvataggio custom.

## 🛠 Setup & Installazione

### 1. Installazione Base
```bash
npm install
```

### 2. Setup Dati Privati
Il progetto include un sistema di sicurezza per i dati sensibili.
Per attivare la modalità con dati reali:

1. Esegui lo script di setup iniziale:
   ```bash
   node setup-private.js
   ```
   Questo creerà la cartella `src/private` (protetta da git) con i file template.

2. Modifica i file in `src/private/`:
   - `userConfig.js`: Inserisci i tuoi PAC e API keys.
   - `watchlists.js`: Configura le tue watchlist.

3. Avvia l'applicazione:
   ```bash
   npm start
   ```

### 3. Build & Deploy
Per il deploy su GitHub Pages (versione pubblica demo):
```bash
npm run build
# I dati privati NON verranno inclusi nella build se non importati esplicitamente
# Il sistema userà automaticamente i dati Mock in produzione
```

## 🔒 Architettura di Sicurezza

- **Codice Pubblico**: Tutto ciò che è in `src/` (eccetto `private`).
- **Dati Privati**: Cartella `src/private/` (esclusa via `.gitignore`).
- **DataLoader**: Il modulo `src/utils/dataLoader.js` gestisce il caricamento intelligente:
  - In locale + file presenti: Carica dati reali.
  - In produzione / file mancanti: Fallback su dati Mock.

## Tech Stack

- React 18
- Recharts 2.5
- Lucide React (Icons)
- CSS Modules / Custom Grid System