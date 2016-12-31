import { log } from 'util';
import { LOGGING_ENABLED, METHOD_LOGGING_ENABLED } from '../logging.service';
import { getLogger } from '../get-logger';

export function logMethod(group: boolean = true) {
  return function (target: Function | any, key: string, descriptor: any) {

    if (!LOGGING_ENABLED || !METHOD_LOGGING_ENABLED) {
      return descriptor;
    }

    let log = getLogger(target), originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {

      let metadataKey = `__log_${key}_parameters`;
      let indices = target[metadataKey];

      if (Array.isArray(indices)) {
        for (let i = 0; i < args.length; i++) {

          if (indices.indexOf(i) !== -1) {

            let arg = args[i];
            let argStr = JSON.stringify(arg) || arg.toString();
            log.debug(`${key} arg[${i}]: ${argStr}`);
          }
        }
        let result = originalMethod.apply(this, args);
        return result;
      } else {
        let a = args.map(a => (JSON.stringify(a) || a.toString())).join();
        log.group(`${target.name}(${key}(${a}))`);
        let result = originalMethod.apply(this, args);
        let r = JSON.stringify(result);
        log.debug(`METHOD RETURN: ${r}`);
        log.groupEnd();
        return result;
      }
    };

    return descriptor;
  };
}
