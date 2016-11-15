import { LoggingService } from './logging.service';

describe('LoggingService', () => {

  class ObjectExtensionsTestClass { }

  let obj = new ObjectExtensionsTestClass(),
    getService = () => LoggingService.getLogger(obj);

  beforeEach(() => LoggingService.enable());

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

  it('should applyMethod on debug()', () => {
    let service = getService();
    spyOn(service, 'applyMethod');
    service.debug('Test method', this);
    expect(service.applyMethod).toHaveBeenCalledWith(LoggingService.debug, ['Test method', this]);
  });

  it('should applyMethod on info()', () => {
    let service = getService();
    spyOn(service, 'applyMethod');
    service.info('Test method', this);
    expect(service.applyMethod).toHaveBeenCalledWith(LoggingService.info, ['Test method', this]);
  });

  it('should applyMethod on trace()', () => {
    let service = getService();
    spyOn(service, 'applyMethod');
    service.trace('Test method', this);
    expect(service.applyMethod).toHaveBeenCalledWith(LoggingService.trace, ['Test method', this]);
  });

  it('should applyMethod on warn()', () => {
    let service = getService();
    spyOn(service, 'applyMethod');
    service.warn('Test method', this);
    expect(service.applyMethod).toHaveBeenCalledWith(LoggingService.warn, ['Test method', this]);
  });

  it('should applyMethod on error()', () => {
    let service = getService();
    spyOn(service, 'applyMethod');
    service.error('Test method', this);
    expect(service.applyMethod).toHaveBeenCalledWith(LoggingService.error, ['Test method', this]);
  });

  it('should applyMethod()', () => {
    let service = getService();
    spyOn(LoggingService, 'debug');
    service.applyMethod(LoggingService.debug, ['Test method', this]);
    expect(LoggingService.debug).toHaveBeenCalledWith(obj, 'Test method', this);
  });
});
