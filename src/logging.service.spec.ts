import { LoggingService } from './logging.service';

describe('LoggingService', () => {

  class ObjectExtensionsTestClass { }

  it('getTypeName()', () => {
    expect(LoggingService.getTypeName(new ObjectExtensionsTestClass())).toBe('ObjectExtensionsTestClass');
  });

  it('getMessage()', () => {
    let testClass = new ObjectExtensionsTestClass();
    let debugMsg = 'TEST_MSG';
    let msg = LoggingService.getMessage(testClass, debugMsg);
    expect(msg.indexOf(LoggingService.getTypeName(testClass))).not.toBe(-1);
    expect(msg.indexOf(debugMsg)).not.toBe(-1);
  });
});
