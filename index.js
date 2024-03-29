// Import necessary modules from Electron, the file system, and the path utility.
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');
// Import the OpenTelemetry tracer you've configured in tracing.js for creating spans.
const tracer = require('./tracing');

// Defines an asynchronous function to simulate a time-consuming task.
async function simulateLongRunningTask() {
  // Start a new span for tracing this task.
  const span = tracer.startSpan('simulateLongRunningTask');
  try {
    // Simulate a delay of 2000 milliseconds (2 seconds).
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Record an event indicating the task is completed.
    span.addEvent('Task completed');
  } catch (error) {
    // Record any exceptions that occur during the task.
    span.recordException(error);
  } finally {
    // End the span once the task is complete or if an error occurred.
    span.end();
  }
}

// Defines an asynchronous function to read the contents of a file named 'example.txt'.
async function readFileContents() {
  // Start a new span for tracing the file reading operation.
  const span = tracer.startSpan('readFileContents');
  try {
    // Read the contents of the file asynchronously.
    const data = await fs.readFile(path.join(__dirname, 'example.txt'), 'utf8');
    // Log the data to the console.
    console.log(data);
    // Record an event indicating the file was read successfully.
    span.addEvent('File read successfully');
  } catch (error) {
    // Record any exceptions that occur while reading the file.
    span.recordException(error);
    console.error('Error reading file:', error);
  } finally {
    // End the span once the operation is complete or if an error occurred.
    span.end();
  }
}

// Defines an asynchronous function to create a new browser window and load the HTML file.
async function createWindow() {
  // Start a new span for tracing the application startup process.
  const span = tracer.startSpan('ApplicationStart');
  // Create a new browser window with specific dimensions and web preferences.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Important for security, see Electron documentation.
    },
  });
  // Load an HTML file into the window.
  win.loadFile('index.html');

  // Perform additional tasks as part of the startup process.
  await simulateLongRunningTask();
  await readFileContents();

  // End the span for the application startup process.
  span.end();
}

// Listen for the 'whenReady' event to create the browser window.
app.whenReady().then(createWindow);

// Listen for 'button-click' messages sent from renderer processes.
ipcMain.on('button-click', async () => {
  // Start a new span for tracing the button click action.
  const span = tracer.startSpan('buttonClick');
  try {
    // Simulate processing related to the button click.
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Record an event indicating the action related to the button click is completed.
    span.addEvent('Button action completed');
  } catch (error) {
    // Record any exceptions that occur during the processing.
    span.recordException(error);
  } finally {
    // End the span once the action is complete or if an error occurred.
    span.end();
  }
});

// Listen for the 'window-all-closed' event to quit the application on non-macOS platforms.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
