const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const fs = require('fs');
const path = require('path');

async function createDriver() {
  const options = new chrome.Options();
 
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  
 
  await driver.manage().window().setRect({ width: 1280, height: 800 });
  
  return driver;
}

async function takeScreenshot(driver, filename) {
  try {
    
    const screenshotsDir = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    const screenshot = await driver.takeScreenshot();
    const screenshotPath = path.join(screenshotsDir, `${filename}.png`);
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log(`Screenshot saved as ${screenshotPath}`);
  } catch (error) {
    console.error('Failed to take screenshot:', error);
  }
}


async function waitAndClick(driver, locator, timeout = 10000) {
  const { until, By } = require('selenium-webdriver');
  
 
  if (typeof locator === 'string') {
    locator = By.css(locator);
  }
  
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  await element.click();
  return element;
}


async function waitAndType(driver, locator, text, timeout = 10000) {
  const { until, By } = require('selenium-webdriver');
  
  
  if (typeof locator === 'string') {
    locator = By.css(locator);
  }
  
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  await element.clear();
  await element.sendKeys(text);
  return element;
}


async function waitForText(driver, locator, text, timeout = 10000) {
  const { until, By } = require('selenium-webdriver');
  
  
  if (typeof locator === 'string') {
    locator = By.css(locator);
  }
  
  const element = await driver.wait(until.elementLocated(locator), timeout);
  await driver.wait(until.elementTextIs(element, text), timeout);
  return element;
}

module.exports = {
  createDriver,
  takeScreenshot,
  waitAndClick,
  waitAndType,
  waitForText
};
