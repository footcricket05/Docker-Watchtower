# 📊 Docker-Watchtower: Docker Resource Monitor

Welcome to the **Docker Resource Monitor**! This application allows you to monitor the memory usage of your Docker containers in real-time, with features to start and stop memory-consuming processes. 🌟

This project is designed to help developers and system administrators manage Docker resources effectively by providing insights into memory consumption. By using this tool, you can visualize resource usage patterns, identify bottlenecks, and optimize the performance of your containers.

## 🚀 Features
- **Check Resource Usage**: Monitor the current memory usage of your Docker containers.
- **Start Memory Consumer**: Create a memory-intensive process to test your system’s limits.
- **Stop Memory Consumer**: Gracefully terminate the memory consumer and view resource usage.
- **Real-Time Graph**: Visualize memory consumption over time with an interactive graph. 📈

## 🛠️ Technologies Used
- **Node.js**: For backend server implementation.
- **Express**: Web framework for building the API.
- **Docker**: Containerization platform.
- **Chart.js**: For visualizing memory usage in a graph.

## 💻 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/footcricket05/Docker-Watchtower.git
   cd Docker-Watchtower
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the Docker image for the memory consumer:
   ```bash
   docker build -t memory-consumer .
   ```

4. Run the backend server:
   ```bash
   node index.js
   ```

5. Start the memory consumer:
   ```bash
   docker run -d --name memory-consumer -m 128m memory-consumer
   ```

## 🖥️ Usage

- **Check Resource Usage**: Click the "Check Resource Usage" button to see the current memory usage of your containers.
- **Start Memory Consumer**: Click the "Start Memory Consumer" button to initiate a memory-consuming process.
- **Stop Memory Consumer**: Click the "Stop Memory Consumer" button to terminate the process.

## 🎨 Screenshot
![image](https://github.com/user-attachments/assets/7b81c465-01fa-44b1-981b-bfae5121a6de)

## 📄 License
This project is licensed under the `MIT License` - see the [LICENSE](LICENSE) file for details.

## 🙌 Contributing
Feel free to contribute! Open an issue or submit a pull request for any improvements or bug fixes.


Thank you for checking out the **Docker Resource Monitor**! Happy monitoring! 🎉
