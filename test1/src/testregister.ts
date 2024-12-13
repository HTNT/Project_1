// import { Builder, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
// import * as assert from "assert";

// describe("Selenium Test", function() {
//         this.timeout(20000);
//         let driver: WebDriver;
  
//     this.beforeEach(async function() {
//         driver = await new Builder().forBrowser("MicrosoftEdge").build();
//     });
  
//     afterEach(async function() {
//         await driver.quit();
//     });
  
//     it("Kiểm tra URL chính xác", async function() {
//         this.timeout(15000);
//         const baseUrl = "http://localhost:3001/signup";
//         await driver.get(baseUrl);
//         await driver.sleep(2000); 
//         let url = await driver.getCurrentUrl();
//         console.log("URL hiện tại:", url);
//         assert.equal(url, baseUrl, "URL không chính xác");
//         console.log("URL");
//     });
//     it("Dang ky voi day du thong tin", async function(){
//         this.timeout(15000);
//         const baseUrl = "http://localhost:3001/signup";
//         const targetUrl = "http://localhost:3001/login";
//         await driver.get(baseUrl);
//         await driver.sleep(2000);
//         await driver.findElement(By.id("firstName")).sendKeys("THANH");
//         await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
//         await driver.findElement(By.id("email")).sendKeys("huy2609003hsr7@gmail.com");
//         await driver.findElement(By.id("password")).sendKeys("Huy260903-_-");
//         await driver.findElement(By.id("re_password")).sendKeys("Huy260903-_-");
//         await driver.findElement(By.className("form__button")).click();
//         await driver.sleep(2000);
//         const currentUrl = await driver.getCurrentUrl();
//         assert.equal(currentUrl, targetUrl, "dang ky that bai");

//     })
//     it("Dang ky voi mat khau khong khop", async () => {
//         this.timeout(15000);
//         let truelly = false;
//         const baseUrl = "http://localhost:3001/signup";
//         const target = "Mật khẩu không trùng khớp";
//         await driver.get(baseUrl);
//         await driver.sleep(2000);
//         await driver.findElement(By.id("firstName")).sendKeys("THANH");
//         await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
//         await driver.findElement(By.id("email")).sendKeys("huy2609003hsr8@gmail.com");
//         await driver.findElement(By.id("password")).sendKeys("Huy260903-_-");
//         await driver.findElement(By.id("re_password")).sendKeys("Huy260903-_-:))");
//         await driver.findElement(By.className("form__button")).click();
//         await driver.sleep(2000);

//         const elements = await driver.findElements(By.className("txt-body-12-regular"));
//         //console.log("Text:", text);
//         for(const ele of elements) {
//             const text = await ele.getText();
//             if(text === target) truelly = true;
//         }
//         console.log(truelly);
//         assert.ok(truelly, "Mat khau trung khop");
//     })
//     it("Dang ky voi dinh dang email khong dung", async () => {
//         this.timeout(15000);
//         let truelly = false;
//         const baseUrl = "http://localhost:3001/signup";
//         const target = "Định dạng email không hợp lệ";
//         await driver.get(baseUrl);
//         await driver.sleep(2000);
//         await driver.findElement(By.id("firstName")).sendKeys("THANH");
//         await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
//         await driver.findElement(By.id("email")).sendKeys("huy2609003hsr8gmail.com");
//         await driver.findElement(By.id("password")).sendKeys("uy260903-_-");
//         await driver.findElement(By.id("re_password")).sendKeys("uy260903-_-:))");
//         await driver.findElement(By.className("form__button")).click();
//         await driver.sleep(2000);

//         const elements = await driver.findElements(By.className("txt-body-12-regular"));
//         //console.log("Text:", text);
//         for(const ele of elements) {
//             const text = await ele.getText();
//             if(text === target) truelly = true;
//         }
//         console.log(truelly);
//         assert.ok(truelly, "Dinh dang email hop le");
//     })
//     it("Dang ky voi email da ton tai", async () => {
//         this.timeout(15000);
//         let truelly = false;
//         const baseUrl = "http://localhost:3001/signup";
//         const target = "Tài khoản sử dụng email này đã tồn tại";
//         await driver.get(baseUrl);
//         await driver.sleep(2000);
//         await driver.findElement(By.id("firstName")).sendKeys("THANH");
//         await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
//         await driver.findElement(By.id("email")).sendKeys("huy2609003hsr8gmail.com");
//         await driver.findElement(By.id("password")).sendKeys("uy260903-_-");
//         await driver.findElement(By.id("re_password")).sendKeys("uy260903-_-:))");
//         await driver.findElement(By.className("form__button")).click();
//         await driver.sleep(2000);

//         assert.ok(await driver.findElement(By.id("isExist")), "Email hop le");
//     })
//     it("Dang ky de trong thong tin", async function(){
//         this.timeout(15000);
//         let truelly = false;
//         const baseUrl = "http://localhost:3001/signup";
//         const target = "Mục này không được để trống";
//         await driver.get(baseUrl);
//         await driver.sleep(2000);
//         // await driver.findElement(By.id("firstName")).sendKeys("THANH");
//         // await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
//         // await driver.findElement(By.id("email")).sendKeys("huy2609003hsr7@gmail.com");
//         // await driver.findElement(By.id("password")).sendKeys("Huy260903-_-");
//         // await driver.findElement(By.id("re_password")).sendKeys("Huy260903-_-");
//         await driver.findElement(By.className("form__button")).click();
//         await driver.sleep(2000);
//         const elements = await driver.findElements(By.className("txt-body-12-regular"));
//         for(const ele of elements) {
//             const text = await ele.getText();
//             if(text === target) truelly = true;
//         }
//         console.log(truelly);
//         assert.ok(truelly, "Khong co text box trong");

//     })
// });