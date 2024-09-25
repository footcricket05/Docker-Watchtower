let intervalId;
const memoryData = {
    labels: [],
    datasets: [{
        label: 'Memory Usage (KB)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
    }],
};

const ctx = document.getElementById('memoryChart').getContext('2d');
const memoryChart = new Chart(ctx, {
    type: 'line',
    data: memoryData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Memory Usage (KB)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time (seconds)'
                }
            }
        }
    }
});

// Event listener for checking resource usage
document.getElementById('checkResourceBtn').addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Checking resources...';

    try {
        const response = await fetch('http://localhost:3000/check-resource');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json(); // Parse the JSON response
        resultDiv.innerHTML = data.message + " Current usage: " + data.usage + " MB"; // Display both message and usage
    } catch (error) {
        resultDiv.innerHTML = 'Error checking resources: ' + error.message;
    }
});

// Event listener for starting the memory consumer
document.getElementById('memoryConsumerBtn').addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Starting memory consumer...';

    try {
        const response = await fetch('http://localhost:3000/start-memory-consumer', { method: 'POST' });
        if (!response.ok) throw new Error('Network response was not ok');

        const message = await response.text();
        resultDiv.innerHTML = message; // Display the result
        startMemoryUsageMonitoring(); // Start monitoring memory usage
    } catch (error) {
        resultDiv.innerHTML = 'Error starting memory consumer: ' + error.message;
    }
});

// Event listener for stopping the memory consumer
document.getElementById('stopConsumerBtn').addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Stopping memory consumer...';

    try {
        const response = await fetch('http://localhost:3000/stop-memory-consumer', { method: 'POST' });
        if (!response.ok) throw new Error('Network response was not ok');

        const message = await response.text();
        resultDiv.innerHTML = message; // Display the result
        clearInterval(intervalId); // Stop monitoring
    } catch (error) {
        resultDiv.innerHTML = 'Error stopping memory consumer: ' + error.message;
    }
});

// Function to start monitoring memory usage
function startMemoryUsageMonitoring() {
    intervalId = setInterval(async () => {
        try {
            const statsResponse = await fetch('http://localhost:3000/check-resource');
            const statsMessage = await statsResponse.text();

            // Extract memory usage value
            const usageValueMatch = statsMessage.match(/\d+/); // Extract numeric usage
            const usageValue = usageValueMatch ? parseInt(usageValueMatch[0], 10) : 0;

            const currentTime = new Date().toLocaleTimeString();
            memoryChart.data.labels.push(currentTime);
            memoryChart.data.datasets[0].data.push(usageValue);
            memoryChart.update();
        } catch (error) {
            console.error('Error fetching memory usage:', error);
        }
    }, 5000); // Update every 5 seconds
}
