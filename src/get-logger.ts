import { LoggingService } from './logging.service';

let INSTANCE_ID_COUNT = 0;
/**
 * Creates a logger for the given class.
 * 
 * @export
 * @param {*} loggerFor
 */
export function getLogger(loggerFor?: any) {
    return new LoggingService(loggerFor);
}
