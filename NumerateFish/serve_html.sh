#!/bin/bash

# The file you want to serve (adjust the path to your HTML file)
HTML_FILE="index.html"

# Check if the HTML file exists
if [ ! -f "$HTML_FILE" ]; then
    echo "Error: $HTML_FILE not found!"
    exit 1
fi

# Port number to check
PORT=8055

# Find the process ID (PID) running on the specified port
PID=$(lsof -t -i :$PORT)

# Check if a process is using the port
if [ -z "$PID" ]; then
    echo "No process is running on port $PORT."
else
    echo "Killing process with PID $PID running on port $PORT..."
    # Kill the process
    kill -9 $PID
    if [ $? -eq 0 ]; then
        echo "Process with PID $PID has been killed."
    else
        echo "Failed to kill the process with PID $PID. Try to serve html on different port"
        exit 1
    fi
fi


# Check if python3 is installed
if command -v python3 &> /dev/null; then
    echo "Using python3 to start the HTTP server"
    python3 -m http.server $PORT &
elif command -v python &> /dev/null; then
    echo "Using python to start the HTTP server"
    python -m http.server $PORT &
else
    echo "Python or Python3 is not installed. Please install one of them."
    exit 1
fi

# Wait a moment for the server to start
sleep 1

# Open the HTML file in the browser (adjust if needed for different OS)
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:$PORT/$HTML_FILE  # Linux
elif command -v open &> /dev/null; then
    open http://localhost:$PORT/$HTML_FILE  # macOS
else
    echo "Cannot open the browser automatically. Please visit http://localhost:$PORT/$HTML_FILE in your browser."
fi

