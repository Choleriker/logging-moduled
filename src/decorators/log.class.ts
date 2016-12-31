import { LOGGING_ENABLED } from './../logging.service';
import { getLogger } from '../get-logger';
import { CLASS_LOGGING_ENABLED } from '../logging.service';

export function logClass(target: any) {

    if (!LOGGING_ENABLED && !CLASS_LOGGING_ENABLED) {
        return target;
    }

    // save a reference to the original constructor
    let original = target;

    // a utility function to generate instances of a class
    function construct(constructor, args) {
        let construct: any = function () {
            return constructor.apply(this, args);
        }
        construct.prototype = constructor.prototype;
        return new construct();
    }

    // the new constructor behaviour
    let f: any = function (...args) {
        getLogger(this).debug('NEW INSTANCE' + original.name);
        return construct(original, args);
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
}
