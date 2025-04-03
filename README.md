# Real-Time Memory Tracker

A web-based application that provides real-time monitoring of system memory usage with a modern, interactive interface.

## Features

- Real-time physical memory usage tracking
- Swap memory monitoring
- Interactive line chart showing memory usage over time
- Modern, responsive UI
- Automatic data updates every second

## Requirements

- Python 3.7 or higher
- pip (Python package installer)

## Installation

1. Clone this repository or download the files
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Run the application:
   ```bash
   python app.py
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```

## How it Works

The application uses:
- Flask for the web server
- Flask-SocketIO for real-time updates
- psutil for system memory monitoring
- Chart.js for data visualization

The memory data is collected every second and sent to the frontend via WebSocket connection, providing real-time updates without page refresh. 