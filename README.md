# Electron OpenTelemetry Example Application

This Electron application demonstrates basic OpenTelemetry instrumentation for monitoring and tracing, designed to work with SigNoz Cloud for visualization. It showcases how to trace application startup, simulate long-running tasks, read file contents, and handle user interactions with OpenTelemetry in an Electron app.

## Application Screenshot

![Application Screenshot](PATH_TO_YOUR_APPLICATION_SCREENSHOT)

This screenshot shows the Electron application's interface.

## Backend Traces Screenshot in SigNoz Cloud

![Backend Traces Screenshot in SigNoz Cloud](PATH_TO_YOUR_BACKEND_TRACES_SCREENSHOT)

The above screenshot displays the traces as they appear in SigNoz Cloud. This visualizes the telemetry data collected from the application, including trace details for application startup, simulated tasks, and user actions.

## Getting Started

To run this Electron OpenTelemetry example application on your system and visualize traces in SigNoz Cloud, follow the steps outlined below. These instructions assume you have Node.js and npm installed. If not, please install them from [Node.js official site](https://nodejs.org/).

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/YOUR_GITHUB/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Install Dependencies

Inside the project directory, install the necessary dependencies:

```bash
npm install
```

### 3. Run the Application

Once the dependencies are installed, you can start the Electron application with:

```bash
npm start
```

This command launches the Electron app window and begins tracing application activities.

### 4. View Traces in SigNoz Cloud
To view the traces generated by your application:

- Ensure your SigNoz Cloud instance is up and running and correctly configured in `tracing.js`.
- Perform actions within the application (e.g., clicking the demonstrated button, and waiting for the application to read the file content).
- Access your SigNoz Cloud dashboard **Service Tab** to view your application.

You should see a service called `electronjs-otel-sample-app` in your Service Tab. You can change the name of your service in your `tracing.js`.

--------------------------------

Read the comments in `tracing.js` and `index.js` files to get a better understanding of how the instrument works. OpenTelemetry doesn't provide auto-instrumentation for ElectronJS so you have to manually instrument all the functions that you want to collect the traces for. 