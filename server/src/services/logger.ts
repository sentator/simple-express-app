import fs from 'fs';
import pino from 'pino';
import pinoPretty from 'pino-pretty';
import multistream from 'pino-multi-stream';

// Create a write stream for the log file
const logFile = fs.createWriteStream('./logs/app.log', { flags: 'a' });

const prettyStream = pinoPretty({
  colorize: true,
  translateTime: true,
});

const streams = [
  { stream: prettyStream }, // Log to console with pretty print
  { stream: logFile }, // Log to file in JSON format
];

const logger = pino({}, multistream.multistream(streams));

export default logger;
