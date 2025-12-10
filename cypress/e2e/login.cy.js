describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {  
         cy.visit('https://login.qa.studio/');
         cy.get ('#mail').type('USER_LOGIN'); 
         cy.get ('#pass').type('USER_PASSWORD');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
         cy.get('#messageHeader').should('be.visible');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     });

    it('Верный пароль и не верный логин', function () {  
         cy.visit('https://login.qa.studio/');
         cy.get ('#mail').type('NO_USER_LOGIN'); 
         cy.get ('#pass').type('USER_PASSWORD');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Такого логина или пароля нет');
         cy.get('#messageHeader').should('be.visible');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     });

    it('Не верный пароль и верный логин', function () {  
         cy.visit('https://login.qa.studio/');
         cy.get ('#mail').type('USER_LOGIN'); 
         cy.get ('#pass').type('NO_USER_PASSWORD');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Такого логина или пароля нет');
         cy.get('#messageHeader').should('be.visible');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     });

    it('Логика восстановления пароля', function () {
         cy.visit('https://login.qa.studio/');
         cy.get('#forgotEmailButton').should('be.visible');
         cy.get('#forgotEmailButton').click();
         cy.get('#mailForgot').type('USER_LOGIN');
         cy.get('#restoreEmailButton').click();
         cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
         cy.get('#messageHeader').should('be.visible');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     });

    it('Кейс валидации', function () {
         cy.visit('https://login.qa.studio/');
         cy.get ('#mail').type('NO_VALID_USER_LOGIN'); 
         cy.get ('#pass').type('USER_PASSWORD');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
         cy.get('#messageHeader').should('be.visible');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     });

    it('Кейс строчные буквы', function () {
         cy.visit('https://login.qa.studio/');
         cy.get ('#mail').type('LOWERCASE_LETTERS_USER_LOGIN'); 
         cy.get ('#pass').type('USER_PASSWORD');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Не проходит кейс на этом моменте. Пишет "Такого логина или пароля нет"
         cy.get('#messageHeader').should('be.visible');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     });

 });
