const express = require('express');
const { exec } = require('child_process');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = 3000;

// Use CORS to allow requests from different origins
app.use(cors());
app.use(express.json()); // For parsing application/json

app.post('/start-memory-consumer', (req, res) => {
    exec('docker run -d --name memory-consumer -m 128m memory-eater', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('Error starting memory consumer');
        }

        res.send('Memory consumer started successfully');
    });
});

app.post('/stop-memory-consumer', (req, res) => {
    exec('docker stop memory-consumer && docker rm memory-consumer', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('Error stopping memory consumer');
        }

        res.send('Memory consumer stopped successfully');
    });
});

app.get('/check-resource', (req, res) => {
    exec('docker stats --no-stream --format "{{.Name}} {{.MemUsage}}"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('Error checking resources');
        }

        const output = stdout.split('\n').filter(line => line).map(line => {
            const [name, usage] = line.split(' ');
            const usageValue = parseInt(usage.replace(/[^0-9]/g, '')) || 0; // Extract numeric value
            const unit = usage.replace(/[0-9]/g, '').trim(); // Get the unit (MB or GB)

            // Convert to KB
            let usageInKB = usageValue;
            if (unit === 'GB') {
                usageInKB *= 1024; // Convert GB to KB
            } else if (unit === 'MB') {
                usageInKB *= 1; // Already in MB, just use as KB
            }

            return { name, usage: usageInKB }; // Return in KB
        });

        const memoryConsumerUsage = output.find(container => container.name === 'memory-consumer');
        const usage = memoryConsumerUsage ? memoryConsumerUsage.usage : 0;

        const limit = 256 * 1024; // Memory limit in KB (256 MB)
        const exceeded = output.filter(container => container.usage > limit);

        const responseMessage = exceeded.length > 0 
            ? "Your resource consumption has crossed the limit that you have set. Change the limit set or stop the container." 
            : "Resource consumption is within the limits.";
        
        res.json({ message: responseMessage, usage }); // Send both message and usage as JSON
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




