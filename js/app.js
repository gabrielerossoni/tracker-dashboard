import { generateMockData, calculatePAC } from './data.js';
import { createChart, updateChart } from './chart.js';

// State
const state = {
    // Basic Config
    config: {
        monthlyAmount: 300,
        purchaseDay: 1
    },
    // Data
    etfData: [],
    pacData: {
        purchases: [],
        pmc: 0,
        invested: 0,
        currentValue: 0
    },
    // UI
    activeTimeframe: '1d'
};

// Elements
const els = {
    chartContainer: document.getElementById('chart-container'),
    ticker: document.getElementById('current-ticker'),
    legendPrice: document.getElementById('legend-price'),
    metrics: {
        pmc: document.getElementById('metric-pmc'),
        invested: document.getElementById('metric-invested'),
        value: document.getElementById('metric-value'),
        pl: document.getElementById('metric-pl')
    },
    watchlist: document.getElementById('watchlist-container'),
    positions: document.getElementById('positions-container'),
    configModal: document.getElementById('config-modal'),
    inpAmount: document.getElementById('inp-amount'),
    inpDay: document.getElementById('inp-day')
};

// Initialize
async function init() {
    console.log('Initializing Application...');
    
    // Load config from LocalStorage if exists
    const savedConfig = localStorage.getItem('pac_config');
    if (savedConfig) {
        state.config = JSON.parse(savedConfig);
    }
    
    // Restore UI Inputs
    els.inpAmount.value = state.config.monthlyAmount;
    els.inpDay.value = state.config.purchaseDay;

    // Load Data
    state.etfData = generateMockData();
    console.log('Data generated:', state.etfData.length, 'points');

    // Calculate
    recalculate();

    // Render Chart
    createChart(els.chartContainer, state.etfData, state.pacData.purchases);
    
    // Render UI
    renderMetrics();
    renderWatchlist();
    renderPositions();

    // Listeners
    setupEventListeners();
}

function recalculate() {
    state.pacData = calculatePAC(state.config, state.etfData);
    console.log('PAC Calculated:', state.pacData);
}

function renderMetrics() {
    const { pmc, invested, currentValue, profit, profitPercent, currentPrice } = state.pacData;
    
    els.metrics.pmc.textContent = `€${pmc.toFixed(2)}`;
    els.metrics.invested.textContent = `€${invested.toFixed(0)}`;
    els.metrics.value.textContent = `€${currentValue.toFixed(0)}`;
    
    const sign = profit >= 0 ? '+' : '';
    const colorClass = profit >= 0 ? 'positive' : 'negative';
    els.metrics.pl.innerHTML = `<span class="${colorClass}">${sign}€${profit.toFixed(0)} (${sign}${profitPercent.toFixed(2)}%)</span>`;

    els.legendPrice.textContent = currentPrice.toFixed(2);
    els.legendPrice.className = `legend-price ${colorClass}`;
}

function renderWatchlist() {
    // Mock Watchlist
    const items = [
        { sym: 'VWCE.MI', name: 'Vanguard FTSE All-World', price: state.pacData.currentPrice, change: 0.15 },
        { sym: 'SWDA.MI', name: 'iShares Core MSCI World', price: 92.40, change: -0.21 },
        { sym: 'EIMI.MI', name: 'iShares Core EM IMI', price: 29.80, change: 0.05 },
        { sym: 'S&P 500', name: 'Index', price: 4780.20, change: 0.42 },
        { sym: 'BTC-USD', name: 'Bitcoin', price: 42100, change: 1.25 }
    ];

    els.watchlist.innerHTML = items.map(item => `
        <div class="watchlist-item">
            <div class="item-left">
                <div class="item-symbol">${item.sym}</div>
                <div class="item-desc">${item.name}</div>
            </div>
            <div class="item-right">
                <div class="item-price">${item.price.toFixed(2)}</div>
                <div class="item-change ${item.change >= 0 ? 'positive' : 'negative'}">${item.change > 0 ? '+' : ''}${item.change}%</div>
            </div>
        </div>
    `).join('');
}

function renderPositions() {
    // Last 5 purchases
    const recent = [...state.pacData.purchases].reverse();
    
    els.positions.innerHTML = recent.map(p => `
        <div class="position-item">
            <div class="item-left">
                <div class="item-symbol">${new Date(p.date).toLocaleDateString()}</div>
                <div class="item-desc">Acquisto PAC</div>
            </div>
            <div class="item-right">
                <div class="item-price">€${p.price.toFixed(2)}</div>
                <div class="item-change">${p.shares.toFixed(2)} pz</div>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Modal
    document.getElementById('btn-config').addEventListener('click', () => {
        els.configModal.classList.remove('hidden');
    });
    
    document.getElementById('btn-close-config').addEventListener('click', () => {
        els.configModal.classList.add('hidden');
    });

    document.getElementById('btn-save-config').addEventListener('click', () => {
        state.config.monthlyAmount = parseFloat(els.inpAmount.value);
        state.config.purchaseDay = parseInt(els.inpDay.value);
        
        localStorage.setItem('pac_config', JSON.stringify(state.config));
        
        // Update App
        recalculate();
        renderMetrics();
        renderPositions();
        updateChart(state.etfData, state.pacData.purchases);
        
        els.configModal.classList.add('hidden');
    });
    
    // Resize Listener
    window.addEventListener('resize', () => {
        // Chart handles its own resize via chart.js listener usually, or we trigger it here
    });
    
    // Timeframe buttons
    document.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            // Mock timeframe change (just visual for now as we have mock data)
        });
    });
}

// Start
init();
