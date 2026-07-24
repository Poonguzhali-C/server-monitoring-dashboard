# Server Monitoring Dashboard

A cloud-based Server Monitoring Dashboard that displays real-time system metrics such as:

- CPU Utilization
- RAM Usage
- Disk Usage
- Network Statistics
- System Uptime

## Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Cloud & DevOps
- AWS EC2
- AWS VPC
- GitHub

## Architecture Diagram

![AWS Architecture](images/server_monitoring.png)

## Deployment Architecture

- Created a custom AWS VPC.
- Deployed both Frontend and Backend on a single Amazon EC2 instance.
- Frontend serves the monitoring dashboard UI.
- Backend collects and exposes server metrics through REST APIs.
- Dashboard displays CPU, RAM, Disk, Network, and Uptime information in real time.
- Application is accessible through the EC2 public IP address.

## Features

- Real-time resource monitoring
- CPU utilization tracking
- RAM usage monitoring
- Disk usage statistics
- Network activity monitoring
- System uptime monitoring
- Responsive dashboard UI

## Project Workflow

1. User accesses the dashboard through the browser.
2. Frontend sends requests to backend APIs.
3. Backend collects system resource information.
4. Metrics are returned to the frontend.
5. Dashboard updates and displays the latest server status.

## Future Enhancements

- Docker Containerization
- Kubernetes Deployment
- Multi-Server Monitoring
- Alert Notifications
- Auto Scaling
- CloudWatch Integration