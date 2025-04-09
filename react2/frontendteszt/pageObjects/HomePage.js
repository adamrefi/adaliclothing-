const { By, until } = require('selenium-webdriver');
const { waitAndClick, waitAndType } = require('../helpers/testHelper');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'http://localhost:3000/kezdolap';
    
   
    this.menuButton = By.css('button:first-child');
    this.adaliClothingTitle = By.css('h1.MuiTypography-root');
    this.cartIcon = By.css('svg[data-testid="ShoppingCartIcon"]');
    this.profileButton = By.xpath("//button[contains(text(), 'Profil')]");
    this.loginButton = By.xpath("//a[contains(text(), 'Sign In')]");
    this.registerButton = By.xpath("//a[contains(text(), 'Sign Up')]");
    
   
    this.darkModeSwitch = By.css('input[type="checkbox"]');
    
   
    this.welcomeTitle = By.xpath("//h1[contains(text(), 'Üdvözlünk')]");
    this.productCards = By.css('.MuiCard-root');
    this.allProductsCard = By.xpath("//a[@to='/oterm']");
    this.vintedCard = By.xpath("//a[@to='/vinted']");
    this.uploadProductCard = By.xpath("//a[@to='/add']");
    
   
    this.carouselImage = By.id('slideImage');
    this.carouselText = By.id('slideText');
    
  
    this.couponDialog = By.css('.MuiDialog-paper');
    this.spinButton = By.xpath("//button[contains(text(), 'Sorsol')]");
    
    
    this.logoutDialog = By.css('.MuiDialog-paper');
    this.confirmLogoutButton = By.xpath("//button[contains(text(), 'Kijelentkezés')]");
    this.cancelLogoutButton = By.xpath("//button[contains(text(), 'Mégse')]");
    
    
    this.ratingsTitle = By.xpath("//h4[contains(text(), 'Vásárlói Vélemények')]");
    this.ratingCards = By.css('.MuiRating-root');
  }

  async navigate() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.welcomeTitle), 10000);
    return this;
  }

  async getTitle() {
    const element = await this.driver.findElement(this.welcomeTitle);
    return element.getText();
  }

  async openSideMenu() {
    await waitAndClick(this.driver, this.menuButton);
    await this.driver.sleep(500); 
    return this;
  }

  async closeSideMenu() {
    
    const closeButton = await this.driver.findElement(By.css('.MuiIconButton-root'));
    await closeButton.click();
    await this.driver.sleep(500); 
    return this;
  }

  async toggleDarkMode() {
    await waitAndClick(this.driver, this.darkModeSwitch);
    await this.driver.sleep(500);
    return this;
  }

  async isDarkModeEnabled() {
    const switchElement = await this.driver.findElement(this.darkModeSwitch);
    return switchElement.isSelected();
  }

  async goToCart() {
    await waitAndClick(this.driver, this.cartIcon);
    await this.driver.sleep(1000); 
    return this;
  }

  async openProfileMenu() {
    await waitAndClick(this.driver, this.profileButton);
    await this.driver.sleep(500); 
    return this;
  }

  async logout() {
    await this.openProfileMenu();
    
   
    await waitAndClick(this.driver, By.xpath("//li[contains(text(), 'Kijelentkezés')]"));
    
    await this.driver.wait(until.elementLocated(this.logoutDialog), 5000);
    
    
    await waitAndClick(this.driver, this.confirmLogoutButton);
    
    
    await this.driver.sleep(2000);
    return this;
  }

  async login() {
    await waitAndClick(this.driver, this.loginButton);
    await this.driver.sleep(1000); 
    return this;
  }

  async register() {
    await waitAndClick(this.driver, this.registerButton);
    await this.driver.sleep(1000); 
    return this;
  }

  async goToAllProducts() {
    await waitAndClick(this.driver, this.allProductsCard);
    await this.driver.sleep(1000); 
    return this;
  }

  async goToVinted() {
    await waitAndClick(this.driver, this.vintedCard);
    await this.driver.sleep(1000);
    return this;
  }

  async goToUploadProduct() {
    await waitAndClick(this.driver, this.uploadProductCard);
    await this.driver.sleep(1000); 
    return this;
  }

  async spinCoupon() {
    try {
     
      const couponDialog = await this.driver.findElement(this.couponDialog);
      if (await couponDialog.isDisplayed()) {
        
        await waitAndClick(this.driver, this.spinButton);
        
       
        await this.driver.sleep(5000);
        
       
        const prizeElement = await this.driver.findElement(By.css('.MuiDialog-paper h5 + p'));
        return await prizeElement.getText();
      }
    } catch (error) {
      console.log('Coupon dialog not found or already closed');
      return null;
    }
    return null;
  }

  async closeCouponDialog() {
    try {
     
      const couponDialog = await this.driver.findElement(this.couponDialog);
      if (await couponDialog.isDisplayed()) {
       
        await waitAndClick(this.driver, By.css('.MuiDialog-paper button'));
      }
    } catch (error) {
      console.log('Coupon dialog not found or already closed');
    }
    return this;
  }

  async getProductCards() {
    const cards = await this.driver.findElements(this.productCards);
    return cards.length;
  }

  async getRatings() {
    try {
      
      const ratingsTitle = await this.driver.findElement(this.ratingsTitle);
      await this.driver.executeScript("arguments[0].scrollIntoView(true);", ratingsTitle);
      
     
      await this.driver.sleep(1000);
      
     
      const ratings = await this.driver.findElements(this.ratingCards);
      return ratings.length;
    } catch (error) {
      console.error('Hiba a értékelések lekérdezése során:', error);
      return 0;
    }
  }

  async waitForCarouselAnimation() {
    
    await this.driver.sleep(5000);
    return this;
  }
}

module.exports = HomePage;