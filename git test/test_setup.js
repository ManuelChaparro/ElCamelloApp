const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");

const easyYOPmail = require('easy-yopmail');

let mail1  =  getEmail();

 function getEmail(){
    let mail1  = easyYOPmail.getMail().then(mail => {
        if (mail.length > 29){            
            return mail.slice(-29);        
        }else{            
            return mail;
        }            
    });
    return mail1
}

async function createUser(){

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:4200/createUser");

    await driver.findElement(By.name("name")).clear();
    await driver.findElement(By.name("name")).click();
    await driver.findElement(By.name("name")).sendKeys("User1");

    await driver.findElement(By.name("surname")).clear();
    await driver.findElement(By.name("surname")).click();
    await driver.findElement(By.name("surname")).sendKeys("Surname1");

    await driver.findElement(By.name("cellphone")).clear();
    await driver.findElement(By.name("cellphone")).click();
    await driver.findElement(By.name("cellphone")).sendKeys("31230775568");

    await driver.findElement(By.name("email")).clear();
    await driver.findElement(By.name("email")).click();
    await driver.findElement(By.name("email")).sendKeys(mail1);
        
    await driver.findElement(By.name("password")).clear();
    await driver.findElement(By.name("password")).click();
    await driver.findElement(By.name("password")).sendKeys("Contr4senia_$egur@");

    await driver.findElement(By.name("con-password")).clear();
    await driver.findElement(By.name("con-password")).click();
    await driver.findElement(By.name("con-password")).sendKeys("Contr4senia_$egur@");
        
    await driver.findElement(By.name("document")).sendKeys("1010082269");  
    await driver.findElement(By.name("birthdate")).sendKeys("06012000");
    await driver.findElement(By.name("create")).click();    

    if(await driver.findElement(By.className("noticeAccount")).isDisplayed()){       
        console.log("-----------------------");
        console.log("Test 1 Completado");
        console.log("-----------------------");
        driver.quit();
    }  

    setTimeout(() => {
        resolve('Resultado asíncrono');
    }, 100000);

    validateUser();
}

// creacion de usuario
async function validateUser(){

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:4200/createUser");

    await driver.findElement(By.name("name")).clear();
    await driver.findElement(By.name("name")).click();
    await driver.findElement(By.name("name")).sendKeys("User1");

    await driver.findElement(By.name("surname")).clear();
    await driver.findElement(By.name("surname")).click();
    await driver.findElement(By.name("surname")).sendKeys("Surname1");

    await driver.findElement(By.name("cellphone")).clear();
    await driver.findElement(By.name("cellphone")).click();
    await driver.findElement(By.name("cellphone")).sendKeys("31230775568");

    await driver.findElement(By.name("email")).clear();
    await driver.findElement(By.name("email")).click();
    await driver.findElement(By.name("email")).sendKeys(mail1);
        
    await driver.findElement(By.name("password")).clear();
    await driver.findElement(By.name("password")).click();
    await driver.findElement(By.name("password")).sendKeys("Contr4senia_$egur@");

    await driver.findElement(By.name("con-password")).clear();
    await driver.findElement(By.name("con-password")).click();
    await driver.findElement(By.name("con-password")).sendKeys("Contr4senia_$egur@");
        
    await driver.findElement(By.name("document")).sendKeys("1010082269");  
    await driver.findElement(By.name("birthdate")).sendKeys("06012000");
    await driver.findElement(By.name("create")).click();    

    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    if(await alert.getText() === "El email ya se encuentra registrado"){
        await alert.accept();
        console.log("-----------------------");
        console.log("Test 2 Completado");
        console.log("-----------------------");
        driver.quit();
    }

    setTimeout(() => {
        resolve('Resultado asíncrono');
    }, 100000);

    login();

    

    /*if(await driver.findElement(By.className("option-btn btn-1")).isDisplayed()){       
        console.log("-----------------------");
        console.log("Test 2 Completado");
        console.log("-----------------------");
        driver.quit();
    } */

    /*
    let alert = await driver.switchTo().alert();

    let alertText = await alert.getText();

    if(await alert.getText() === "Usuario creado correctamente"){
        await alert.accept();
        console.log("-----------------------");
        console.log("Test 2 Completado");
        console.log("-----------------------");
        driver.quit();
    }*/
}

async function login(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:4200/login");
    await driver.findElement(By.name("email")).clear();
    await driver.findElement(By.name("email")).click();
    //await driver.findElement(By.name("email")).sendKeys("manish",Key.RETURN);
    await driver.findElement(By.name("email")).sendKeys(mail1);
    
    await driver.findElement(By.name("password")).clear();
    await driver.findElement(By.name("password")).click();
    await driver.findElement(By.name("password")).sendKeys("Contr4senia_$egur@",Key.RETURN);    
  
    setTimeout(() => {
        resolve('Resultado asíncrono');
    }, 100000);

    let pagina = await driver.getCurrentUrl().then(async function(url) {
            
        console.log("-----------------------");
        console.log("Test 3 Completado");
        console.log("-----------------------"); 
        driver.quit(); 
        setTimeout(() => {
            resolve('Resultado asíncrono');
        }, 100000);
        loginAdmin();            
    });
    

    
    
    /*if(await driver.findElement(By.className("option-btn btn-1")).isDisplayed()){                   
            console.log("-----------------------");
            console.log("Test 3 Completado");
            console.log("-----------------------");
            driver.quit();
        }    */     
    }

    async function loginAdmin(){
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:4200/login");
        await driver.findElement(By.name("email")).clear();
        await driver.findElement(By.name("email")).click();        
        await driver.findElement(By.name("email")).sendKeys("daniel@corre.com");
        
        await driver.findElement(By.name("password")).clear();
        await driver.findElement(By.name("password")).click();
        await driver.findElement(By.name("password")).sendKeys("12345678",Key.RETURN);  
        setTimeout(() => {
            resolve('Resultado asíncrono');
        }, 100000); 
        if(await driver.findElement(By.className("option-btn btn-1")).isDisplayed()){                   
                console.log("-----------------------");
                console.log("Test 4 Completado");
                console.log("-----------------------");
                //driver.quit();
            }  
        }
createUser();

