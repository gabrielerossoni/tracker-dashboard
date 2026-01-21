
let chart;
let areaSeries;
let markers = [];

export const createChart = (container, data, purchases) => {
    chart = LightweightCharts.createChart(container, {
        width: container.clientWidth,
        height: container.clientHeight,
        layout: {
            background: { type: 'solid', color: '#0E0F14' },
            textColor: '#D1D4DC',
        },
        grid: {
            vertLines: { color: '#1F2229' },
            horzLines: { color: '#1F2229' },
        },
        rightPriceScale: {
            borderColor: '#2A2E39',
        },
        timeScale: {
            borderColor: '#2A2E39',
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
    });

    // Create Series
    areaSeries = chart.addAreaSeries({
        topColor: 'rgba(41, 98, 255, 0.3)',
        bottomColor: 'rgba(41, 98, 255, 0)',
        lineColor: '#2962FF',
        lineWidth: 2,
    });

    areaSeries.setData(data);

    // Set Markers (Purchases)
    updateMarkers(purchases);

    // Handle Resize
    window.addEventListener('resize', () => {
        chart.applyOptions({ 
            width: container.clientWidth,
            height: container.clientHeight 
        });
    });
};

export const updateChart = (data, purchases) => {
    if (areaSeries) {
        areaSeries.setData(data);
        updateMarkers(purchases);
    }
};

const updateMarkers = (purchases) => {
    markers = purchases.map(p => ({
        time: p.date,
        position: 'belowBar',
        color: '#089981',
        shape: 'arrowUp',
        text: 'PAC',
        size: 1
    }));
    
    // Sort markers by time just in case
    markers.sort((a, b) => new Date(a.time) - new Date(b.time));
    
    areaSeries.setMarkers(markers);
};
