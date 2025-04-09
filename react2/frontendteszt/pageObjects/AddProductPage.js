const { By, until } = require('selenium-webdriver');
const { waitAndClick, waitAndType } = require('../helpers/testHelper');
const path = require('path');

class AddProductPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'http://localhost:3000/add';
    
 
    this.titleField = By.css('input[value=""]');
    this.priceField = By.css('input[type="text"]:nth-of-type(2)');
    this.descriptionField = By.css('textarea, input[multiline="true"]');
    this.categorySelect = By.css('div[role="button"]');
    this.sizeSelect = By.css('div[role="button"]:nth-of-type(2)');
    this.fileInput = By.css('input[type="file"]');
    this.uploadArea = By.css('div[role="button"][aria-haspopup="listbox"]');
    
   
    this.submitButton = By.xpath("//button[contains(text(), 'Feltöltés')]");
    this.menuButton = By.css('button:first-child');
    this.darkModeSwitch = By.css('input[type="checkbox"]');
    this.cartIcon = By.css('svg[data-testid="ShoppingCartIcon"]');
    
   
    this.successMessage = By.xpath("//h3[contains(text(), 'Sikeres feltöltés')]");
    
   
    this.titleError = By.css('p[id*="title-helper-text"]');
    this.priceError = By.css('p[id*="price-helper-text"]');
    this.descriptionError = By.css('p[id*="description-helper-text"]');
    this.categoryError = By.css('p[id*="category-helper-text"]');
    this.sizeError = By.css('p[id*="size-helper-text"]');
    this.imageError = By.css('p[id*="image-helper-text"], div[style*="color: #ff6b6b"]');
  }

  async navigate() {
    await this.driver.get(this.url);
  
    try {
      const uploadInfoDialog = await this.driver.wait(
        until.elementLocated(By.xpath("//button[contains(text(), 'Értettem')]")), 
        5000
      );
      await uploadInfoDialog.click();
    } catch (error) {
      console.log('Upload info dialog not found or already closed');
    }
    return this;
  }

  async setTitle(title) {
    try {
      const titleField = await this.driver.wait(until.elementLocated(this.titleField), 5000);
      await titleField.clear();
      await titleField.sendKeys(title);
    } catch (error) {
      console.error('Hiba a cím beállítása során:', error);
    }
    return this;
  }

  async setPrice(price) {
    try {
      const priceField = await this.driver.findElement(this.priceField);
      await priceField.clear();
      await priceField.sendKeys(price);
    } catch (error) {
      console.error('Hiba az ár beállítása során:', error);
    }
    return this;
  }

  async setDescription(description) {
    try {
      const descriptionField = await this.driver.findElement(this.descriptionField);
      await descriptionField.clear();
      await descriptionField.sendKeys(description);
    } catch (error) {
      console.error('Hiba a leírás beállítása során:', error);
    }
    return this;
  }

  async selectCategory(categoryName) {
    try {
      
      const categoryDropdown = await this.driver.findElement(this.categorySelect);
      await categoryDropdown.click();
      
   
      await this.driver.sleep(1000);
      
    
      const categoryOption = await this.driver.findElement(
        By.xpath(`//li[contains(text(), '${categoryName}')]`)
      );
      await categoryOption.click();
      
    
      await this.driver.sleep(500);
    } catch (error) {
      console.error('Hiba a kategória kiválasztása során:', error);
    }
    return this;
  }

  async selectSize(size) {
    try {
    
      const sizeDropdown = await this.driver.findElement(this.sizeSelect);
      await sizeDropdown.click();
      
    
      await this.driver.sleep(1000);
      
     
      const sizeOption = await this.driver.findElement(
        By.xpath(`//li[contains(text(), '${size}')]`)
      );
      await sizeOption.click();
      
     
      await this.driver.sleep(500);
    } catch (error) {
      console.error('Hiba a méret kiválasztása során:', error);
    }
    return this;
  }

  async uploadImages(imagePaths) {
    try {
     
      const fileInput = await this.driver.findElement(this.fileInput);
      
      
      const absolutePaths = imagePaths.map(imagePath => path.resolve(__dirname, imagePath));
      
    
      const pathsString = absolutePaths.join('\n');
      

      await fileInput.sendKeys(pathsString);
      
     
      await this.driver.sleep(2000);
    } catch (error) {
      console.error('Hiba a képek feltöltése során:', error);
    }
    return this;
  }

  async clickUploadArea() {
    try {
     
      const uploadArea = await this.driver.findElement(
        By.css('div[style*="border: 2px dashed"]')
      );
      await uploadArea.click();
    } catch (error) {
      console.error('Hiba a feltöltési terület kattintása során:', error);
    }
    return this;
  }

  async submitForm() {
    try {
      const submitButton = await this.driver.findElement(this.submitButton);
      await submitButton.click();
      
     
      await this.driver.sleep(2000);
    } catch (error) {
      console.error('Hiba az űrlap beküldése során:', error);
    }
    return this;
  }

  async isSubmissionSuccessful() {
    try {
     
      await this.driver.wait(until.elementLocated(this.successMessage), 5000);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getErrors() {
    const errors = {};
    
    try {
      errors.title = await this.driver.findElement(this.titleError).getText();
    } catch (e) {}
    
    try {
      errors.price = await this.driver.findElement(this.priceError).getText();
    } catch (e) {}
    
    try {
      errors.description = await this.driver.findElement(this.descriptionError).getText();
    } catch (e) {}
    
    try {
      errors.category = await this.driver.findElement(this.categoryError).getText();
    } catch (e) {}
    
    try {
      errors.size = await this.driver.findElement(this.sizeError).getText();
    } catch (e) {}
    
    try {
      errors.image = await this.driver.findElement(this.imageError).getText();
    } catch (e) {}
    
    return errors;
  }

  async toggleDarkMode() {
    try {
      const darkModeSwitch = await this.driver.findElement(this.darkModeSwitch);
      await darkModeSwitch.click();
      await this.driver.sleep(500);
    } catch (error) {
      console.error('Hiba a dark mode kapcsolása során:', error);
    }
    return this;
  }

  async goToCart() {
    try {
      const cartIcon = await this.driver.findElement(this.cartIcon);
      await cartIcon.click();
      await this.driver.sleep(1000);
    } catch (error) {
      console.error('Hiba a kosárhoz navigálás során:', error);
    }
    return this;
  }
}

module.exports = AddProductPage;