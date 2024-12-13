import { Builder, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import * as assert from "assert";

describe("Selenium Test", function() {
        this.timeout(20000);
        let driver: WebDriver;
        const baseUrl = "http://localhost:3001/login";
        const email_id = "email";
        const password_id = "password";
        const isError_id = "isError";
        const button_class = "button";
        const errorMessage_classs = "txt-body-12-regular";
    this.beforeEach(async function() {
        driver = await new Builder().forBrowser("MicrosoftEdge").build();
    });
  
    afterEach(async function() {
        await driver.sleep(5000);
        await driver.quit();
    });
  
    it("Kiểm tra URL chính xác", async function() {
        this.timeout(15000);
        const targetUrl = "http://localhost:3001/login";
        await driver.get(baseUrl);
        await driver.sleep(2000); 
        let url = await driver.getCurrentUrl();
        console.log("URL hiện tại:", url);
        assert.equal(url, targetUrl, "URL không chính xác");
    });
    it("Kiem tra login: Đúng tài khoản, đúng mật khẩu", async function () {
        this.timeout(15000);
        const targetUrl = "http://localhost:3001/home-page"
        await driver.get(baseUrl);
        await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr@gmail.com");
        await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-");
        await driver.findElement(By.className(button_class)).click();
        await driver.sleep(2000);
        let url = await driver.getCurrentUrl();
        console.log("URL hiện tại:", url);
        assert.equal(url, targetUrl, "Dang nhap khong thanh cong");
        console.log("Dang nhap thanh cong");
    })
    it("Kiem tra login: Sai tài khoản, đúng mật khẩu", async function () {
        this.timeout(15000);
        await driver.get(baseUrl);
        await driver.findElement(By.id(email_id)).sendKeys("huy260900@hsrgmail.com");
        await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-");
        await driver.findElement(By.className(button_class)).click();
        await driver.sleep(2000);
        assert.ok(await driver.findElement(By.id(isError_id)), "Tai khoan va mat khau khong sai");
        console.log("Dang nhap thanh cong");
    })
    it("Kiem tra login: Đúng tài khoản, sai mật khẩu", async function () {
        this.timeout(15000);
        await driver.get(baseUrl);
        await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr@gmail.com");
        await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-:))");
        await driver.findElement(By.className(button_class)).click();
        await driver.sleep(2000);
        assert.ok(await driver.findElement(By.id(isError_id)), "Tai khoan va mat khau khong sai");
        console.log("Dang nhap thanh cong");
    })
    it("Kiem tra login: Sai tài khoản và mật khẩu", async function () {
        this.timeout(15000);
        await driver.get(baseUrl);
        await driver.findElement(By.id(email_id)).sendKeys("huy2609003@hsrgmail.com");
        await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-:))");
        await driver.findElement(By.className(button_class)).click();
        await driver.sleep(2000);
        assert.ok(await driver.findElement(By.id("isError")), "Tai khoan va mat khau khong sai");
        console.log("Dang nhap thanh cong");
    })
    it("Kiểm tra login: Email không được để trống", async function () {
        this.timeout(15000);
        const target = "Email không được để trống";
        let truelly = false;
        await driver.get(baseUrl);
        // await driver.findElement(By.id(email_id)).sendKeys("");
        // await driver.sleep(3000);
        await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-");
        await driver.findElement(By.className(button_class)).click();
        await driver.sleep(2000);
        const elements = await driver.findElements(By.className(errorMessage_classs));
        //console.log("Text:", text);
        for(const ele of elements) {
            const text = await ele.getText();
            if(text === target) truelly = true;
        }
        console.log(truelly);
        assert.ok(truelly, "Email khong bi trong");
        // console.log("Email co ton tai");
        
    })
    it("Kiểm tra login: Mật khẩu Không được để trống", async function () {
        this.timeout(15000);
        const target = "Mật khẩu không được để trống";
        let truelly = false;
        await driver.get(baseUrl);
        await driver.findElement(By.id(email_id)).sendKeys("Huy2609003hsr@gmail.com");
        // await driver.sleep(3000);
        //await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-");
        await driver.findElement(By.className(button_class)).click();
        await driver.sleep(2000);
        const elements = await driver.findElements(By.className(errorMessage_classs));
        //console.log("Text:", text);
        for(const ele of elements) {
            const text = await ele.getText();
            if(text === target) truelly = true;
        }
        assert.ok(truelly, "Mat khau khong bi trong");
        // console.log("Email co ton tai");
        
    })
    it("Kiểm tra login: Email không đúng định dạng", async function () {
        this.timeout(15000);
        const target = "Định dạng không hợp lệ";
        let truelly = false;
        await driver.get(baseUrl);
        await driver.findElement(By.id(email_id)).sendKeys("Huy2609003hsrgmail.com");
        await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-");
        await driver.findElement(By.className(button_class)).click();
        await driver.sleep(2000);
        const elements = await driver.findElements(By.className(errorMessage_classs));
        //console.log("Text:", text);
        for(const ele of elements) {
            const text = await ele.getText();
            if(text === target) truelly = true;
        }
        assert.ok(truelly, "Dinh dang da hop le");
        // console.log("Email co ton tai");
        
    })
});
describe("Selenium Test 2", function() {
    this.timeout(20000);
    let driver: WebDriver;
    const baseUrl = "http://localhost:3001/signup";
    const firstName_id = "firstName";
    const lastName_id = "lastName";
    const email_id = "email";
    const password_id = "password";
    const re_password_id = "re_password";
    const button_class = "form__button";
    const errorMessage_classs = "txt-body-12-regular";
    const isExist_id = "isExist";
this.beforeEach(async function() {
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
});

afterEach(async function() {
    await driver.quit();
});
it("Kiểm tra URL chính xác", async function() {
    this.timeout(15000);
    const targetUrl = "http://localhost:3001/signup";
    await driver.get(baseUrl);
    await driver.sleep(2000); 
    let url = await driver.getCurrentUrl();
    console.log("URL hiện tại:", url);
    assert.equal(url, targetUrl, "URL không chính xác");
});
it("Kiểm tra register: Đăng kí với đầy đủ thông tin", async function(){
    this.timeout(15000);
    const targetUrl = "http://localhost:3001/login";
    await driver.get(baseUrl);
    await driver.sleep(2000);
    await driver.findElement(By.id(firstName_id)).sendKeys("THANH");
    await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
    await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr20@gmail.com");
    await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-");
    await driver.findElement(By.id(re_password_id)).sendKeys("Huy260903-_-");
    await driver.findElement(By.className(button_class)).click();
    await driver.sleep(2000);
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, targetUrl, "dang ky that bai");

});
it("DKiểm tra register: Đăng ký khi xác thực mật khẩu không khớp", async () => {
    this.timeout(15000);
    let truelly = false;
    const target = "Mật khẩu không trùng khớp";
    await driver.get(baseUrl);
    await driver.sleep(2000);
    await driver.findElement(By.id(firstName_id)).sendKeys("THANH");
    await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
    await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr8@gmail.com");
    await driver.findElement(By.id(password_id)).sendKeys("Huy260903-_-");
    await driver.findElement(By.id(re_password_id)).sendKeys("Huy260903-_-:))");
    await driver.findElement(By.className(button_class)).click();
    await driver.sleep(2000);

    const elements = await driver.findElements(By.className(errorMessage_classs));
    //console.log("Text:", text);
    for(const ele of elements) {
        const text = await ele.getText();
        if(text === target) truelly = true;
    }
    console.log(truelly);
    assert.ok(truelly, "Mat khau trung khop");
})
it("Kiểm tra register: Đăng kí với email không đúng định dạng", async () => {
    this.timeout(15000);
    let truelly = false;
    const target = "Định dạng email không hợp lệ";
    await driver.get(baseUrl);
    await driver.sleep(2000);
    await driver.findElement(By.id(firstName_id)).sendKeys("THANH");
    await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
    await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr8gmail.com");
    await driver.findElement(By.id(password_id)).sendKeys("uy260903-_-");
    await driver.findElement(By.id(re_password_id)).sendKeys("uy260903-_-:))");
    await driver.findElement(By.className(button_class)).click();
    await driver.sleep(2000);

    const elements = await driver.findElements(By.className(errorMessage_classs));
    //console.log("Text:", text);
    for(const ele of elements) {
        const text = await ele.getText();
        if(text === target) truelly = true;
    }
    console.log(truelly);
    assert.ok(truelly, "Dinh dang email hop le");
})
it("Kiểm tra register: Đăng ký với email đã tồn tại", async () => {
    this.timeout(15000);
    await driver.get(baseUrl);
    await driver.sleep(2000);
    await driver.findElement(By.id(firstName_id)).sendKeys("THANH");
    await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
    await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr8gmail.com");
    await driver.findElement(By.id(password_id)).sendKeys("uy260903-_-");
    await driver.findElement(By.id(re_password_id)).sendKeys("uy260903-_-:))");
    await driver.findElement(By.className(button_class)).click();
    await driver.sleep(2000);

    assert.ok(await driver.findElement(By.id(isExist_id)), "Email hop le");
})
it("Kiểm tra register: Đăng ký với thông tin để trống", async function(){
    this.timeout(15000);
    let truelly = false;
    const target = "Mục này không được để trống";
    await driver.get(baseUrl);
    await driver.sleep(2000);
    // await driver.findElement(By.id(firstName_id)).sendKeys("THANH");
    // await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
    // await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr7@gmail.com");
    // await driver.findElement(By.id(password_id).sendKeys("Huy260903-_-");
    // await driver.findElement(By.id(re_password_id)).sendKeys("Huy260903-_-");
    await driver.findElement(By.className(button_class)).click();
    await driver.sleep(2000);
    const elements = await driver.findElements(By.className(errorMessage_classs));
    for(const ele of elements) {
        const text = await ele.getText();
        if(text === target) truelly = true;
    }
    console.log(truelly);
    assert.ok(truelly, "Khong co text box trong");

})
it("Kiểm tra register: Mật khẩu chưa đủ 8 ký tự", async function(){
    this.timeout(15000);
    let truelly = false;
    const target = "Mật khẩu tối thiểu 8 ký tự";
    await driver.get(baseUrl);
    await driver.sleep(2000);
    await driver.findElement(By.id(firstName_id)).sendKeys("THANH");
    await driver.findElement(By.id(lastName_id)).sendKeys("HUY");
    await driver.findElement(By.id(email_id)).sendKeys("huy2609003hsr7@gmail.com");
    await driver.findElement(By.id(password_id)).sendKeys("H");
    await driver.findElement(By.id(re_password_id)).sendKeys("H");
    await driver.findElement(By.className(button_class)).click();
    await driver.sleep(2000);
    const elements = await driver.findElements(By.className(errorMessage_classs));
    for(const ele of elements) {
        const text = await ele.getText();
        if(text === target) truelly = true;
    }
    assert.ok(truelly, "Mat khau da du 8 ky tu");
})
});