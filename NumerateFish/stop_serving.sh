#!/bin/bash

# Port number to stop the HTTP server (default: 8000)
PORT=8055

# Find the process ID (PID) running on the specified port
PID=$(lsof -t -i :$PORT)

# Check if a process is running on the port
if [ -z "$PID" ]; then
    echo "No HTTP server is running on port $PORT."
    exit 0
else
    echo "Stopping the HTTP server running on port $PORT (PID: $PID)..."
    # Kill the process
    kill -9 $PID
    if [ $? -eq 0 ]; then
        echo "HTTP server stopped successfully."
    else
        echo "Failed to stop the HTTP server on port $PORT."
        exit 1
    fi
fi
