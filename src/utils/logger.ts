// #region Documentation
/**
 * Represents the different levels of logging that can be used.
 * 
 * - 'info': Informational messages that highlight the progress of the application at a coarse-grained level.
 * - 'warn': Potentially harmful situations which still allow the application to continue running.
 * - 'error': Error events that might still allow the application to continue running.
 * - 'debug': Fine-grained informational events that are most useful to debug an application.
 */
 // #endregion
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    switch (level) {
      case 'info':
        console.info(`[INFO] [${timestamp}] ${message}`);
        break;
      case 'warn':
        console.warn(`[WARN] [${timestamp}] ${message}`);
        break;
      case 'error':
        console.error(`[ERROR] [${timestamp}] ${message}`);
        break;
      case 'debug':
        console.debug(`[DEBUG] [${timestamp}] ${message}`);
        break;
      default:
        console.log(`[LOG] [${timestamp}] ${message}`);
    }
  }

  info(message: string): void {
    this.log('info', message);
  }

  warn(message: string): void {
    this.log('warn', message);
  }

  error(message: string): void {
    this.log('error', message);
  }

  debug(message: string): void {
    this.log('debug', message);
  }
}

const logger = new Logger();
export default logger;
