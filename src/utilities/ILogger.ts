export interface ILogger {
  info(message: string): void;
  error(message: string): void;
}

export enum LogLevel {
  INFO,
  ERROR,
}

export interface ILogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
}
