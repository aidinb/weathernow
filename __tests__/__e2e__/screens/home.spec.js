


describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have home screen', async () => {
    await expect(element(by.id('home'))).toBeVisible();
  });

});
