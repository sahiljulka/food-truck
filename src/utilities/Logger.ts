import { ILogger, LogLevel, ILogEntry } from "./ILogger";

class Logger implements ILogger {
  private getTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  private log(level: LogLevel, message: string): void {
    const entry: ILogEntry = {
      level,
      message,
      timestamp: this.getTimestamp(),
    };
    console.log(JSON.stringify(entry));
  }

  public info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  public error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }
}

const logger: Logger = new Logger();

export default logger;
