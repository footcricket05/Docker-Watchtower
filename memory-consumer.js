document.getElementById('checkResourceBtn').addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Checking resources...';

    try {
        const response = await fetch('http://localhost:3000/check-resource');
        if (!response.ok) throw new Error('Network response was not ok');

        const message = await response.text();
        resultDiv.innerHTML = message; // Display the result
    } catch (error) {
        resultDiv.innerHTML = 'Error checking resources: ' + error.message;
    }
});

document.getElementById('memoryConsumerBtn').addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Starting memory consumer...';

    try {
        const response = await fetch('http://localhost:3000/start-memory-consumer', { method: 'POST' });
        if (!response.ok) throw new Error('Network response was not ok');

        const message = await response.text();
        resultDiv.innerHTML = message; // Display the result
    } catch (error) {
        resultDiv.innerHTML = 'Error starting memory consumer: ' + error.message;
    }
});
