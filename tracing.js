// Import necessary OpenTelemetry packages for tracing
const { BasicTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Configure a Resource with the service name for your ElectronJS app.
// This helps to identify traces coming from this application in the backend.
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'electronjs-otel-sample-app',
});

// Initialize a BasicTracerProvider with the configured Resource.
// This provider manages the creation of Tracers and handles span processing.
const provider = new BasicTracerProvider({
  resource: resource,
});

// Configure the OTLPTraceExporter to send traces to a specific backend.
// Replace the {region} and headers with your backend's region and ingestion key.
const otlpExporter = new OTLPTraceExporter({
  url: 'https://ingest.{region}.signoz.cloud:443/v1/traces', // SigNoz ingestion URL - region can be found in your SigNoz cloud settings
  headers: {
    "signoz-access-token": "<your-signoz-ingestion-key>", // Authentication token
  },
});

// Add a SpanProcessor to the provider. This processor will send spans to the exporter
// immediately after they are ended. For higher efficiency in production, consider using
// BatchSpanProcessor instead of SimpleSpanProcessor.
provider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter));

// Registers the provider with the OpenTelemetry API, making it the global tracer provider.
provider.register();

// Export a Tracer instance for your application. This tracer will be used to start spans.
// Replace 'your-application-name' with a meaningful name for your application. Can be same as the service name.
module.exports = provider.getTracer('your-application-name');
