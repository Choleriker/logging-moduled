import { getLogger } from '../get-logger';
import { LOGGING_ENABLED, PROPERTY_LOGGING_ENABLED } from '../logging.service';

export function logProperty(target: any, key: string) {

    if (!LOGGING_ENABLED || !PROPERTY_LOGGING_ENABLED) {
        return;
    }

    // property value
    let _val = this[key];

    let logger = getLogger(this);

    // property getter
    let getter = function () {
        logger.debug(`GET PROPERTY: ${key} => ${_val}`);
        return _val;
    };

    // property setter
    let setter = function (newVal) {
        logger.debug(`SET PROPERTY: ${key} => ${newVal}`);
        _val = newVal;
    };

    // Delete property.
    if (delete this[key]) {

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
