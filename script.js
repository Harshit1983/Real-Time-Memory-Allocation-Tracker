const ctx = document.getElementById('memoryChart').getContext('2d');
const maxDataPoints = 60;
const memoryData = {
    labels: [],
    datasets: [{
        label: 'Memory Usage (MB)',
        data: [],
        borderColor: '#2196F3',
        tension: 0.4,
        fill: false
    }]
};

const memoryChart = new Chart(ctx, {
    type: 'line',
    data: memoryData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 0
        }
    }
});

let lastTime = performance.now();
let frames = 0;
let fps = 0;

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function updateChart(memoryUsage) {
    const now = new Date().toLocaleTimeString();
    memoryData.labels.push(now);
    memoryData.datasets[0].data.push(memoryUsage);

    if (memoryData.labels.length > maxDataPoints) {
        memoryData.labels.shift();
        memoryData.datasets[0].data.shift();
    }

    memoryChart.update();
}

function getRandomProcesses() {
    const processes = [
        { name: 'Chrome Browser', memory: Math.random() * 1000 + 500 },
        { name: 'System Service', memory: Math.random() * 800 + 300 },
        { name: 'Background Task', memory: Math.random() * 600 + 200 },
        { name: 'User Application', memory: Math.random() * 400 + 100 },
        { name: 'System Monitor', memory: Math.random() * 300 + 50 }
    ];
    return processes.sort((a, b) => b.memory - a.memory);
}

function updateProcessList() {
    const processes = getRandomProcesses();
    const processList = document.getElementById('process-list');
    processList.innerHTML = processes.map(process => `
        <div class="process-item">
            <span class="process-name">${process.name}</span>
            <span class="process-memory">${formatBytes(process.memory * 1024 * 1024)}</span>
        </div>
    `).join('');
}

function updateFPS() {
    frames++;
    const currentTime = performance.now();
    if (currentTime - lastTime >= 1000) {
        fps = frames;
        frames = 0;
        lastTime = currentTime;
        document.getElementById('fps').textContent = fps;
    }
}

function updatePerformanceMetrics() {
    const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    document.getElementById('page-load').textContent = `${Math.round(pageLoadTime)}ms`;
    
    const cpuUsage = Math.round(Math.random() * 100);
    document.getElementById('cpu-usage').textContent = `${cpuUsage}%`;
}

function updateMemoryInfo() {
    const totalSystemMemory = 16 * 1024 * 1024 * 1024; // 16GB total memory
    const usedSystemMemory = Math.random() * totalSystemMemory * 0.8;
    const freeSystemMemory = totalSystemMemory - usedSystemMemory;
    const swapUsed = Math.random() * totalSystemMemory * 0.3;
    const cacheMemory = Math.random() * totalSystemMemory * 0.2;
    const bufferMemory = Math.random() * totalSystemMemory * 0.1;

    // Update System Memory card
    document.getElementById('total-memory').textContent = formatBytes(totalSystemMemory);
    document.getElementById('used-memory').textContent = formatBytes(usedSystemMemory);
    document.getElementById('free-memory').textContent = formatBytes(freeSystemMemory);
    document.getElementById('memory-usage').textContent = `${Math.round((usedSystemMemory / totalSystemMemory) * 100)}%`;
    document.getElementById('system-memory-progress').style.width = `${(usedSystemMemory / totalSystemMemory) * 100}%`;

    // Update Memory Details card
    document.getElementById('swap-used').textContent = formatBytes(swapUsed);
    document.getElementById('cache-memory').textContent = formatBytes(cacheMemory);
    document.getElementById('buffer-memory').textContent = formatBytes(bufferMemory);

    // Update chart with total memory usage
    updateChart(usedSystemMemory / (1024 * 1024));
}

setInterval(updateMemoryInfo, 1000);
setInterval(updateProcessList, 2000);
setInterval(updateFPS, 1000);
setInterval(updatePerformanceMetrics, 2000);

updateMemoryInfo();
updateProcessList(); 