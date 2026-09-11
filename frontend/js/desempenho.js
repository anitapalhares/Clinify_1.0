document.addEventListener('DOMContentLoaded', () => {
    renderLatencyChart();
    renderStatusChart();
});

// Gráfico 1: Latência por Horário
function renderLatencyChart() {
    const container = document.getElementById('latency-bars');
    if (!container) return;

    const data = [
        { time: '00:00', value: 180, percentage: 85 },
        { time: '04:00', value: 130, percentage: 60 },
        { time: '08:00', value: 210, percentage: 100 },
        { time: '12:00', value: 195, percentage: 92 },
        { time: '16:00', value: 142, percentage: 67 },
        { time: '20:00', value: 150, percentage: 71 }
    ];

    container.innerHTML = data.map(item => `
    <div class="bar-row">
      <div class="bar-label-group">
        <span>${item.time}</span>
        <span>${item.value} ms</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${item.percentage}%; background-color: var(--accent-blue);"></div>
      </div>
    </div>
  `).join('');
}

// Gráfico 2: Status HTTP
function renderStatusChart() {
    const container = document.getElementById('status-bars');
    if (!container) return;

    const data = [
        { label: '200 OK', value: '98.5%', percentage: 98.5, color: 'var(--accent-green)' },
        { label: '4xx Client Error', value: '1.46%', percentage: 15, color: 'var(--accent-yellow)' },
        { label: '5xx Server Error', value: '0.04%', percentage: 5, color: 'var(--accent-red)' }
    ];

    container.innerHTML = data.map(item => `
    <div class="bar-row">
      <div class="bar-label-group">
        <span>${item.label}</span>
        <span>${item.value}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${item.percentage}%; background-color: ${item.color};"></div>
      </div>
    </div>
  `).join('');
}