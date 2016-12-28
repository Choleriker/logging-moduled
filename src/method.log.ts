import { LOGGING_ENABLED } from './logging.service';
import { getLogger } from './get-logger';

export function methodLog(enabled?: boolean) {

  return function (target: Function | any, key: string, descriptor: any) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {

      let metadataKey = `__log_${key}_parameters`;
      let indices = target[metadataKey];

      if (Array.isArray(indices)) {
        if (enabled) {
          for (let i = 0; i < args.length; i++) {

            if (indices.indexOf(i) !== -1) {

              let arg = args[i];
              let argStr = JSON.stringify(arg) || arg.toString();
              console.log(`${key} arg[${i}]: ${argStr}`);
            }
          }
        }
        let result = originalMethod.apply(this, args);
        return result;
      } else {

        let result = originalMethod.apply(this, args);
        if (enabled) {
          let r = JSON.stringify(result);
          let a = args.map(a => (JSON.stringify(a) || a.toString())).join();
          console.log(`Call: ${key}(${a}) => ${r}`);
        }
        return result;
      }
    };
    return descriptor;
  };

}
