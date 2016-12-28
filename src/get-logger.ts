import { LoggingService } from './logging.service';
/**
 * Creates a logger for the given class.
 * 
 * @export
 * @param {*} loggerFor
 */
export function getLogger(loggerFor?: any) {
    return new LoggingService(loggerFor);
}
