import isLive from '.';

describe('envHelper', () => {
  describe('isLive', () => {
    const environment = process.env.APP_ENV;

    it('should return true when APP_ENV is live', () => {
      process.env.APP_ENV = 'live';
      expect(isLive()).toBe(true);
    });

    it('should return false when APP_ENV is not live', () => {
      process.env.APP_ENV = 'test';
      expect(isLive()).toBe(false);
    });

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });
});
